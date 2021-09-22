import React from 'react';
import { useState } from 'react';
import { loginFetch } from '../services/authService';

function LogIn() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    login(userName, password);
  };

  async function login(userName, password) {
    const obj = {
      userName,
      password,
    };

    let data = await loginFetch(obj);
    if (data.length === 0) {
      console.log('Wrong Credentials');
    } else {
      sessionStorage.setItem('token', data.token);
      console.log('Logged in!');
    }
  }

  return (
    <>
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="text">UserName</label>
        <input
          type="text"
          name="userName"
          onChange={(e) => setUserName(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button>LOGIN</button>
      </form>
    </>
  );
}

export default LogIn;
