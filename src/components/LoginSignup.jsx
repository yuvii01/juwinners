import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import "./LoginSignup.css";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [signupData, setSignupData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');  // For signup success message
  const navigate = useNavigate(); // Hook for navigation

  // Handle form input changes for login
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  // Handle form input changes for signup
  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  // Email validation function
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Handle login form submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginData.password.length < 8) {
      setError('Password must be at least 8 characters long');
    } else {
      setError('');
      console.log('Logged in with:', loginData);
      navigate('/interest-selector'); // Redirect to InterestSelector after login
    }
  };

  // Handle signup form submission
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = signupData;

    // Email validation
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
    } else if (password.length < 8) {
      setError('Password must be at least 8 characters long');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match');
    } else {
      setError('');
      setSuccess('Signup successful! Please log in.');
      // Clear form and switch to login view
      setSignupData({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      setTimeout(() => {
        setSuccess('');
        setIsLogin(true);
      }, 2000); // Switch to login after 2 seconds
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-4">
        <div className="text-center mb-4">
          <Button
            variant={isLogin ? 'primary' : 'light'}
            onClick={() => setIsLogin(true)}
          >
            Login
          </Button>
          <Button
            variant={!isLogin ? 'primary' : 'light'}
            onClick={() => setIsLogin(false)}
          >
            Signup
          </Button>
        </div>

        {isLogin ? (
          <Form onSubmit={handleLoginSubmit}>
            <h2 className="text-center mb-4">Login</h2>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={loginData.username}
                onChange={handleLoginChange}
                placeholder="Enter username"
                required
                className="form-control-sm"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                placeholder="Enter password"
                required
                className="form-control-sm"
              />
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        ) : (
          <Form onSubmit={handleSignupSubmit}>
            <h2 className="text-center mb-4">Signup</h2>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={signupData.name}
                onChange={handleSignupChange}
                placeholder="Enter name"
                required
                className="form-control-sm"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={signupData.username}
                onChange={handleSignupChange}
                placeholder="Enter username"
                required
                className="form-control-sm"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={signupData.email}
                onChange={handleSignupChange}
                placeholder="Enter email"
                required
                className="form-control-sm"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={signupData.password}
                onChange={handleSignupChange}
                placeholder="Enter password"
                required
                className="form-control-sm"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={signupData.confirmPassword}
                onChange={handleSignupChange}
                placeholder="Confirm password"
                required
                className="form-control-sm"
              />
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Button variant="primary" type="submit" className="w-100">
              Signup
            </Button>
          </Form>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
