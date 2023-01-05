import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import EditForm from "../templates/FormEditSu";

import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from "react";


const ModalForm = (props) => {



    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [admin, setAdmin] = useState([]);
    const getAdmin = async () => {
        try {
            const response = await axios.get(
                `https://backend-emprende.herokuapp.com/api/v1/superadmin`,
                { headers: { 'accept': 'application/json', 'authorization': token } }
            );
           
            setAdmin(response.data.data.users)
        } catch (error) {
            console.log(error);
        }
    }




    useEffect(() => {
        getAdmin();
    }
        , [])
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