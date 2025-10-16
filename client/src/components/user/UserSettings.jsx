import React from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, Globe, Moon, Shield } from 'lucide-react';
import { Formik, Form, Field } from 'formik';

export default function UserSettings() {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    i18n.changeLanguage(selectedLanguage);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-3 sm:px-6 py-6 sm:py-10 overflow-x-hidden">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">
          {t('App Settings')}
        </h1>

        <Formik
          initialValues={{
            pushNotifications: true,
            emergencyAlerts: true,
            darkMode: true,
            language: 'en',
          }}
          onSubmit={(values) => {
            console.log('Settings saved:', values);
          }}
        >
          {({ values }) => (
            <Form className="space-y-6">
              {/* Notifications Section */}
              <div className="bg-gray-800 rounded-lg p-4 sm:p-6 shadow-lg">
                <h2 className="text-lg font-semibold mb-4">
                  {t('Notifications')}
                </h2>

                <div className="space-y-4">
                  <label className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-yellow-500" />
                      <span className="text-sm sm:text-base">
                        {t('Push Notifications')}
                      </span>
                    </div>
                    <Field
                      type="checkbox"
                      name="pushNotifications"
                      className="w-5 h-5 accent-yellow-500"
                      checked={values.pushNotifications}
                    />
                  </label>

                  <label className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-yellow-500" />
                      <span className="text-sm sm:text-base">
                        {t('Emergency Alerts')}
                      </span>
                    </div>
                    <Field
                      type="checkbox"
                      name="emergencyAlerts"
                      className="w-5 h-5 accent-yellow-500"
                      checked={values.emergencyAlerts}
                    />
                  </label>
                </div>
              </div>

              {/* Appearance Section */}
              <div className="bg-gray-800 rounded-lg p-4 sm:p-6 shadow-lg">
                <h2 className="text-lg font-semibold mb-4">{t('Appearance')}</h2>
                <label className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <Moon className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm sm:text-base">{t('Dark Mode')}</span>
                  </div>
                  <Field
                    type="checkbox"
                    name="darkMode"
                    className="w-5 h-5 accent-yellow-500"
                    checked={values.darkMode}
                  />
                </label>
              </div>

              {/* Language Section */}
              <div className="bg-gray-800 rounded-lg p-4 sm:p-6 shadow-lg">
                <h2 className="text-lg font-semibold mb-4">{t('Language')}</h2>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Globe className="w-5 h-5 text-yellow-500" />
                    <Field
                      as="select"
                      name="language"
                      className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-yellow-500 w-full sm:w-auto"
                      onChange={handleLanguageChange}
                      value={i18n.language}
                    >
                      <option value="en">{t('English')}</option>
                      <option value="sw">{t('Swahili')}</option>
                    </Field>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2 bg-yellow-500 text-gray-900 font-medium rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  {t('Save Settings')}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
