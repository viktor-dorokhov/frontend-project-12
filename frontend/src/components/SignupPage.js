import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { /* useLocation, */useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSignupMutation } from '../services/authApi';

function LoginPage() {
  const inputRef = useRef();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [signup] = useSignupMutation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirm: '',
    },
    onSubmit: async (values) => {
      try {
        await signup({ username: values.username, password: values.password }).unwrap();
        navigate('/');
      } catch (err) {
        // console.log(err);
      }
    },
  });
  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-sm-4">
          <Form onSubmit={formik.handleSubmit} className="p-3">
            <fieldset>
              <Form.Group>
                <Form.Label htmlFor="username">{t('signup.username')}</Form.Label>
                <Form.Control
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  placeholder={t('signup.username')}
                  name="username"
                  id="username"
                  autoComplete="username"
                  required
                  ref={inputRef}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="password">{t('signup.password')}</Form.Label>
                <Form.Control
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  placeholder={t('signup.password')}
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="confirm">{t('signup.confirm')}</Form.Label>
                <Form.Control
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.confirm}
                  placeholder={t('signup.confirm')}
                  name="confirm"
                  id="confirm"
                  autoComplete="current-confirm"
                  required
                />
                <Form.Control.Feedback type="invalid">{t('signup.errorAuth')}</Form.Control.Feedback>
              </Form.Group>
              <Button type="submit" variant="outline-primary">{t('signup.submit')}</Button>
            </fieldset>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
