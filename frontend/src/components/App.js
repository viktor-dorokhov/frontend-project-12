import '../App.css';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { Translate as TranslateIcon } from 'react-bootstrap-icons';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { logout } from '../slices/authSlice';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import MainPage from './MainPage';
import { changeLanguage } from '../slices/uiSlice';

function Page404() {
  return <div>Page 404</div>;
}

function MainRoute() {
  const location = useLocation();
  const loggedIn = useSelector((state) => state.authStore.loggedIn);
  return (
    loggedIn ? <MainPage /> : <Navigate to="/login" state={{ from: location }} />
  );
}

function App() {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const loggedIn = useSelector((state) => state.authStore.loggedIn);
  const language = useSelector((state) => state.uiStore.language);
  const handleChangeLanguage = (value) => {
    dispatch(changeLanguage(value));
    i18n.changeLanguage(value);
  };

  return (
    <Router>
      <div className="d-flex flex-column h-100">
        <Navbar bg="white" expand="lg" className="shadow-sm">
          <Container>
            <Navbar.Brand as={Link} to="/">{t('main.appName')}</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end me-3">
              <Nav>
                <NavDropdown
                  title={(
                    <>
                      <TranslateIcon size={20} />
                      <span className="visually-hidden">{t('language.title')}</span>
                    </>
                  )}
                >
                  <NavDropdown.Item active={language === 'ru'} onClick={() => handleChangeLanguage('ru')}>{t('language.ru')}</NavDropdown.Item>
                  <NavDropdown.Item active={language === 'en'} onClick={() => handleChangeLanguage('en')}>{t('language.en')}</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
            {loggedIn && <Button onClick={() => dispatch(logout())}>{t('main.logout')}</Button>}
          </Container>
        </Navbar>
        <Routes>
          <Route path="*" element={<Page404 />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<MainRoute />} />
        </Routes>
      </div>
      <ToastContainer />
    </Router>
  );
}

export default App;
