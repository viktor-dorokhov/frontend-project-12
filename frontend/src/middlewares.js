/* eslint-disable no-console */

import axios from 'axios';
import * as authActions from './slices/authSlice';
import * as channelsActions from './slices/channelsSlice';
import * as messagesActions from './slices/messagesSlice';
import routes from './routes';

const fetchData = (store) => (next) => (action) => {
  switch (action.type) {
    case 'auth/login':
      axios.post(routes.login(), action.payload).then((req) => {
        store.dispatch(authActions.loginSuccess(req.data));
      }).catch((error) => {
        store.dispatch(authActions.loginError(error.message));
      });
      break;
    case 'channels/fetchChannels':
      axios.get(routes.channelsPath(), {
        headers: {
          Authorization: `Bearer ${action.payload}`,
        },
      }).then((req) => {
        store.dispatch(channelsActions.fetchChannelsSuccess(req.data));
        store.dispatch(messagesActions.fetchMessages(action.payload));
      }).catch((error) => {
        store.dispatch(channelsActions.fetchChannelsError(error.message));
      });
      break;
    case 'messages/fetchMessages':
      axios.get(routes.messagesPath(), {
        headers: {
          Authorization: `Bearer ${action.payload}`,
        },
      }).then((req) => {
        store.dispatch(messagesActions.fetchMessagesSuccess(req.data));
      }).catch((error) => {
        store.dispatch(messagesActions.fetchMessagesError(error.message));
      });
      break;
    case 'messages/addMessage': {
      const { body, channelId, username } = action.payload;
      const newMessage = { body, channelId, username };
      axios.post(routes.messagesPath(), newMessage, {
        headers: {
          Authorization: `Bearer ${action.payload.authToken}`,
        },
      }).then((req) => {
        store.dispatch(messagesActions.addMessageSuccess(req.data));
      }).catch((error) => {
        store.dispatch(messagesActions.addMessageError(error.message));
      });
      break;
    }
    // no default
  }
  return next(action);
};

export default [fetchData];
