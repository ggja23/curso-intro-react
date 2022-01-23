import React from "react";
import {AppUI} from "./AppUI";


/*const defaultTodos = [
  {text: 'Cortar cebolla', completed: true},
  {text: 'Tomar el curso de React', completed: false},
  {text: 'task 3', completed: true}
]*/

// custom react hook
function useLocalStorage(itemName, initialValue){

    // estado de carga inicial, error
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);


    // estado de todos , metodo que actualiza el estado
    const [item, setItem] = React.useState(initialValue);

    React.useEffect(() =>{
        setTimeout(()=>{

            try{
                // se llama al localStorage para traernos un elemento
                const localStorageItem = localStorage.getItem(itemName);
                let parsedItem;


                if(!localStorageItem){
                    // si local storage no tiene nada
                    localStorage.setItem(itemName, JSON.stringify(initialValue));
                    parsedItem = initialValue;
                }else{
                    // Si local storage ya tiene data
                    parsedItem = JSON.parse(localStorageItem);
                }

                setItem(parsedItem);
                setLoading(false);
            }catch (error){
                setError(error);
            }

        },1000);
    });




    const saveItem = (newItem) =>{
        try{
            const stringifiedItem = JSON.stringify(newItem);
            localStorage.setItem(itemName, stringifiedItem);
            setItem(newItem);
        }catch (error){
            setError(error);
        }
    };

    return {
        item,
        saveItem,
        loading,
        error,
    };
};


function App() {

    const {
        item: todos,
        saveItem: saveTodos,
        loading,
        error,
    } = useLocalStorage('TODOS_V1',[]);


    // creando un estado para compartirlo con todos los hijos
    const [searchValue, setSearchValue] = React.useState('');

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

/*    console.log('Render (antes)');

    React.useEffect(() =>{
        console.log('use effect');
    },
[] /!* si le pongo un array como segundo argumento el useeffect se ejecutará una vez
      [totalTodos] -> se ejecuta cada vez que detecte cambios en totalTodod*!/
    );

    console.log('after')*/



  return (
      <AppUI
          loading={loading}
          error={error}
          totalTodos={totalTodos}
          completedTodos={completedTodos}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          searchedTodos={searchedTodos}
          completeTodo={completeTodo}
          deleteTodo={deleteTodo}
        />
  );
}

export default App;
