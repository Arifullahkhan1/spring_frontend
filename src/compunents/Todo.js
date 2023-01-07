import { useRef, useState } from "react";
// imports MatrialUI compunents
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  disply:'none'
};



const Todo = (props) => {
  const { todo, setTodos, user } = props;
  const [title, setTitle]= useState(todo.title);
  const [discription, setDiscription]= useState(todo.discription);
  //matrialUl conts *****************
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 
// handle Delet starts
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

  
  //const ref = useRef(null);
  const refClose = useRef(null);

  //handle update

  const hadleUpdate = async (id) => {

    refClose.current.click();
   
      

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
    
    <div >
       <h4 className="feedback-form">{todo.title}</h4>
       
       <div className="discription_margin">
      <span className="discription">{todo.discription}
      <span>
        
        Done:{" "}
        <input
          type="checkbox"
          checked={todo.isDone}
          onChange={() => console.log("Some action shold be done ")}
        />
      </span>
      </span>
      </div>
      
      {/* Mattarial Ui Mpdel*/}
     
      <Button   onClick={handleOpen}>Edit</Button>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Todo
          </Typography>
          <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="etitle"
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        id="ediscription"
        label="Discription"
        value={discription}
        onChange={(e) => setDiscription(e.target.value)}
      />
    </Box>
        
        <br></br>
        <Button    onClick={()=>hadleUpdate(todo.id)} >update</Button>
        <Button ref={refClose} onClick={handleClose}>close</Button>
        </Box>
      </Modal>
     {/* <button style={{marginRight:5}} onClick={() => handleModel(todo)}>Edit</button> */}
      <Button   color="error"
       onClick={() => handleDelet(todo.id)}>Delet</Button >
      
    </div>
   
  );
};

export default Todo;
