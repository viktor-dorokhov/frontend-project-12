import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';
import { useFetchChannelsQuery, useRenameChannelMutation } from '../../services/channelsApi';

const getValidationSchema = (channelNames) => yup.object().shape({
  name: yup
    .string()
    .trim()
    .required('modal.validation.required')
    .notOneOf(channelNames, 'modal.validation.uniq')
    .min(3, 'modal.validation.length')
    .max(20, 'modal.validation.length'),
});

// eslint-disable-next-line react/prop-types
const RenameChannel = ({ onHide }) => {
  const { t } = useTranslation();
  const [renameChannel] = useRenameChannelMutation();
  const { data: channels } = useFetchChannelsQuery();
  const channelNames = channels.map(({ name }) => name);
  const channelId = useSelector((state) => state.uiStore.modal.data.id);
  const channelName = useSelector((state) => state.uiStore.modal.data.name);

  const formik = useFormik({
    initialValues: {
      name: channelName,
    },
    validationSchema: getValidationSchema(channelNames),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async ({ name }) => {
      try {
        await renameChannel({ name: leoProfanity.clean(name.trim()), id: channelId }).unwrap();
        toast.success(t('channels.toast.renamed'));
        formik.resetForm();
        onHide();
      } catch (err) {
        toast.error(t('main.errorNetwork'));
      }
    },
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  }, []);

  return (
    <Modal show onHide={onHide} centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modal.renameChannel.title')}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              data-testid="input-name"
              placeholder={t('modal.renameChannel.placeholder')}
              isInvalid={formik.errors.name && formik.touched.name}
              name="name"
              id="name"
            />
            <Form.Label className="visually-hidden" htmlFor="name">{t('modal.renameChannel.placeholder')}</Form.Label>
            <Form.Control.Feedback type="invalid">{t(formik.errors.name)}</Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            {t('modal.buttons.cancel')}
          </Button>
          <Button type="submit" variant="primary" disabled={formik.isSubmitting}>
            {t('modal.buttons.submit')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default RenameChannel;
