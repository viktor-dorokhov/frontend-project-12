import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../slices/uiSlice';

import AddChannelModal from './AddChannel';
import RemoveChannelModal from './RemoveChannel';
import RenameChannelModal from './RenameChannel';

const modalsMapping = {
  addChannel: AddChannelModal,
  removeChannel: RemoveChannelModal,
  renameChannel: RenameChannelModal,
};

const Modal = () => {
  const dispatch = useDispatch();
  const activeModal = useSelector((state) => state.uiStore.modal.active);
  if (!activeModal) {
    return null;
  }

  const handleClose = () => {
    dispatch(closeModal());
  };
  const ModalWindow = modalsMapping[activeModal];

  return <ModalWindow onHide={handleClose} />;
};

export default Modal;
