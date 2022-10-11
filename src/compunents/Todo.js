import { useRef, useState } from "react";


const Todo = (props) => {
  const { todo, setTodos, user,setTodo } = props;
  const [title, setTitle]= useState(todo.title);
  const [discription, setDiscription]= useState(todo.discription);
 // const[etodo,setEtodo]= useState(todo.etodo);

  const handleDelet = async (id) => {
    await fetch(`${process.env.REACT_APP_BASE_URL}/api/todo/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }); // directed to server call

    let responce = await fetch(`${process.env.REACT_APP_BASE_URL}/api/user/${user.id}/todo`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    let todos = await responce.json();
    setTodos(todos);
  };
  const handleModel = (todo) => {
    ref.current.click();
   //setEtodo(etodo.title,etodo.discription)
  
   };
  const ref = useRef(null);
  const refClose = useRef(null);

  //handle update

  const hadleUpdate = async (id) => {
    refClose.current.click();
   // event.preventDefault();
      console.log(id);

    await fetch(`${process.env.REACT_APP_BASE_URL}/api/todo/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({ 
            title: title,
            discription: discription,
            userId: user.id
        })
    })

    let response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/user/${user.id}/todo`, {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    })
    let todos = await response.json()

    setTodos(todos)
    
}

  return (
    <div>
      <h2>{todo.title}</h2>
      <p>{todo.discription}</p>
      <p>
        {" "}
        Done:{" "}
        <input
          type="checkbox"
          checked={todo.isDone}
          onChange={() => console.log("Some action shold be done ")}
        />
      </p>

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none "
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Todo
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* form *******************************/}
              
                <p>Title</p>
                <input
                  type="text"
                  id="etitle"
                  name="etitle"
                  placeholder="Title..."
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />

                <p>discription</p>
                <textarea
                id="ediscription"
                name="ediscription"
                  placeholder="Discription..."
                  onChange={(e) => setDiscription(e.target.value)}
                  value={discription}
                />
                <br />
                <br />
              
            </div>
            <div className="modal-footer">
              <button
              ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button   onClick={()=>hadleUpdate(todo.id)}  type="button" className="btn btn-primary">
                Update Todo
              </button>
            </div>
          </div>
        </div>
      </div>
      <button onClick={() => handleModel(todo)}>Edit</button>
      <button onClick={() => handleDelet(todo.id)}>Delet</button>
    </div>
  );
};

export default Todo;
