import React, { useState } from "react";
import LogoutButton from './LogoutButton';


export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
  
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Add a state variable for login status

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Login Successfully');
        console.log(email);
        setIsLoggedIn(true); 
    }
    const handleLogout = () => {
      setIsLoggedIn(false); // Set login status to false when the user logs out
    }
    return (
      <div className="auth-form-container">
      {isLoggedIn ? (
        <div>
          <h2>Welcome, User</h2>
          <LogoutButton onLogout={handleLogout} />
        </div>
      ) : (
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
          <label htmlFor="password">password</label>
          <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
          <button type="submit">Log In</button>
        </form>
      )}
      <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
    </div>
    )
}