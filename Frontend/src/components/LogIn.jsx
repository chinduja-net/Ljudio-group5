import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { loginFetch } from "../services/authService";

function LogIn() {
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(userName, password);
  };

  function saveToken(token) {
    return new Promise((resolve, reject) => {
      sessionStorage.setItem("auth", token);

      resolve("Done");
    });
  }


  async function login(userName, password) {
    const obj = {
      userName,
      password,
    };
    try {
      const data = await loginFetch(obj);
      if ((data.success = false)) {
        console.log("Wrong Credentials");
        history.push("/signup");
      } else {
        await saveToken(data.token);
      }
    } catch (error) {
      console.log(error);
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


//To verify if the user is logged in
//can be used to give access to make playlists etc...

/*
function getToken() {
    return sessionStorage.getItem("auth");
  }
 async function isLoggedIn() {
    const token = getToken();
    const response = await fetch('http://localhost:3000/api/staff/loggedin', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
  
     if (!data.loggedIn) {
      location.href = 'http://localhost:3000/login.html';
    } 
    }
  
  isLoggedIn() */