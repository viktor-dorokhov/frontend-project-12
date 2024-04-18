import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFetchChannelsQuery } from '../services/channelsApi';
import { setActiveChannel } from '../slices/uiSlice';

function ChannelsBox() {
  const { data: channels } = useFetchChannelsQuery();
  const activeChannelId = useSelector((state) => state.uiStore.activeChannelId);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const setChannel = (id) => {
    dispatch(setActiveChannel(id));
  };
  const cn = 'w-100 rounded-0 text-start btn';

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels.channels')}</b>
      </div>
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
    </div>
  );
}

export default ChannelsBox;
