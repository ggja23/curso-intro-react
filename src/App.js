// import './App.css';
import React from "react";

const todos = [
  {text: 'Cortar cebolla', completed: false},
  {text: 'Tomar el curso de React', completed: false},
]

function App() {
  return (
      <React.Fragment>
        {/*<TodoCounter />*/}
        <h2> Has completado 2 de 3 TODOs</h2>

        {/*<TodoSearch />*/}
        <input placeholder="placeholder"/>

{/*        <TodoList>
          {todos.map(t =>  todos(
              <TodoItem />
          ))}
        </TodoList>*/}

        {/*<CreateTodoButton />*/}
        <button>+</button>
      </React.Fragment>
  );
}

export default App;
