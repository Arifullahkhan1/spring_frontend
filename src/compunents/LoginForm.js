import React, { useState, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

const LoginForm = (props) => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState(false);
  const [emptyErrMsg, setEmptyErrMsg] = useState(false);
  const { setLoggedInUser } = props;
  const userRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, []);
  /*  
  const handleOnChange = (e)=>{
if(value.lenght()!==null){
     setUsername(e.target.value);
     setPassword(e.target.value);
}
 else setEmptyErrMsg('it can not be empty', true)
 
} */
  const handleLogin = async (event) => {
    event.preventDefault();
    if (userName.length === 0 || password.length === 0) {
      setEmptyErrMsg("empty!", true);
    }

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
    // console.log(token);

    responce = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/auth/whoami?token=${token}`
    );
    let user = await responce.json();

    if (user.userName) {
     
      setLoggedInUser(user);
      localStorage.setItem("user", JSON.stringify(user)); // Save user object in LocalStorage
    
    } else setErrMsg("userName or password is incorrect", true);
  };

  return (
    <>
      <div className="background">
        <FormControl>
          <Box
            component="form"
            sx={{
              mt: 50,
            }}
            noValidate
            autoComplete="off"
          >
            {" "}
           
            <TextField
              inputRef={userRef}
              type="text"
              label="username"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
              className="text_label "
            />
          
          <TextField
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="errMsg">{emptyErrMsg}</div>
            <div className="errMsg">{errMsg}</div>
          </Box>

          <Button sx={{ mt: 2 }} variant="contained" onClick={handleLogin}>
            Login
          </Button>

          <h2 className="signup">
            Not a Member ?
            <span>
              {" "}
              <Button
                variant="contained"
                color="info"
                onClick={() => {
                  console.log("i am clicked");
                }}
              >
                Sign Up
              </Button>
            </span>
          </h2>
        </FormControl>
      </div>
    </>
  );
};

export default LoginForm;
