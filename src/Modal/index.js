import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css'
import {CreateTodoButton} from "../CreateTodoButton";
import {TodoContext} from "../TodoContext";

function Modal({children}){

    return ReactDOM.createPortal(
        <div className='ModalBackground'>
            {children}
        </div>,
        document.getElementById('modal')
    );
}

export {Modal};