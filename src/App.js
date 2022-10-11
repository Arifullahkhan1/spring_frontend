import { useState } from "react";
import "./App.css";
import LoginForm from "./compunents/LoginForm";
import Todos from "./compunents/Todos";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <div className="App">
      {loggedInUser ? (
        <div>
          <h1>{loggedInUser.userName}'s Todo-sida</h1>
          <Todos user={loggedInUser} />
          <button onClick={() => setLoggedInUser(null)}>Logout</button>
        </div>
      ) : (
        <LoginForm setLoggedInUser={setLoggedInUser} />
      )}
    </div>
  );
}

export default App;
