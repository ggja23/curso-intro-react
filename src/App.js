// import './App.css';
import React from "react";
import {TodoCounter} from "./TodoCounter";
import {TodoSearch} from "./TodoSearch";
import {CreateTodoButton} from "./CreateTodoButton";
import {TodoList} from "./TodoList";
import {TodoItem} from "./TodoItem";


const defaultTodos = [
  {text: 'Cortar cebolla', completed: true},
  {text: 'Tomar el curso de React', completed: false},
  {text: 'task 3', completed: true}
]

function App() {

    const [todos, setTodos] = React.useState(defaultTodos);

    // creando un estado para compartirlo con todos los hijos
    const [searchValue, setSearchValue] = React.useState('');

    const completedTodos = todos.filter(todo => !!todo.completed ).length;
    const totalTodos = todos.length;

    let searchedTodos = [];

    //valida si el usuario no ha escrito nada, o si ha escrito, entonces busca los Todos donde se incluyan las palabras
    if(!searchValue.length >= 1){
        searchedTodos = todos;
    }else{
        searchedTodos = todos.filter(todo => {
            const todoText = todo.text.toLowerCase();
            const searchText = searchValue.toLowerCase();

           return todoText.includes(searchText);
        });
    }


    const completeTodo = (text) => {
      const todoIndex =  todos.findIndex(todo => todo.text === text);
      const newTodos = [...todos];
      newTodos[todoIndex].completed = true;
      setTodos(newTodos)
    };

    const deleteTodo = (text) =>{
        const todoIndex = todos.findIndex(todo => todo.text === text);
        const newTodos = [...todos];
        newTodos.splice(todoIndex, 1);
        setTodos(newTodos);
    };

  return (
      <React.Fragment>
        <TodoCounter
            total={totalTodos}
            completed={completedTodos}
        />

        <TodoSearch
            searchValue={searchValue}
            setSearchValue={setSearchValue}
        />

        <TodoList>
          {searchedTodos.map( todo => (
              <TodoItem
                  key={todo.text}
                  text={todo.text}
                  completed={todo.completed}
                  onComplete={() =>completeTodo(todo.text)}
                  onDelete = {() => deleteTodo(todo.text)}
              />
          ))}
        </TodoList>

        <CreateTodoButton />
      </React.Fragment>
  );
}

export default App;
