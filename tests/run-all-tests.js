#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 颜色输出
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m'
};

function log(message, color = 'white') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function runCommand(command, description) {
  log(`\n${'='.repeat(60)}`, 'cyan');
  log(`🚀 ${description}`, 'blue');
  log(`${'='.repeat(60)}`, 'cyan');
  
  try {
    execSync(command, { stdio: 'inherit', cwd: process.cwd() });
    log(`✅ ${description} 完成`, 'green');
    return true;
  } catch (error) {
    log(`❌ ${description} 失败: ${error.message}`, 'red');
    return false;
  }
}

function checkPrerequisites() {
  log('🔍 检查前置条件...', 'yellow');
  
  // 检查 Node.js
  try {
    const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
    log(`✅ Node.js 版本: ${nodeVersion}`, 'green');
  } catch (error) {
    log('❌ Node.js 未安装', 'red');
    return false;
  }
  
  // 检查 npm
  try {
    const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
    log(`✅ npm 版本: ${npmVersion}`, 'green');
  } catch (error) {
    log('❌ npm 未安装', 'red');
    return false;
  }
  
  // 检查 Playwright 是否安装
  try {
    execSync('npx playwright --version', { stdio: 'pipe' });
    log('✅ Playwright 已安装', 'green');
  } catch (error) {
    log('⚠️  Playwright 未安装，正在安装...', 'yellow');
    if (!runCommand('npm run test:install', '安装 Playwright 浏览器')) {
      return false;
    }
  }
  
  return true;
}

function runTestSuite(suiteName, testPattern, description) {
  log(`\n🎯 运行测试套件: ${suiteName}`, 'magenta');
  
  const command = `npx playwright test ${testPattern} --reporter=html`;
  return runCommand(command, description);
}

function generateTestReport() {
  log('\n📊 生成测试报告...', 'yellow');
  
  try {
    // 检查是否有测试结果
    const resultsDir = path.join(process.cwd(), 'playwright-report');
    if (fs.existsSync(resultsDir)) {
      log('✅ 测试报告已生成', 'green');
      log(`📁 报告位置: ${resultsDir}`, 'cyan');
      log('🌐 在浏览器中查看: npm run test:report', 'cyan');
    } else {
      log('⚠️  未找到测试报告', 'yellow');
    }
  } catch (error) {
    log(`❌ 生成报告时出错: ${error.message}`, 'red');
  }
}

function main() {
  log('🧪 MBTI 测试平台 - 全面测试套件', 'cyan');
  log('=' .repeat(60), 'cyan');
  
  // 检查前置条件
  if (!checkPrerequisites()) {
    log('❌ 前置条件检查失败，退出', 'red');
    process.exit(1);
  }
  
  const startTime = Date.now();
  const results = [];
  
  // 运行不同类型的测试
  const testSuites = [
    {
      name: '基础功能测试',
      pattern: 'tests/pages/home.spec.ts',
      description: '首页基础功能测试'
    },
    {
      name: '测试流程测试',
      pattern: 'tests/pages/test-flow.spec.ts',
      description: 'MBTI 测试流程测试'
    },
    {
      name: '性格类型测试',
      pattern: 'tests/pages/personalities.spec.ts',
      description: '性格类型页面测试'
    },
    {
      name: '多语言测试',
      pattern: 'tests/multilang/all-languages.spec.ts',
      description: '多语言支持测试'
    },
    {
      name: 'API 测试',
      pattern: 'tests/api/comprehensive-api.spec.ts',
      description: 'API 端点测试'
    },
    {
      name: '性能测试',
      pattern: 'tests/performance/performance.spec.ts',
      description: '性能测试'
    },
    {
      name: '可访问性测试',
      pattern: 'tests/accessibility/a11y.spec.ts',
      description: '可访问性测试'
    },
    {
      name: 'SEO 测试',
      pattern: 'tests/seo/seo.spec.ts',
      description: 'SEO 优化测试'
    }
  ];
  
  // 运行所有测试套件
  for (const suite of testSuites) {
    const success = runTestSuite(suite.name, suite.pattern, suite.description);
    results.push({ name: suite.name, success });
  }
  
  // 生成测试报告
  generateTestReport();
  
  // 显示测试结果摘要
  const endTime = Date.now();
  const totalTime = Math.round((endTime - startTime) / 1000);
  
  log('\n' + '='.repeat(60), 'cyan');
  log('📋 测试结果摘要', 'cyan');
  log('='.repeat(60), 'cyan');
  
  let successCount = 0;
  let totalCount = results.length;
  
  results.forEach(result => {
    if (result.success) {
      log(`✅ ${result.name}`, 'green');
      successCount++;
    } else {
      log(`❌ ${result.name}`, 'red');
    }
  });
  
  log('\n' + '-'.repeat(40), 'yellow');
  log(`📊 总计: ${successCount}/${totalCount} 个测试套件通过`, 'yellow');
  log(`⏱️  总耗时: ${totalTime} 秒`, 'yellow');
  
  if (successCount === totalCount) {
    log('🎉 所有测试套件都通过了！', 'green');
  } else {
    log(`⚠️  ${totalCount - successCount} 个测试套件失败`, 'red');
  }
  
  log('\n📚 有用的命令:', 'cyan');
  log('• 查看测试报告: npm run test:report', 'white');
  log('• 运行特定测试: npx playwright test tests/pages/home.spec.ts', 'white');
  log('• 调试模式: npm run test:debug', 'white');
  log('• UI 模式: npm run test:ui', 'white');
  
  process.exit(successCount === totalCount ? 0 : 1);
}

// 处理命令行参数
const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  log('🧪 MBTI 测试平台 - 全面测试套件', 'cyan');
  log('\n用法:', 'yellow');
  log('  node tests/run-all-tests.js [选项]', 'white');
  log('\n选项:', 'yellow');
  log('  --help, -h     显示帮助信息', 'white');
  log('  --quick        只运行快速测试', 'white');
  log('  --api-only     只运行 API 测试', 'white');
  log('  --ui-only      只运行 UI 测试', 'white');
  log('\n示例:', 'yellow');
  log('  node tests/run-all-tests.js --quick', 'white');
  log('  node tests/run-all-tests.js --api-only', 'white');
  process.exit(0);
}

if (args.includes('--quick')) {
  log('🚀 快速测试模式', 'yellow');
  // 只运行基础测试
  const quickTests = [
    {
      name: '基础功能测试',
      pattern: 'tests/pages/home.spec.ts',
      description: '首页基础功能测试'
    },
    {
      name: 'API 测试',
      pattern: 'tests/api/comprehensive-api.spec.ts',
      description: 'API 端点测试'
    }
  ];
  
  // 修改测试套件列表
  testSuites = quickTests;
}

main();
