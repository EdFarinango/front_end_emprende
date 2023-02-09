import React from 'react';
import '../scss/get-started.scss'
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import ModalForm from '../components/organisms/ModalPeticionEmp';



const GetStarted = (props) => {

    return (



        <ModalForm
            buttonLabel="Fomulario de Peticion"	
            className="modal-lg animate-left-3 me-3 ms-2"
            updateState={props.updateState}
            item={props.item}
        />
  




    );
}

export default GetStarted;