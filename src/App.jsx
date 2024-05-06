import './App.css'
import {TodoProvidor} from "./contexts/index.js";
import {useEffect, useState} from "react";
import TodoForm from "./components/TodoForm.jsx";

function App() {

  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{id:Date.now(), ...todo}, ...prev]);
  }

  const updateTodo = (id, todo) => {
    setTodos( (prev) => prev.map( (prevTodo) => (
        prevTodo.id === id ? todo : prevTodo
    ) ) )
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id != id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) => {
      prev.map((prevTodo) => {
        prevTodo.id === id ? {...prevTodo, completed : !prevTodo.completed} : prevTodo
      })
    })
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if(todos && todos.length > 0){
      setTodos(todos)
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos]);


  return (
    <TodoProvidor value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
      <TodoForm />
    </TodoProvidor>
  )
}

export default App
