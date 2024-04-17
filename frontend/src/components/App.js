import '../App.css';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navbar, Button } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom';

import { checkAuth, logout } from '../slices/authSlice';
import LoginPage from './LoginPage';
import MainPage from './MainPage';

function Page404() {
  return <div>Page 404</div>;
}

// eslint-disable-next-line react/prop-types
function MainRoute({ children }) {
  const location = useLocation();
  const loggedIn = useSelector((state) => state.authStore.loggedIn);
  if (loggedIn === null) {
    return null;
  }
  return (
    loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
}

// eslint-disable-next-line react/prop-types
/* function LoginRoute({ children }) {
  const location = useLocation();
  const loggedIn = useSelector((state) => state.authStore.loggedIn);
  return (
    !loggedIn ? children : <Navigate to="/" state={{ from: location }} />
  );
} */

function App() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.authStore.loggedIn);
  // dispatch(checkAuth());
  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  return (
    <Router>
      <Navbar bg="white" expand="lg" className="shadow-sm">
        <div className="container">
          <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
          {loggedIn && <Button onClick={() => dispatch(logout())}>Выйти</Button>}
        </div>
      </Navbar>
      <Routes>
        <Route path="*" element={<Page404 />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={(
            <MainRoute>
              <MainPage />
            </MainRoute>
          )}
        />
      </Routes>
    </Router>
  );
}

export default App;
