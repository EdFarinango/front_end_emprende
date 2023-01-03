import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";


import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from "react";
import FormNewEmp from "../templates/FormNewEmp";


const ModalNewEmp = ({emprendimientos}) => {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [data, setData] = useState([]);
    const token = localStorage.getItem('token');

    const navigate = useNavigate();
    
    

        return (
            <div>
            <Button color="danger" onClick={toggle}>
             Registrar
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Registrar nuevo emprendimiento</ModalHeader>
                <ModalBody>
                <FormNewEmp 
              toggle={toggle} 

                />
                </ModalBody>
            </Modal>
            </div>

        )




        }

    




export default ModalNewEmp;