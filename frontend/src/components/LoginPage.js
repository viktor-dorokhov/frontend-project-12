import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
/* import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom'; */
import { Button, Form } from 'react-bootstrap';

function LoginPage() {
  const inputRef = useRef();
  // const location = useLocation();
  // const navigate = useNavigate();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    /* onSubmit: async (values) => {
        setAuthFailed(false);
        try {
          const res = await axios.post(routes.loginPath(), values);
          localStorage.setItem('userId', JSON.stringify(res.data));
          auth.logIn();
          const { from } = location.state;
          navigate(from);
        } catch (err) {
          formik.setSubmitting(false);
          if (err.isAxiosError && err.response.status === 401) {
            setAuthFailed(true);
            inputRef.current.select();
            return;
          }
          throw err;
        }
      }, */
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
