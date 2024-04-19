import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { /* useLocation, */useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// import { login } from '../slices/authSlice';

import { useLoginMutation } from '../services/authApi';

function LoginPage() {
  const inputRef = useRef();
  // const location = useLocation();
  // const navigate = useNavigate();
  const authStatus = useSelector((state) => state.authStore.status);
  const { t } = useTranslation();
  // const dispatch = useDispatch();
  // const location = useLocation();
  const navigate = useNavigate();

  const [login] = useLoginMutation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        await login(values).unwrap();
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
                <Form.Label htmlFor="username">{t('login.username')}</Form.Label>
                <Form.Control
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  placeholder={t('login.username')}
                  name="username"
                  id="username"
                  autoComplete="username"
                  required
                  ref={inputRef}
                  isInvalid={authStatus === 'error'}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="password">{t('login.password')}</Form.Label>
                <Form.Control
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  placeholder={t('login.username')}
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  required
                  isInvalid={authStatus === 'error'}
                />
                <Form.Control.Feedback type="invalid">{t('login.errorAuth')}</Form.Control.Feedback>
              </Form.Group>
              <Button type="submit" variant="outline-primary" disabled={formik.isSubmitting}>{t('login.submit')}</Button>
            </fieldset>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
