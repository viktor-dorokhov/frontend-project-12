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
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import chatImage from '../assets/chat.png';
import { useLoginMutation } from '../services/authApi';

const LoginPage = () => {
  const inputRef = useRef();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const [isLoginFailed, setLoginFailed] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setLoginFailed(false);
      try {
        await login(values).unwrap();
        navigate('/');
      } catch (err) {
        if (err.status === 401) {
          setLoginFailed(true);
          return;
        }
        toast.error(t('main.errorNetwork'));
      }
    },
  });

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
                  src={chatImage}
                  alt={t('login.title')}
                />
              </Col>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">{t('login.title')}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    placeholder={t('login.username')}
                    name="username"
                    id="username"
                    autoComplete="current-username"
                    required
                    ref={inputRef}
                    isInvalid={isLoginFailed}
                  />
                  <Form.Label htmlFor="username">{t('login.username')}</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    placeholder={t('login.password')}
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    required
                    isInvalid={isLoginFailed}
                  />
                  <Form.Label htmlFor="password">{t('login.password')}</Form.Label>
                  <Form.Control.Feedback type="invalid">{t('login.errorAuth')}</Form.Control.Feedback>
                </Form.Group>
                <Button
                  type="submit"
                  variant="outline-primary"
                  className="w-100 mb-3"
                  disabled={formik.isSubmitting}
                >
                  {t('login.submit')}
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('login.noAccount')}</span>
                &nbsp;
                <Link to="/signup">{t('login.signup')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
