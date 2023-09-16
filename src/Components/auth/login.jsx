import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './login.scss';
function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const { loggedIn, login, logout } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData.username, formData.password);
  };

  return (
    <div className='login-div'>
      {loggedIn ? (
        <button onClick={logout}>Log Out</button>
      ) : (
        <form className='login-form' onSubmit={handleSubmit}>
          
          <input 
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <input 
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button  type="submit">Login</button>
        </form>
      )}
    </div>
  );
}

export default Login;
