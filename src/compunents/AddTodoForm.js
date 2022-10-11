import { useState } from "react";

const AddTodoForm = (props) => {

    const [title, setTitle] = useState("")
    const [ discription, setDiscription] = useState("");
    const { setTodos, user } = props;

    const handleSave = async (event) => {

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

    }

    return (
        <div>
            <h2>Add Todo Form</h2>
            <form>
                <p>Title</p>
                <input
                    type="text"
                    placeholder="Title..."
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />

                <p>discription</p>
                <textarea
                    placeholder="Discription..."
                    onChange={(e) => setDiscription(e.target.value)}
                    value={discription}
                />
                <br /><br />
                <button onClick={handleSave}>Save</button>

            </form>

        </div>
    )
}

export default AddTodoForm;
