
import React from "react";

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

        },2000);
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

export {useLocalStorage};