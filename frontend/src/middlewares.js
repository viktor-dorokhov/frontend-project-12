/* eslint-disable no-console */
import { messagesApi } from './services/messagesApi';
import { channelsApi } from './services/channelsApi';

const resetApiState = (store) => (next) => (action) => {
  switch (action.type) {
    case 'auth/logout':
      store.dispatch(messagesApi.util.resetApiState());
      store.dispatch(channelsApi.util.resetApiState());

      break;
    // no default
  }
  return next(action);
};

export default [resetApiState];
