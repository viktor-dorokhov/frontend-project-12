/* eslint-disable no-console */

import axios from 'axios';
import * as actions from './slices/authSlice';
import routes from './routes';

const fetchData = (store) => (next) => (action) => {
  switch (action.type) {
    case 'auth/login':
      axios.post(routes.login(), action.payload).then((req) => {
        store.dispatch(actions.loginSuccess(req.data));
      }).catch((error) => {
        store.dispatch(actions.loginError(error.message));
      });
      break;
    // no default
  }
  return next(action);
};

export default [fetchData];
