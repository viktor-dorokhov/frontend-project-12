import React from 'react';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { io } from 'socket.io-client';
import leoProfanity from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import store from './slices/index';
import resources from './locales/index';
import App from './components/App';
import { messagesApi } from './services/messagesApi';
import { channelsApi } from './services/channelsApi';
import { setActiveChannel, defaultChannelId } from './slices/uiSlice';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
  enabled: process.env.NODE_ENV === 'production',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const init = async () => {
  const i18nInstance = i18next.createInstance();
  const options = {
    resources,
    fallbackLng: localStorage.getItem('language') || 'ru',
    interpolation: {
      escapeValue: false,
    },
  };
  await i18nInstance
    .use(initReactI18next)
    .init(options);

  const ruDictionary = leoProfanity.getDictionary('ru');
  leoProfanity.add(ruDictionary);

  const socket = io();
  socket.on('newMessage', (message) => {
    store.dispatch(messagesApi.util.updateQueryData('fetchMessages', undefined, (draftMessages) => {
      draftMessages.push(message);
    }));
  });
  socket.on('newChannel', (channel) => {
    store.dispatch(channelsApi.util.updateQueryData('fetchChannels', undefined, (draftChannels) => {
      draftChannels.push(channel);
    }));
  });
  socket.on('renameChannel', (channel) => {
    store.dispatch(channelsApi.util.updateQueryData('fetchChannels', undefined, (draftChannels) => {
      const currentChannel = draftChannels.find((item) => item.id === channel.id);
      currentChannel.name = channel.name;
    }));
  });
  socket.on('removeChannel', (channel) => {
    store.dispatch(channelsApi.util.updateQueryData('fetchChannels', undefined, (draftChannels) => {
      const channels = draftChannels.filter((item) => item.id !== channel.id);
      const state = store.getState();
      if (state.uiStore.activeChannelId === channel.id) {
        store.dispatch(setActiveChannel(defaultChannelId));
      }
      return channels;
    }));
  });

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <I18nextProvider i18n={i18nInstance}>
            <App />
          </I18nextProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
