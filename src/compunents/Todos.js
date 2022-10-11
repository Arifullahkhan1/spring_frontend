import React, { useEffect, useState } from "react";
import AddTodoForm from "./AddTodoForm";
import Todo from "./Todo";

const Todos = (props)=> {
  const [todos, setTodos] = useState([
    { id: 0, title: "Title", discription: "Discription", isDone: "False" },]);
  const {user}=props;
  
  useEffect(() => {
    //async / wait
    const fetchTodos = async () => {
      let responce = await fetch(`${process.env.REACT_APP_BASE_URL}/api/user/${user.id}/todo`,{
   headers: {
    method: 'GET',
    Authorization:`Bearer ${user.token}`
   }

      });
      let todos = await responce.json();
      setTodos(todos);
    };
    fetchTodos(); // call the fetch functiom
  }, []);

  return (
    <div>
      {todos.map((todo) => (
        <Todo user={user} key={todo.id} todo={todo} setTodos={setTodos} />
        
      ))}
     <AddTodoForm  user={user} setTodos={setTodos}/> 
    
    </div>
  );
};

export default Todos;
