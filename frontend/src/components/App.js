import '../App.css';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navbar, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { logout } from '../slices/authSlice';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import MainPage from './MainPage';

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
  const { t } = useTranslation();
  const loggedIn = useSelector((state) => state.authStore.loggedIn);
  return (
    <Router>
      <div className="d-flex flex-column h-100">
        <Navbar bg="white" expand="lg" className="shadow-sm">
          <div className="container">
            <Navbar.Brand as={Link} to="/">{t('main.appName')}</Navbar.Brand>
            {loggedIn && <Button onClick={() => dispatch(logout())}>{t('main.logout')}</Button>}
          </div>
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
