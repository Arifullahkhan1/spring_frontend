import { useState,useRef } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

const AddTodoForm = (props) => {
    

    const [title, setTitle] = useState("")
    const [ discription, setDiscription] = useState("");
    const { setTodos, user } = props;
    const textInput = useRef(null);
   

    const handleSave = async (event) => {
        textInput.current.value = ""
        event.preventDefault()
        
        await fetch(`${process.env.REACT_APP_BASE_URL}/api/todo`, {
            method: 'POST',
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
        setTitle("")
        setDiscription("")
        

    }

    return (
        <div>
            <h2>Add Todo </h2>
            <FormControl>
                
                   <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
       inputRef={textInput}
       type="text"
        id="etitle"
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
       inputRef={textInput}
       type="text"
        id="ediscription"
        label="Discription"
        value={discription}
        multiline
        rows={5}
        onChange={(e) => setDiscription(e.target.value)}
      />
       </Box>
            
                
                <Button  sx={{pr:15} }  onClick={handleSave}>Save</Button>
               
               
                
                
              </FormControl>
             
              
        </div>
    )
}

export default AddTodoForm;
