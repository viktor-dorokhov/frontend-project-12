import React from 'react';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import store from './slices/index';
import resources from './locales/index';
import App from './components/App';

const init = async () => {
  const i18n = i18next.createInstance();
  const options = {
    resources,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  };
  await i18n
    .use(initReactI18next)
    .init(options);

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default init;
