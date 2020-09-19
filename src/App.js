import React, { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {
  const [inputText, setInputtext] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [fliteredTodos, setfliteredTodos] = useState([]);

  useEffect(()=>{
    getlocalTodos();
  },[])

  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  const filterHandler = () => {
    switch (status) {
      case "completed":
        setfliteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setfliteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setfliteredTodos(todos);
        break;
    }
  };

  const saveLocalTodos = () => {
      localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getlocalTodos=()=>{
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
    let todolocal =JSON.parse(localStorage.getItem("todos"));
    setTodos(todolocal)
    }
  }

  return (
    <div className="App">
      <header>
        <h1>Ganesh Todo List</h1>
      </header>
      <Form
        inputText={inputText}
        setInputtext={setInputtext}
        todos={todos}
        setTodos={setTodos}
        setStatus={setStatus}
      />
      <TodoList
        setTodos={setTodos}
        todos={todos}
        fliteredTodos={fliteredTodos}
      />
    </div>
  );
}

export default App;
