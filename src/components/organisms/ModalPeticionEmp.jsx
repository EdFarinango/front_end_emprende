import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";


import { Link, useNavigate } from 'react-router-dom';

import EditForm from "../templates/FormPeticionEmp";


const ModalNewEmp = (props) => {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const navigate = useNavigate();
 

    
    

        return (
            <div>

            <Button color="success" onClick={toggle}>
                {props.buttonLabel}
            </Button>
            <Modal isOpen={modal}
                toggle={toggle}
                className={props.className}
                backdrop={'static'}
                keyboard={false}
            >
                <ModalHeader toggle={toggle}>{props.buttonLabel}</ModalHeader>
                <ModalBody>
                    <EditForm


                        updateState={props.updateState}
                        toggle={toggle}
                        item={props.item}
                
                    />
                </ModalBody>
            </Modal>
        </div>
        )




        }

    




export default ModalNewEmp;