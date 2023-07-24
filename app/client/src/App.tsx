import { useState, useEffect } from 'react'
import './App.css'
import TodoForm from './TodoForm';

function App() {
  const [todos, setTodos] = useState([])
  const [dones, setDones] = useState([])

  const handleCheckboxChange = async (index: number) => {
    const updatedTodos = [...todos];
    updatedTodos[index].done = !updatedTodos[index].done;
    setTodos(updatedTodos)
    const response = await fetch("http://localhost:3000/todos", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTodos),
    })
  };

  const handleClickDelete = async (index: number) => {
    const updatedTodos = [...todos]
    updatedTodos.splice(index, 1)
    setTodos(updatedTodos)
    const response = await fetch("http://localhost:3000/todos", {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTodos),
    })
  }

  useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then(res => res.json())
      .then(data => {
        setTodos(JSON.parse(data[0]));
        setDones(JSON.parse(data[1]))
      })

  }, [todos]);

  return (
    <>
      <div className="app">
        <TodoForm />
        <div className="listContainer">
          <div className='list'>
            <h2>Todo</h2>
            {todos.map((todo: any, index: number) => {
              //ignore this logic - REFRACTOR
              if (todo.done === false) {
                return (
                  <div className="todo" key={index}>
                    <button className="delete-button" onClick={() => handleClickDelete(index)}>
                      <span className="delete-icon"></span>
                    </button>
                    <h1 className="todoTitle">{todo.todo}</h1>
                    <input
                      className="todoCheckbox"
                      type="checkbox"
                      checked={todo.done}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </div>
                );
              }
            })}
            {/* <DoneTodos /> */}
          </div>
          <div className="listDone">
            <h2>Complete</h2>
            {dones.map((todo: any, index: number) => {
              //ignore this logic - REFRACTOR
              if (todo.done === true) {
                return (
                  <div className="done" key={index}>
                    <h1 className="todoDone">{todo.todo}</h1>
                    <input
                      className="todoCheckbox"
                      type="checkbox"
                      checked={todo.done}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
