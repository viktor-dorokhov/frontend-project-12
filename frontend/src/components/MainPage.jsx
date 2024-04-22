import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Spinner from './Spinner';
import { useFetchChannelsQuery } from '../services/channelsApi';
import { useFetchMessagesQuery } from '../services/messagesApi';
import ChannelsBox from './ChannelsBox';
import MessagesBox from './MessagesBox';
import Modal from './modal/index';

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
        <>
          <Container className="h-100 my-4 overflow-hidden rounded shadow">
            <Row className="h-100 bg-white flex-md-row">
              <ChannelsBox />
              <MessagesBox />
            </Row>
          </Container>
          <Modal />
        </>
      )
  );
}

export default MainPage;
