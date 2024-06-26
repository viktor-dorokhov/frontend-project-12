import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { useFormik } from 'formik';
import { Col, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ArrowRightCircle as SendIcon } from 'react-bootstrap-icons';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';
import { animateScroll } from 'react-scroll';
import { useFetchMessagesQuery, useAddMessageMutation } from '../services/messagesApi';
import { useFetchChannelsQuery } from '../services/channelsApi';

const validationSchema = yup.object().shape({
  message: yup
    .string()
    .trim()
    .required(),
});

const scrollOptions = {
  duration: 0,
  delay: 0,
  containerId: 'messages-box',
};

const MessagesBox = () => {
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
      channels?.find((channel) => channel.id === activeChannelId)?.name
    ),
  );
  const channelName = useSelector(getActiveChannelName);
  const [addMessage] = useAddMessageMutation();
  const { t } = useTranslation();
  const inputRef = useRef();
  const currentUserName = useSelector((state) => state.authStore.username);
  const activeChannelId = useSelector((state) => state.uiStore.activeChannelId);
  const colorTheme = useSelector((state) => state.uiStore.colorTheme);

  useEffect(() => {
    animateScroll.scrollToBottom(scrollOptions);
  }, [messages?.length]);
  useEffect(() => {
    animateScroll.scrollToBottom(scrollOptions);
    inputRef.current.focus();
  }, [activeChannelId]);

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await addMessage({
          body: leoProfanity.clean(values.message.trim()),
          channelId: activeChannelId,
          username: currentUserName,
        }).unwrap();
        formik.resetForm();
        inputRef.current.focus();
      } catch (err) {
        toast.error(t('main.errorNetwork'));
      }
    },
  });

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className={`mb-4 p-3 shadow-sm small bg-${colorTheme}`}>
          <p className="m-0">
            <b>{`# ${channelName}`}</b>
          </p>
          <span className="text-muted">{t('messages.counter.count', { count: messages?.length })}</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {(messages || [])
            .map(({ id, body, username }) => (
              <div key={id} className="text-break mb-2">
                <b>{username}</b>
                :&nbsp;
                {body}
              </div>
            ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <Form onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
            <Form.Group className="input-group">
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.message}
                placeholder={t('messages.placeholder')}
                className="border-0 p-0 ps-2 form-control"
                name="message"
                id="message"
                autoComplete="message"
                ref={inputRef}
                aria-label={t('messages.newMessage')}
              />
              <Button type="submit" variant="group-vertical" className="border-0" disabled={!(formik.isValid && formik.dirty)}>
                <SendIcon size={20} />
                <span className="visually-hidden">{t('messages.send')}</span>
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </Col>
  );
};

export default MessagesBox;
