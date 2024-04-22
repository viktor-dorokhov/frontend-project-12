import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Card,
  Image,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { toast } from 'react-toastify';

import addUserImage from '../assets/addUser.png';
import { useSignupMutation } from '../services/authApi';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required('signup.validation.required')
    .min(3, 'signup.validation.usernameLength'),
  password: yup
    .string()
    .trim()
    .required('signup.validation.required')
    .min(6, 'signup.validation.passwordLength'),
  confirm: yup
    .string()
    .trim()
    .required('signup.validation.required')
    .oneOf(
      [yup.ref('password')],
      'signup.validation.confirmPassword',
    ),
});

const SignupPage = () => {
  const inputRef = useRef();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [signup] = useSignupMutation();
  const [isSignupFailed, setSignupFailed] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirm: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setSignupFailed(false);
      try {
        await signup({ username: values.username, password: values.password }).unwrap();
        navigate('/');
      } catch (err) {
        if (err.status === 409) {
          setSignupFailed(true);
          return;
        }
        toast.error(t('main.errorNetwork'));
      }
    },
  });

  useEffect(() => {
    setSignupFailed(false);
  }, [formik.values]);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                <Image
                  fluid
                  className="w-50"
                  src={addUserImage}
                  alt={t('signup.title')}
                />
              </Col>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">{t('signup.title')}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    placeholder={t('signup.username')}
                    name="username"
                    data-testid="input-username"
                    autoComplete="new-username"
                    ref={inputRef}
                    isInvalid={(formik.errors.username && formik.touched.username)
                      || isSignupFailed}
                  />
                  <Form.Label htmlFor="username">{t('signup.username')}</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {isSignupFailed ? t('signup.validation.userExists') : t(formik.errors.username)}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    placeholder={t('signup.password')}
                    name="password"
                    id="password"
                    autoComplete="new-password"
                    isInvalid={formik.errors.password && formik.touched.password}
                  />
                  <Form.Label htmlFor="password">{t('signup.password')}</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>{t(formik.errors.password)}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirm}
                    placeholder={t('signup.confirm')}
                    name="confirm"
                    id="confirm"
                    autoComplete="new-confirm"
                    isInvalid={formik.errors.confirm && formik.touched.confirm}
                  />
                  <Form.Label htmlFor="password">{t('signup.confirm')}</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>{t(formik.errors.confirm)}</Form.Control.Feedback>
                </Form.Group>
                <Button
                  type="submit"
                  variant="outline-primary"
                  className="w-100 mb-3"
                  disabled={formik.isSubmitting}
                >
                  {t('signup.submit')}
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <Button variant="link" onClick={goBack}>{t('signup.back')}</Button>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;
