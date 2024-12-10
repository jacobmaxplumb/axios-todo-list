import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    const { data: todoItems } = await axios.get("http://localhost:9000/todos");
    setTodos(todoItems);
  };

  const addTodo = async () => {
    const { data: todoItem } = await axios.post("http://localhost:9000/todos", {
      text: text,
      completed: false,
    });
    setTodos([...todos, todoItem]);
    setText("");
  };

  const markTodoAsCompleted = async (todo) => {
    await axios.put(`http://localhost:9000/todos/${todo.id}`, {
      ...todo,
      completed: true,
    });
    getTodos();
  };

  const deleteTodoItem = async (id) => {
    await axios.delete(`http://localhost:9000/todos/${id}`);
    getTodos();
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li
            onClick={() => todo.completed ? deleteTodoItem(todo.id) : markTodoAsCompleted(todo)}
            style={{ textDecoration: todo.completed ? "line-through" : "" }}
            key={todo.id}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
