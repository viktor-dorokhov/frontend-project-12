import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { useFetchMessagesQuery, useAddMessageMutation } from '../services/messagesApi';
import { useFetchChannelsQuery } from '../services/channelsApi';

function MessagesBox() {
  const { data: allMessages } = useFetchMessagesQuery();
  const { data: channels } = useFetchChannelsQuery();
  const getMessagesByChannel = createSelector(
    (state) => state.uiStore.activeChannelId,
    (activeChannelId) => {
      const messagesByChannel = allMessages?.filter((m) => m.channelId === activeChannelId);
      return messagesByChannel;
    },
  );
  const messages = useSelector(getMessagesByChannel);
  const getActiveChannelName = createSelector(
    (state) => state.uiStore.activeChannelId,
    (activeChannelId) => (
      channels?.find((channel) => channel.id === activeChannelId).name
    ),
  );
  const channelName = useSelector(getActiveChannelName);
  const [
    addMessage,
  ] = useAddMessageMutation();
  const { t } = useTranslation();
  const inputRef = useRef();
  const currentUserName = useSelector((state) => state.authStore.username);
  const activeChannelId = useSelector((state) => state.uiStore.activeChannelId);
  // const dispatch = useDispatch();
  useEffect(() => {
    // inputRef.current.focus();
  }, []);
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
      addMessage({
        body: values.message, channelId: activeChannelId, username: currentUserName,
      });
      formik.resetForm();
    },
  });

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{`# ${channelName}`}</b>
          </p>
          <span className="text-muted">{t('messages.counter.count', { count: messages.length })}</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {messages
            .map(({ id, body, username }) => (
              <div key={id} className="text-break mb-2">
                <b>{username}</b>
                :
                {body}
              </div>
            ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <Form onSubmit={formik.handleSubmit} className="py-1 border rounded-2" noValidate>
            <Form.Group className="input-group has-validation">
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.message}
                placeholder={t('messages.placeholder')}
                className="border-0 p-0 ps-2 form-control"
                name="message"
                id="message"
                autoComplete="message"
                required
                ref={inputRef}
              />
              <Button type="submit" variant="outline-primary">{t('messages.send')}</Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default MessagesBox;
