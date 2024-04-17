import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { /* useLocation, */useNavigate } from 'react-router-dom';

import { login } from '../slices/authSlice';

function LoginPage() {
  const inputRef = useRef();
  // const location = useLocation();
  // const navigate = useNavigate();
  const authStatus = useSelector((state) => state.authStore.status);
  const loggedIn = useSelector((state) => state.authStore.loggedIn);
  const dispatch = useDispatch();
  // const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  useEffect(() => {
    if (loggedIn) {
      navigate('/');
    }
  }, [loggedIn]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });
  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-sm-4">
          <Form onSubmit={formik.handleSubmit} className="p-3">
            <fieldset>
              <Form.Group>
                <Form.Label htmlFor="username">Ваш ник</Form.Label>
                <Form.Control
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  placeholder="Ваш ник"
                  name="username"
                  id="username"
                  autoComplete="username"
                  required
                  ref={inputRef}
                  isInvalid={authStatus === 'error'}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="password">Пароль</Form.Label>
                <Form.Control
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  placeholder="Пароль"
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  required
                  isInvalid={authStatus === 'error'}
                />
                <Form.Control.Feedback type="invalid">Неверные имя пользователя или пароль</Form.Control.Feedback>
              </Form.Group>
              <Button type="submit" variant="outline-primary">Войти</Button>
            </fieldset>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
