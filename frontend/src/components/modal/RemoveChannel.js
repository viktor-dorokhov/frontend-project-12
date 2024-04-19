import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useRemoveChannelMutation } from '../../services/channelsApi';

// eslint-disable-next-line react/prop-types
function RemoveChannel({ onHide }) {
  const [isSubmitting, setSubmitting] = useState(false);
  const { t } = useTranslation();
  const [removeChannel] = useRemoveChannelMutation();
  const channelId = useSelector((state) => state.uiStore.modal.data);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      removeChannel(channelId);
      onHide();
    } catch (e) {
      setSubmitting(false);
    }
  };

  return (
    <Modal show onHide={onHide} centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modal.removeChannel.title')}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {t('modal.removeChannel.body')}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            {t('modal.buttons.cancel')}
          </Button>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {t('modal.buttons.remove')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default RemoveChannel;
