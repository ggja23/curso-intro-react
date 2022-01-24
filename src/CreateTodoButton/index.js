import React from "react";
import './CreateTodoButton.css'
import {TodoContext} from "../TodoContext";

function CreateTodoButton(){

  const { openModal, setOpenModal } = React.useContext(TodoContext);

  const onClickButton = () => {
//SOLUCIÓN 1
/*    if (props.openModal === false){
      props.setOpenModal(true);
    }else{
      props.setOpenModal(false);
    }*/

    //SOLUCIÓN 2
    setOpenModal(!openModal);
  };

  return(
      <button
          className="CreateTodoButton"
          onClick={onClickButton}
      >+</button>
  );
};

export {CreateTodoButton}