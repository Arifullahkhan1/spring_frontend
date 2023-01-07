import {  useEffect, useState } from "react";
import "./App.css";
import LoginForm from "./compunents/LoginForm";
import Todos from "./compunents/Todos";
import Button from '@mui/material/Button';

 


function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  // const [newloggedInUser, setNewloggedInUser] = useState(null);
  const handleLogedOut=()=>{
    localStorage.removeItem('user')
    setLoggedInUser(null)
  }
  useEffect(()=>{
   
  let newuser= localStorage.getItem('user');

  setLoggedInUser(JSON.parse(newuser));

},[])
     
   /* console.log("hey")
   console.log(loggedInUser); */
  return (
    <div className="App ">
      {loggedInUser ? (  // if loggedin is true show the user page 
        
        <div>
          <h1 className="main_header-form lodingHeading_Adjesmwnt">{loggedInUser.userName}'s Todo-sida</h1>
          <Todos user={loggedInUser} />
         
         <Button  size="small"  sx={{mt:-8} }  onClick={handleLogedOut}>Logout</Button> 
        
        
        </div>
      ) : ( //   show else login form
        <LoginForm setLoggedInUser={setLoggedInUser} />
        
      )}
    </div>
  );
}

export default App;
