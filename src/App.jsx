import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  const [editId, setEditId] = useState(null);
  const [isDark, setIsDark] = useState(false);

  function addTask () {

    if (!input.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: input
    };

    setTodos([...todos, newTodo]);
    setInput("");
  }

  function deleteTask(id) {
    const updatedTodos = todos.filter(
      (todo) => todo.id !== id
    );
    setTodos(updatedTodos);
  }

  function updateTask() {
    const updateTodos = todos.map((todo) => {
      if(todo.id === editId) {
        return{
          ...todo, 
          text: input
        };
      }
      return todo;
    })
    setTodos(updateTodos);
    setEditId(null);
    setInput(""); 
  }

  function editTask(todo) {
    setInput(todo.text);
    setEditId(todo.id);
  }

  function toggleTheme() {
    setIsDark(!isDark);
  }

  return(
    <div className={`taskWrapper ${isDark ? "dark" : "light"}`}>
      <div className="container">
        <div className="header">
          <h2 className="heading">Taskify Dashboard</h2>
          <button onClick={toggleTheme} className={`button ${isDark ? "dark" : "light"}`}>
            {isDark ? "Light" : "Dark"}
          </button>
        </div>
        <div className="headerWrapper">
          <input 
            type="text"
            placeholder="Add your task"
            value={input}
            onChange={(e)=> setInput(e.target.value)}
          />
          {
            editId ? (
              <button onClick={updateTask}>
                Update
              </button>
            ) : (
              <button onClick={addTask}>
                Add
              </button>
            )
          }
        </div>

        <div className="contentWrapper">
          {
            todos.length === 0 && (
              <p>No tasks added yet</p>
            )
          }
          {
            todos.length > 0 && (
              <h3 className="heading">
                Your Tasks:
              </h3>
            )
          }
          {
            todos.map((todo) => {
              return(
                <>
                
                <div className="dataList" key={todo.id}>
                  <div className="taskContent">
                    {todo.text}
                  </div>
                  <button className="button" onClick={() => deleteTask(todo.id)}>Delete</button>
                  <button className="button" onClick={() => editTask(todo)}>Edit</button>
                </div>
                </>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default App;