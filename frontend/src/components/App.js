import '../App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import { Navbar, Button } from 'react-bootstrap';
import LoginPage from './LoginPage';

function MainPage() {
  return <div>Main page</div>;
}

function Page404() {
  return <div>Page 404</div>;
}

function App() {
  return (
    <Router>
      <Navbar bg="white" expand="lg">
        <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
        <Button as={Link} to="/login">Войти</Button>
      </Navbar>
      <Routes>
        <Route path="*" element={<Page404 />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
