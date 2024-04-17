import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';

import { fetchChannels, setActiveChannel } from '../slices/channelsSlice';
import { addMessage } from '../slices/messagesSlice';

function renderChannels(channels, setChannel, activeChannelId) {
  const cn = 'w-100 rounded-0 text-start btn';

  return (
    <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {channels.map(({ id, name }) => (
        <li key={id} className="nav-item w-100">
          <button type="button" className={cn + (id === activeChannelId ? ' btn-secondary' : '')} onClick={() => setChannel(id)}>
            <span className="me-1">#</span>
            {name}
          </button>
        </li>
      ))}
    </ul>
  );
}

function renderMessages(messages, activeChannelId) {
  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {messages
        .filter(({ channelId }) => channelId === activeChannelId)
        .map(({ id, body, username }) => (
          <div key={id} className="text-break mb-2">
            <b>{username}</b>
            :
            {body}
          </div>
        ))}
    </div>
  );
}

function MainPage() {
  const inputRef = useRef();
  const authToken = useSelector((state) => state.authStore.authToken);
  const username = useSelector((state) => state.authStore.username);
  const channels = useSelector((state) => state.channelsStore.channels);
  const activeChannelId = useSelector((state) => state.channelsStore.activeId);
  const messages = useSelector((state) => state.messagesStore.messages);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchChannels(authToken));
    inputRef.current.focus();
  }, []);
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
      dispatch(addMessage({
        body: values.message, channelId: activeChannelId, username, authToken,
      }));
      // eslint-disable-next-line no-param-reassign
      values.message = '';
    },
  });
  const setChannel = (id) => {
    dispatch(setActiveChannel(id));
  };

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>Каналы</b>
          </div>
          {!!channels.length && renderChannels(channels, setChannel, activeChannelId)}
        </div>
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b># general</b>
              </p>
              <span className="text-muted">
                {messages.length}
                &nbsp;сообщения
              </span>
            </div>
            {!!messages.length && renderMessages(messages, activeChannelId)}
            <div className="mt-auto px-5 py-3">
              <Form onSubmit={formik.handleSubmit} className="py-1 border rounded-2" noValidate>
                <Form.Group className="input-group has-validation">
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.message}
                    placeholder="Введите сообщение..."
                    className="border-0 p-0 ps-2 form-control"
                    name="message"
                    id="message"
                    autoComplete="message"
                    required
                    ref={inputRef}
                  />
                  <Button type="submit" variant="outline-primary">Отправить</Button>
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
