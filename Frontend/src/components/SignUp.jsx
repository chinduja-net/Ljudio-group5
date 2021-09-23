<<<<<<< HEAD
import React from "react";
import { useState } from "react";
import { createAccountFetch } from "../services/authService";
import { useHistory } from "react-router";

function SignUp() {
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
=======
import React from 'react';
import { useState } from 'react';
import { createAccountFetch } from '../services/authService';

function SignUp() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
>>>>>>> backendStructuring

  const handleSubmit = (e) => {
    e.preventDefault();

    createAccount(userName, password);
  };

  async function createAccount(userName, password) {
    const obj = {
      userName,
      password,
    };
    try {
      const data = await createAccountFetch(obj);

      if (data) {
<<<<<<< HEAD

            console.log(data);
            history.push('/Home');
=======
        console.log(data);
>>>>>>> backendStructuring
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1>create Account</h1>
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

        <button>Create Account</button>
      </form>
    </>
  );
}

export default SignUp;
