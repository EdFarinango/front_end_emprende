import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import EditForm from "../templates/FormNewAd";

import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from "react";


const ModalForm = (props) => {

   

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        state : '1',
        role: 'admin'
    });

    const [admin, setAdmin] = useState([]);


    const token = localStorage.getItem('token');

   
   






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
                        admins={admin}
                    />
                </ModalBody>
            </Modal>
        </div>
    );



}

export default ModalForm;