import React, { useState } from "react";

const LoginForm = (props) => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const{setLoggedInUser}=props
  
  const handleLogin = async (event) => {
    event.preventDefault();
    let responce = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/auth/login`,
      {
        method: "POST",
        body: JSON.stringify({
          userName: userName,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    let token = await responce.text();
    console.log(token);
     responce = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/auth/whoami?token=${token}`);
        let user = await  responce.json();
        setLoggedInUser(user);
  }

  return (
    <div>
      <h2>Login Form</h2>
      <form>
        <p>Username</p>
        <input
          type="Text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          value={userName}
        />

        <p>Password</p>
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <br></br>
        <button className="btn btn-danger "  style={{marginTop:5}} type="button" onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
