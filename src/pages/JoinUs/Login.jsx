import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would handle form submission, e.g., send data to your backend
    alert(`Form submitted for ${isLogin ? 'Login' : 'Registration'}`);
  };

  return (
    <main className="login-register-main">
      <div className="form-container">
        <h1>{isLogin ? 'Login' : 'Register'}</h1>
        <p>
          {isLogin ? 'Welcome back!' : 'Create your account to get started.'}
        </p>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" required />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input type="password" id="confirm-password" name="confirm-password" required />
            </div>
          )}

          <button type="submit" className="Button-primary form-submit-button">
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>

        <div className="toggle-form-text">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button onClick={toggleForm} className="toggle-form-button">
            {isLogin ? 'Register' : 'Login'}
          </button>
        </div>
        
        <div className="back-to-home">
          <Link to="/">&larr; Back to Home</Link>
        </div>
      </div>
    </main>
  );
}