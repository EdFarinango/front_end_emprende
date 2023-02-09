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

const ModalVideo = () => {

    const [modal, setModal] = useState(false);
    const [data, setData] = useState([]);
    const token = localStorage.getItem('token');
    const toggle = () => setModal(!modal);
    



    const [form, setForm] = useState({
        nombre: "",
        descripcion: "",
        url: "",
      
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };


    const onSubmit = async (id) => {
    
        await axios.post(
            `https://backend-emprende.herokuapp.com/api/v1/videoconferencia/${id}/update`,
            {
                ...form,
            },
            { headers: { accept: "application/json", authorization: token } }
        );
        alert("El video ha actualizado correctamente").then(() => {

        window.location.reload();

        toggle();
        });
     
    };

  
   


    const getData = async () => {
        try {
          const response = await axios
            .get(`https://backend-emprende.herokuapp.com/api/v1/videoconferencia`, {
              headers: { 'accept': "application/json", 'authorization': token },
            });
            setData(response.data.data.video_conferencias);
          console.log(response.data.data.video_conferencias);
        } catch (error) {
          console.log(error);
        }
      };
    

    const inputs = [
        {
          id: 1,
          name: "nombre",
          type: "text",
          placeholder: "Ingrese el nombre",
          errorMessage: "Debe ingresar un nombre válido!",
          label: "Titulo",
          //pattern: "^[A-Za-z]{3,255}$",
          required: true,
        
        },
        {
          id: 2,
          name: "descripcion",
          type: "text",
          placeholder: "Descripción del video de la comisión Emprende-ESFOT",
          errorMessage: "Debe ingresar un apellido válido!",
          label: "Descripción del video",
          //pattern: "^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$",
          required: true,
      
        },
        {
          id: 3,
          name: "url",
          type: "text",
          placeholder: "Ingrese la dirección del video",
          errorMessage: "Debe ingresar un apellido válido!",
          label: "Dirección del video",
          pattern: "^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$",
          required: true,
      
        }
      ];






    useEffect(() => {
        getData();
    },  [
        form.nombre = data.nombre,
        form.descripcion= data.descripcion,
        form.url= data.url,
    





    ]

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
         
          Crear
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