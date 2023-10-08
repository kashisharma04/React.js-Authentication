import React, { useState } from "react";
import LogoutButton from './LogoutButton';
import Notes from "./Notes";

export const Login = (props) => {
  const [form, setForm] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/login", {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    let result = response.status;
    if (Number(result) === 200) {
      setIsLoggedIn(true);
      alert('Login Successfully');
    } else {
      alert('Please Enter a valid email and password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="auth-form-container">
      {isLoggedIn ? (
        <div>
          <h2>Welcome, User</h2>
          <Notes />
          <LogoutButton onLogout={handleLogout} />
        </div>
      ) : (
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">email</label>
          <input onChange={handleForm} type="email" placeholder="Enter your email address" id="email" name="email" />
          <label htmlFor="password">password</label>
          <input onChange={handleForm} type="password" placeholder="Enter your password" id="password" name="password" />
          <button type="submit">Log In</button>
        </form>
      )}
      <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
    </div>
  );
};
