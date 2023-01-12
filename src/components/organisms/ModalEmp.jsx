import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";


import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from "react";
import EditFormEmp from "../templates/FormEditEmp";


const ModalEmp = ({ emprendimientos }) => {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [data, setData] = useState([]);
    const token = localStorage.getItem('token');

    const navigate = useNavigate();

    const getData = async () => {
        try {
            const response = await axios.get(
                `https://backend-emprende.herokuapp.com/api/v1/emprendimiento`,
                { headers: { 'accept': 'application/json', 'authorization': token } }
            );

            setData(response.data.data.emprendimientos)

        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
            <Button backgroundcolor="grey" onClick={toggle}>
                Editar

            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Editar Emprendimiento</ModalHeader>
                <ModalBody>
                    <EditFormEmp emprendimientos={emprendimientos} />
                </ModalBody>
                
            
            </Modal>
        </div>
    );




}

export default ModalEmp;