import React from "react";
import {TodoCounter} from "../TodoCounter";
import {useLocalStorage} from "./useLocalStorage";

const TodoContext = React.createContext();

function TodoProvider(props){

    const {
        item: todos,
        saveItem: saveTodos,
        loading,
        error,
    } = useLocalStorage('TODOS_V1',[]);


    // creando un estado para compartirlo con todos los hijos
    const [searchValue, setSearchValue] = React.useState('');

    const [openModal, setOpenModal] = React.useState(false);

    //contar los todos completados
    const completedTodos = todos.filter(todo => !!todo.completed ).length;
    const totalTodos = todos.length;

    let searchedTodos = [];

    //valida si el usuario no ha escrito nada, o si ha escrito, entonces busca los Todos donde se incluyan las palabras
    if(!searchValue.length >= 1){
        searchedTodos = todos;
    }else{
        searchedTodos = todos.filter(todo => {
            const todoText = todo.text.toLowerCase();       // convierte la entrada del usuario a minusculas para emparejar con lo todos
            const searchText = searchValue.toLowerCase();   // convierte los texto de todos a minusculas para emparejar con la entrada del usuario

            return todoText.includes(searchText);            // retorna los que cumplan la condición
        });
    }




    const completeTodo = (text) => {
        const todoIndex =  todos.findIndex(todo => todo.text === text);
        const newTodos = [...todos];
        newTodos[todoIndex].completed = true;
        saveTodos(newTodos);
    };

    const deleteTodo = (text) =>{
        const todoIndex = todos.findIndex(todo => todo.text === text);
        const newTodos = [...todos];
        newTodos.splice(todoIndex, 1);
        saveTodos(newTodos);
    };

    const addTodo = (text) => {
        const newTodos = [...todos];
        newTodos.push({
            completed: false,
            text,
        });
        saveTodos(newTodos);
    };

    return (
        // las propiedades que querramos compartir en nuestro
        // contexto deben estar dentro de la etiqueta, así como value
       // se usa doble llave {{ }} porque significa que es un OBJETO
        <TodoContext.Provider value={{
            loading,
            error,
            totalTodos,
            completedTodos,
            searchValue,
            setSearchValue,
            searchedTodos,
            completeTodo,
            deleteTodo,
            addTodo,
            openModal,
            setOpenModal,
        }}>
            {props.children}
        </TodoContext.Provider>
    );
}

export {TodoContext, TodoProvider};