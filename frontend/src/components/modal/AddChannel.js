import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useFetchChannelsQuery, useAddChannelMutation } from '../../services/channelsApi';

const getValidationSchema = (channelNames) => yup.object().shape({
  name: yup
    .string()
    .trim()
    .required('modal.validation.required')
    .notOneOf(channelNames, 'modal.validation.uniq')
    .min(3, 'modal.validation.min')
    .max(20, 'modal.validation.max'),
});

// eslint-disable-next-line react/prop-types
function AddChannel({ onHide }) {
  const { t } = useTranslation();
  const [addChannel] = useAddChannelMutation();
  const { data: channels } = useFetchChannelsQuery();
  const channelNames = channels.map(({ name }) => name);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: getValidationSchema(channelNames),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async ({ name }) => {
      addChannel({ name: name.trim() });
      formik.resetForm();
      onHide();
    },
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal show onHide={onHide} centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modal.addChannel.title')}</Modal.Title>
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
              placeholder={t('modal.addChannel.placeholder')}
              isInvalid={formik.errors.name && formik.touched.name}
              name="name"
            />
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
}

export default AddChannel;
