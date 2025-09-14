
import { useTranslations } from 'next-intl';

export default function ContactPage() {
  const t = useTranslations('contact');

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">{t('title')}</h1>
      <p className="text-lg mb-4">{t('intro')}</p>
      
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">{t('form_title')}</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">{t('name_label')}</label>
            <input type="text" id="name" name="name" className="w-full px-4 py-2 border rounded-md" placeholder={t('name_placeholder')} />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">{t('email_label')}</label>
            <input type="email" id="email" name="email" className="w-full px-4 py-2 border rounded-md" placeholder={t('email_placeholder')} />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">{t('message_label')}</label>
            <textarea id="message" name="message" rows={5} className="w-full px-4 py-2 border rounded-md" placeholder={t('message_placeholder')}></textarea>
          </div>
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
            {t('submit_button')}
          </button>
        </form>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">{t('info_title')}</h2>
        <p className="text-gray-700"><strong>{t('email_address_label')}</strong> youremail@example.com</p>
        <p className="text-gray-700"><strong>{t('address_label')}</strong> 123 Main St, Anytown, USA</p>
      </div>
    </div>
  );
}
