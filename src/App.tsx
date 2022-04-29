import React, { useEffect, useState } from 'react';
import './App.css';
const { CreateTodoRequest, CreateTodoResponse, GetTodoRequest, GetTodoResponse, Todo } = require('./todo_pb.js');
const { TodoTrackerClient } = require('./TodoServiceClientPb.ts');

function App() {
  const client = new TodoTrackerClient('http://' + window.location.hostname + ':8080', null, null);
  const [todos, setTodos] = useState<typeof Todo[]>([]);

  useEffect(() => {
    const createTodoRequest = new CreateTodoRequest();
    createTodoRequest.setTitle("Make a React app that uses gRPC-Web");
    client.createTodo(createTodoRequest, {})
      .then((res: typeof CreateTodoResponse) => {
        const getTodoRequest = new GetTodoRequest();
        getTodoRequest.setTodoId(res.getTodoId())
        client.getTodo(getTodoRequest, {})
          .then((res: typeof GetTodoResponse) => {
            const newTodos: typeof Todo[] = [...todos];
            newTodos.push(res.getTodo());
            setTodos(newTodos);
          })
      })
  }, []);

  return (
    <div className="App">
      <h1>Todo List</h1>
      <input></input>
      <button>Add Todo</button>
      <ul>
        {todos.map((todo) => { return <li key="todo">{todo.getTitle()}</li> })}
      </ul>
    </div>
  );
}

export default App;
