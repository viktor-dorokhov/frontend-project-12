import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Spinner from './Spinner';
import { useFetchChannelsQuery } from '../services/channelsApi';
import { useFetchMessagesQuery } from '../services/messagesApi';
import ChannelsBox from './ChannelsBox';
import MessagesBox from './MessagesBox';
import Modal from './modal/index';
import { logout } from '../slices/authSlice';

const MainPage = () => {
  const dispatch = useDispatch();
  const { isLoading: isChannelsLoading, error: isChannelsError } = useFetchChannelsQuery();
  const { isLoading: isMessagesLoading, error: isMessagesError } = useFetchMessagesQuery();
  useEffect(() => {
    if ((isChannelsError?.status === 401 || isMessagesError?.status === 401)) {
      dispatch(logout());
    }
  }, [isChannelsError, isMessagesError, dispatch]);
  return (
    isChannelsLoading || isMessagesLoading
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
};

export default MainPage;
