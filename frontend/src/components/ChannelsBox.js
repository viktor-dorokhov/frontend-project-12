import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Col,
  Button,
  ButtonGroup,
  Dropdown,
} from 'react-bootstrap';
import { PlusCircle as PlusCircleIcon } from 'react-bootstrap-icons';
import { animateScroll } from 'react-scroll';
import { useFetchChannelsQuery } from '../services/channelsApi';
import { setActiveChannel, openModal, defaultChannelId } from '../slices/uiSlice';

function ChannelsBox() {
  const { data: channels } = useFetchChannelsQuery();
  const activeChannelId = useSelector((state) => state.uiStore.activeChannelId);
  const colorTheme = useSelector((state) => state.uiStore.colorTheme);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const scrollOptions = {
    duration: 0,
    delay: 0,
    containerId: 'channels-box',
  };

  useEffect(() => {
    if (activeChannelId === defaultChannelId) {
      animateScroll.scrollToTop(scrollOptions);
      return;
    }
    animateScroll.scrollToBottom(scrollOptions);
  }, [channels?.length]);

  const setChannel = (id) => {
    dispatch(setActiveChannel(id));
  };

  const handleAddChannel = () => {
    dispatch(openModal({ modalName: 'addChannel' }));
  };

  const handleRenameChannel = (id, name) => {
    dispatch(openModal({ modalName: 'renameChannel', data: { id, name } }));
  };

  const handleRemoveChannel = (id) => {
    dispatch(openModal({ modalName: 'removeChannel', data: id }));
  };

  return (
    <Col xs={4} md={2} className={`border-end px-0 flex-column h-100 d-flex bg-${colorTheme}`}>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels.channels')}</b>
        <Button type="button" variant="group-vertical" className="p-0 text-primary" onClick={handleAddChannel}>
          <PlusCircleIcon size={20} />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map(({ id, name, removable }) => {
          const variant = id === activeChannelId ? 'secondary' : '';
          return (
            <li key={id} className="nav-item w-100">
              {removable
                ? (
                  <Dropdown as={ButtonGroup} className="d-flex">
                    <Button
                      variant={variant}
                      className="w-100 rounded-0 text-start text-truncate"
                      onClick={() => setChannel(id)}
                    >
                      <span className="me-1">#</span>
                      {name}
                    </Button>
                    <Dropdown.Toggle split variant={variant} id="dropdown-split-basic">
                      <span className="visually-hidden">{t('channels.title')}</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleRemoveChannel(id)}>{t('channels.remove')}</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleRenameChannel(id, name)}>{t('channels.rename')}</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )
                : (
                  <Button
                    variant={variant}
                    className="w-100 rounded-0 text-start text-truncate"
                    onClick={() => setChannel(id)}
                  >
                    <span className="me-1">#</span>
                    {name}
                  </Button>
                )}
            </li>
          );
        })}
      </ul>
    </Col>
  );
}

export default ChannelsBox;
