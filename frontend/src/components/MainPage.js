import React from 'react';
import Spinner from './Spinner';
import { useFetchChannelsQuery } from '../services/channelsApi';
import { useFetchMessagesQuery } from '../services/messagesApi';

import ChannelsBox from './ChannelsBox';
import MessagesBox from './MessagesBox';

function MainPage() {
  const { isLoading: isChannelsLoading } = useFetchChannelsQuery();
  const { isLoading: isMessagessLoading } = useFetchMessagesQuery();
  return (
    isChannelsLoading || isMessagessLoading
      ? (
        <div className="h-100 d-flex justify-content-center align-items-center">
          <Spinner />
        </div>
      )
      : (
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <ChannelsBox />
            <MessagesBox />
          </div>
        </div>
      )
  );
}

export default MainPage;
