import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from "reactstrap";


import { Link, useNavigate } from 'react-router-dom';

import EditForm from "../templates/FormNewEmp";



import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import Row from 'react-bootstrap/Row';


import {   Alert } from "reactstrap";

import axios from 'axios';
import { useEffect } from "react";

import InputLabel from '@mui/material/InputLabel';
import { Form, Label, Input } from "reactstrap";




import { NativeSelect } from "@mui/material";



const ModalNewEmp = (props) => {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const navigate = useNavigate();

    const [data, setData] = useState([]);

    const token = localStorage.getItem('token');

    const [image, setImage] = useState(null);
 
    const [form, setForm] = useState({

        rol_esfot: '',
        nombre: '',
        descripcion: '',
        categoria: '',
        direccion: '',
        cobertura: '',
        pagina_web: '',
        telefono: '',
        whatsapp: '',
        facebook: '',
        instagram: '',
        descuento: '',
            
     
    });
   
    

    const handleChange = (e) => {
       setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

         console.log(form);
       
       await axios.post(`https://backend-emprende.herokuapp.com/api/v1/emprendimiento/create`,  { ...form }, 
       { headers: { 'accept': 'application/json', 'authorization': token } }
                
            ).then (response => {
                const res = response.data;
                console.log(res);
                toggle();
               
             
            })
            .catch(error => {
                
                console.log(error);
                console.log(error.response);
                
            });
           
           
        
    };

    

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

    const handleUpload = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', image);

        axios.post(`https://backend-emprende.herokuapp.com/api/v1/emprendimiento/${props.id}/logo`, formData, {
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
        }

        ).then(response => {
            const res = response.data;
            console.log(res);
            toggle();

        })

            .catch(error => {
                console.log(error);
            });
    }
    

   

    
    

        return (
            <div>
<Button className="btn-peticion" onClick={toggle}>Fomulario de petición de ingreso</Button>


<Modal isOpen={modal} toggle={toggle} size="lg">
    <ModalHeader toggle={toggle}>Editar Emprendimiento</ModalHeader>
    <ModalBody className="show-grid">
        
        <Container>
       

            <Form onSubmit={handleSubmit}>

                <Row>

                    <Col xs={6} md={4}>
                        <FormGroup >

                            <InputLabel id="rol_esfot"  className="form-label" >Rol Esfot</InputLabel>

                            <NativeSelect
                            
                                onChange={handleChange}
                                inputProps={{
                                    name: 'rol_esfot',
                                    id: 'rol_esfot',


                                }}
                            >   <option value={""}></option>
                                <option value={"Estudiante"}>Estudiante</option>
                                <option value={"Egresado"}>Egresado</option>
                                <option value={"Docente"}>Docente</option>
                                <option value={"Administrativo"}>Administrativo</option>
                                <option value={"Otro"}>Otro</option>
                            </NativeSelect>
                            
                        </FormGroup>
                    </Col>
                    <Col xs={6} md={4}>
                        <FormGroup>
                            <Label for="nombre">Nombre</Label>
                            <Input
                                type="text"
                                name="nombre"
                                id="nombre"
                                placeholder="Nombre"
                                value={form.nombre ?? ""}
                                onChange={handleChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={6} md={4}>
                        <FormGroup>
                            <Label for="descripcion">Descripcion</Label>
                            <Input

                                type="text"
                                name="descripcion"
                                id="descripcion"
                                placeholder="Descripcion"
                                value={form.descripcion}
                                onChange={handleChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={6} md={4}>
                        <FormGroup>

                        <InputLabel id='categoria'>Categoria</InputLabel>
                            <NativeSelect
                                onChange={handleChange}
                                inputProps={{
                                    name: 'categoria',
                                    id: 'categoria',
                                }}
                            >
                                <option value={""}></option>
                                <option value={"Tecnologia"}>Tecnologia</option>
                                <option value={"Educacion"}>Educacion</option>
                                <option value={"Salud"}>Salud</option>
                                <option value={"Agroindustria"}>Agroindustria</option>
                                <option value={"Turismo"}>Turismo</option>
                                <option value={"Otro"}>Otro</option>
                            </NativeSelect>
                        </FormGroup>
                            
                    </Col>
                    
                    <Col xs={6} md={4}>
                        <FormGroup>
                            <Label for="direccion">Direccion</Label>
                            <Input
                                type="text"
                                name="direccion"
                                id="direccion"
                                placeholder="Direccion"
                                value={form.direccion === null ? "" : form.direccion}
                                onChange={handleChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={6} md={4}>
                        <FormGroup>

                        <InputLabel id="cobertura">Cobertura </InputLabel>
                            <NativeSelect
                                onChange={handleChange}
                                inputProps={{
                                    name: 'cobertura',
                                    id: 'cobertura',
                                }}
                            >
                                <option value={""}></option>
                                <option value={"Quito Centro"}>Quito Centro</option>
                                <option value={"Quito Norte"}>Quito Norte</option>
                                <option value={"Cumbaya - Tumbaco"}>Cumbaya - Tumbaco</option>  
                                <option value={"Valle de los Chillos"}>Valle de los Chillos</option>
                                <option value={"Otro"}>Otro</option>
                               
                            </NativeSelect>
                        </FormGroup>
                    </Col>

                            
                    <Col xs={6} md={4}>
                        <FormGroup>
                            <Label for="pagina_web">Pagina Web</Label>
                            <Input
                                type="text"
                                name="pagina_web"
                                id="pagina_web"
                                placeholder="Pagina Web"
                                value={form.pagina_web === null ? "" : form.pagina_web}
                                onChange={handleChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={6} md={4}>
                        <FormGroup>
                            <Label for="telefono">Telefono</Label>
                            <Input
                                type="text"
                                name="telefono"
                                id="telefono"
                                placeholder="Telefono"
                                value={form.telefono === null ? "" : form.telefono}
                                onChange={handleChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={6} md={4}>
                        <FormGroup>
                            <Label for="whatsapp">Whatsapp</Label>
                            <Input
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                                placeholder="Whatsapp"
                                value={form.whatsapp === null ? "" : form.whatsapp}
                                onChange={handleChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={6} md={4}>
                        <FormGroup>
                            <Label for="facebook">Facebook</Label>
                            <Input

                                type="text"
                                name="facebook"
                                id="facebook"
                                placeholder="Facebook"
                                value={form.facebook === null ? "" : form.facebook}
                                onChange={handleChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={6} md={4}>
                        <FormGroup>
                            <Label for="instagram">Instagram</Label>
                            <Input
                                type="text"
                                name="instagram"
                                id="instagram"
                                placeholder="Instagram"
                                value={form.instagram === null ? "" : form.instagram}
                                onChange={handleChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={6} md={4}>
                        <FormGroup>
                            <Label for="descuento">Descuento</Label>
                            <Input
                                type="text"
                                name="descuento"
                                id="descuento"
                                placeholder="Descuento"
                                value={form.descuento === null ? "" : form.descuento}
                                onChange={handleChange}
                            />
                        </FormGroup>

                    </Col>
                    


                </Row>

              
                    <Button color="primary" onClick={handleSubmit}>Guardar Datos</Button>
                    
<hr />

                    <Row>
                        <Label for="descuento">Cragar imagen</Label>
                        <Col xs={12} md={8}>
                            <FormGroup>

                                <Input
                                    type="file"
                                    name="image"
                                    id="image"
                                    placeholder="Imagen"

                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                                <br />
                                <Button color="primary" onClick={handleUpload}>Enviar imagen</Button>








                            </FormGroup>


                        </Col>
                    </Row>
                
                  
               




                






            </Form>


        </Container>

    </ModalBody>
    <ModalFooter>
        <Button color="secondary" onClick={toggle}>Cerrar</Button>
    </ModalFooter>
</Modal>







            
        </div>
        )




        }

    




export default ModalNewEmp;