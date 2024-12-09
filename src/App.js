import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);

  const getTodos = () => {
    axios.get('http://localhost:9000/todos').then((response) => {
      setTodos(response.data);
    })
  }

  useEffect(() => {
    getTodos();
  }, [])

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)}/>
    </div>
  );
}

export default App;
