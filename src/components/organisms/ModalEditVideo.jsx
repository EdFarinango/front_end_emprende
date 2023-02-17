import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from "reactstrap";

import axios from 'axios';
import { useEffect } from "react";
import InputLabel from '@mui/material/InputLabel';
import { Form, FormGroup, Label, Input } from "reactstrap";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { NativeSelect } from "@mui/material";
import './styles.css';
import alert from "sweetalert";
import FormInput from "../../components/templates/Inputs";

const ModalVideo = ({ video }) => {

    const [modal, setModal] = useState(false);
    const token = localStorage.getItem("token");
    const [form, setForm] = useState({
        nombre: "",
        descripcion: "",
        url: ""

    });

    const toggle = () => setModal(!modal);

    const inputs = [
        {
            id: 1,
            name: "nombre",
            type: "text",
            label: "Titulo",
            placeholder: "Titulo del video",
        },
        {
            id: 2,
            name: "descripcion",
            type: "text",
            label: "Descripcion",
            placeholder: "Descripcion del video",
        },
        {
            id: 3,
            name: "url",
            type: "text",
            label: "Url",
            placeholder: "Url del video",
        },


    ];

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        await axios.post(
            `https://backend-emprende.herokuapp.com/api/v1/videoconferencia/${video.id}/update`,
            {
                ...form,
            },
            { headers: { accept: "application/json", authorization: token } }
        );
        alert("El video ha actualizado correctamente").then(() => {




        });

    };


    useEffect(() => {
        setForm({
            nombre: video.nombre,
            descripcion: video.descripcion,
            url: video.url,

        });
    }, [video]







    );

    return (
        <div>

            <Button className='btnedit' onClick={toggle} >Editar</Button>


            <Modal isOpen={modal} toggle={toggle} size="lg">
                <ModalHeader toggle={toggle}>Editar video del repositorio</ModalHeader>
                <ModalBody className="show-grid">
                    <Container>

                        <Form onSubmit={onSubmit} className="form-control">
                            <FormGroup>
                                {inputs.map((input) => (
                                    <FormInput
                                        key={input.id}
                                        {...input}
                                        value={form[input.name]}
                                        onChange={handleChange}
                                    />
                                ))}
                            </FormGroup>

                            <Button color="info" type="submit">

                                Enviar
                            </Button>

                        </Form>

                    </Container>

                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Cerrar</Button>
                </ModalFooter>
            </Modal>








        </div>
    );




}

export default ModalVideo;





