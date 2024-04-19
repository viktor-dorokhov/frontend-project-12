import React from 'react';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { io } from 'socket.io-client';
import store from './slices/index';
import resources from './locales/index';
import App from './components/App';
import { messagesApi } from './services/messagesApi';

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

  const socket = io();
  socket.on('newMessage', (message) => {
    store.dispatch(messagesApi.util.updateQueryData('fetchMessages', undefined, (draftMessages) => {
      draftMessages.push(message);
    }));
  });

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default init;