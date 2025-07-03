import psycopg2
import psycopg2.extras
import json
import os
import random
import hashlib
import requests
from urllib.parse import urlparse
from dotenv import load_dotenv

# 加载 .env 文件中的环境变量
load_dotenv()

# --- 配置 ---
# 从环境变量中获取百度翻译 API 的凭证
BAIDU_APP_ID = os.getenv("BAIDU_APP_ID")
BAIDU_SECRET_KEY = os.getenv("BAIDU_SECRET_KEY")

if not all([BAIDU_APP_ID, BAIDU_SECRET_KEY]):
    raise ValueError("BAIDU_APP_ID and/or BAIDU_SECRET_KEY not found in .env file.")

# 从环境变量中获取数据库连接 URL
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL not found in .env file or environment variables.")

# 解析数据库 URL
result = urlparse(DATABASE_URL)
DB_CONFIG = {
    "dbname": result.path[1:],
    "user": result.username,
    "password": result.password,
    "host": result.hostname,
    "port": result.port
}

SOURCE_LOCALE = 'en'  # 源语言

# Configure for Italian
TARGET_LOCALE_DB = 'it'  # 更新到数据库的目标 locale 名称
TARGET_LOCALE_API = 'it'   # 调用百度 API 使用的语言代码 (意大利语)

TABLE_NAME = 'public.personality_details'
# !! 注意: 将此处设置为您想强制更新的特定类型，或设置为 None 来翻译所有类型
# Set to None to translate all types for the new language
FORCE_UPDATE_TYPE = ['infp', 'istj', 'intj']


def translate_text(text, target_lang_api):
    """
    使用百度翻译 API 翻译文本。
    
    :param text: 需要翻译的文本字符串。
    :param target_lang_api: 目标语言代码 (例如, 'zh')。
    :return: 翻译后的文本字符串。
    """
    if not text:
        return ""

    api_url = 'http://api.fanyi.baidu.com/api/trans/vip/translate'
    salt = str(random.randint(32768, 65536))
    sign_str = BAIDU_APP_ID + text + salt + BAIDU_SECRET_KEY
    sign = hashlib.md5(sign_str.encode('utf-8')).hexdigest()

    params = {
        'q': text,
        'from': 'auto',  # 自动检测源语言
        'to': target_lang_api,
        'appid': BAIDU_APP_ID,
        'salt': salt,
        'sign': sign
    }

    try:
        response = requests.get(api_url, params=params)
        response.raise_for_status()  # 如果请求失败则抛出异常
        result = response.json()

        if 'trans_result' in result:
            translated_text = result['trans_result'][0]['dst']
            print(f"Translating '{text}' to '{target_lang_api}': '{translated_text}'")
            return translated_text
        else:
            error_code = result.get('error_code')
            error_msg = result.get('error_msg')
            print(f"Error from Baidu API: Code {error_code}, Message: {error_msg}")
            return text # 翻译失败，返回原文

    except requests.exceptions.RequestException as e:
        print(f"Error calling Baidu API: {e}")
        return text # 翻译失败，返回原文
    except Exception as e:
        print(f"An unexpected error occurred during translation: {e}")
        return text # 翻译失败，返回原文


def recursively_translate_json(data, target_lang_api):
    """
    递归遍历一个 JSON 结构 (字典和列表)，
    并翻译其中所有的字符串值, 但会跳过特定键的值。
    """
    # 定义一个列表，包含不应被翻译其值的键
    KEYS_TO_SKIP_TRANSLATION = ['type']

    if isinstance(data, dict):
        # 如果是字典, 遍历其键值对
        new_dict = {}
        for k, v in data.items():
            if k in KEYS_TO_SKIP_TRANSLATION:
                # 如果键在跳过列表里，则不翻译其值，直接复制
                new_dict[k] = v
            else:
                # 否则，对其值进行递归翻译
                new_dict[k] = recursively_translate_json(v, target_lang_api)
        return new_dict
    elif isinstance(data, list):
        # 如果是列表, 遍历其所有项, 对每一项进行递归翻译
        return [recursively_translate_json(item, target_lang_api) for item in data]
    elif isinstance(data, str):
        # 如果是字符串, 直接翻译
        return translate_text(data, target_lang_api)
    else:
        # 其他类型 (数字, 布尔值等) 保持原样
        return data


def batch_translate_details():
    """
    读取英文数据，翻译后作为新记录插入数据库。
    """
    conn = None
    inserted_rows = 0
    try:
        # 连接到 PostgreSQL 数据库
        print("Connecting to the database...")
        conn = psycopg2.connect(**DB_CONFIG)
        cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
        print("Database connection successful.")

        # 选取需要翻译的行
        base_query = f"SELECT type, details FROM {TABLE_NAME} WHERE locale = %s"
        params = [SOURCE_LOCALE]

        if FORCE_UPDATE_TYPE:
            # 使用 LOWER(type) 来进行不区分大小写的比较
            base_query += " AND LOWER(type) = ANY(%s)"
            params.append(FORCE_UPDATE_TYPE)
            print(f"!!! 强制更新模式已启用，仅针对类型: {FORCE_UPDATE_TYPE} !!!")
        
        query = base_query + ";"
        print(f"正在执行查询: {query}")
        cur.execute(query, tuple(params))
        
        rows = cur.fetchall()
        if not rows:
            print(f"No rows found with locale '{SOURCE_LOCALE}'. Nothing to do.")
            return

        print(f"Found {len(rows)} rows to translate and insert.")

        for row in rows:
            original_type = row['type']
            original_details = row['details']

            if not isinstance(original_details, dict):
                print(f"Skipping row with type {original_type} because 'details' is not a valid JSON object.")
                continue

            # 通过递归函数翻译整个 details 对象
            translated_details = recursively_translate_json(original_details, TARGET_LOCALE_API)

            # 准备并执行 UPSERT (更新或插入) 语句
            # ON CONFLICT (type, locale) 表示如果 (type, locale) 这个组合的键已经存在
            # DO UPDATE SET details = EXCLUDED.details; 就会执行更新操作，而不是插入
            upsert_query = f"""
                INSERT INTO {TABLE_NAME} (type, locale, details) 
                VALUES (%s, %s, %s)
                ON CONFLICT (type, locale) 
                DO UPDATE SET details = EXCLUDED.details;
            """
            # 将翻译后的 dict 转换为 JSON 字符串
            translated_details_json = json.dumps(translated_details, ensure_ascii=False)
            
            print(f"Upserting translated version for type '{original_type}'...")
            cur.execute(upsert_query, (original_type, TARGET_LOCALE_DB, translated_details_json))
            inserted_rows += 1

        # 提交事务
        conn.commit()
        print(f"Transaction committed. Total rows inserted: {inserted_rows}.")

    except psycopg2.Error as e:
        print(f"Database error: {e}")
        if conn:
            conn.rollback()
    finally:
        if conn:
            cur.close()
            conn.close()
            print("Database connection closed.")

if __name__ == '__main__':
    # 在运行前，请确保您已经安装了必要的库:
    # pip install -r requirements.txt
    print("Starting batch translation script...")
    batch_translate_details()
    print("Script finished.") 