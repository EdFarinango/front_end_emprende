import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import InputLabel from '@mui/material/InputLabel';


import MenuItem from '@mui/material/MenuItem';

import Select from '@mui/material/Select';

import FormControl from '@mui/material/FormControl';







const EditForm  = (props) => {

    const [image , setImage] = useState(props.value);

    const [open, setOpen] = React.useState(false);

    const token = localStorage.getItem('token');

    const [form, setForm] = useState({
      
        rol_esfot : '',
        nombre : '',
        descripcion : '',
        categoria : '',
        direccion : '',
        cobertura : '',
        pagina_web : '',
        telefono : '',
        whatsapp : '',
        facebook : '',
        instagram : '',
        descuento : '',
        
      
        

    });

   
    // const formData = new FormData();
    // formData.append('rol_esfot', form.rol_esfot);
    // formData.append('nombre', form.nombre);
    // formData.append('descripcion', form.descripcion);
    // formData.append('categoria', form.categoria);
    // formData.append('direccion', form.direccion);

    // formData.append('cobertura', form.cobertura);
    // formData.append('pagina_web', form.pagina_web);
    // formData.append('telefono', form.telefono);
    // formData.append('whatsapp', form.whatsapp);
    // formData.append('facebook', form.facebook);
    // formData.append('instagram', form.instagram);
    // formData.append('descuento', form.descuento);
    // formData.append('image', image);

    
    // const onFileChange = (e) => {
      
    //     setImage(e.target.files[0]);
    //     formData.append('image', e.target.files[0]);

    //     setForm({
    //         ...form,
    //         [e.target.name]: e.target.files[0]
    //     });

        
         


  
    //     console.log(form);

    // }



  

    const handleChange = (e) => {


        
        

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        
        try {
           
                await axios.post(`https://backend-emprende.herokuapp.com/api/v1/emprendimiento/create`, form,  {
                    headers: { Authorization: `Bearer ${token}` },
                });
               
            } catch (error) {
                console.log(form);
                console.log(error);
            }
        
   
    }

  
  


  



   






   
    



    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>

<InputLabel id="rol_esfot">Rol Esfot</InputLabel>
            <Select
         
                labelId="rol_esfot"
                id="rol_esfot"
                placeholder="Rol Esfot"
                value={form.rol_esfot}
                label="Rol Esfot"
                name="rol_esfot"
                onChange={handleChange}
            >
                
                 <MenuItem value="">
            <em>-</em>
            </MenuItem>
                <MenuItem value={"Estudiante"}>Estudiante</MenuItem>
                <MenuItem value={"Egresado"}>Egresado</MenuItem>
                <MenuItem value={"Docente"}>Docente</MenuItem>
                <MenuItem value={"Administrativo"}>Administrativo</MenuItem>
                <MenuItem value={"Otro"}>Otro</MenuItem>
            </Select>

            </FormGroup>


             
            

            
            <FormGroup>
                <Label for="nombre">Nombre</Label>
                <Input
                    type="text"
                    name="nombre"
                    id="nombre"
                    placeholder="Nombre"
                    value={form.nombre}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label for="descripcion">Descripción</Label>
                <Input
                    type="text"
                    name="descripcion"
                    id="descripcion"
                    placeholder="Descripción"
                    value={form.descripcion}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
            <InputLabel id="categoria">Categoría</InputLabel>
            <Select
                labelId="categoria"
                id="categoria"
                placeholder="Categoría"
                value={form.categoria}
                label="Categoría"
                name="categoria"
                onChange={handleChange}
            >
                    <MenuItem value="">
            <em>-</em>
            </MenuItem>
                
                <MenuItem value={"Comida"}>Comida</MenuItem>
                <MenuItem value={"Hogar y limpieza"}>Hogar y limpieza</MenuItem>
                <MenuItem value={"Salud"}>Salud</MenuItem>
                <MenuItem value={"Tecnologia"}>Tecnología"</MenuItem>
                <MenuItem value={"Textil"}>Textil</MenuItem>
                <MenuItem value={"Otro"}>Otro</MenuItem>
            </Select>

            </FormGroup>
            <FormGroup>
                <Label for="direccion">Dirección</Label>
                <Input
                    type="text"
                    name="direccion"
                    id="direccion"
                    placeholder="Dirección"
                    value={form.direccion}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <InputLabel id="cobertura">Zona de cobertura</InputLabel>
            <Select
                labelId="cobertura"
                id="cobertura"
                placeholder="Cobertura"
                value={form.cobertura}
                label="Cobertura"
                name="cobertura"
                onChange={handleChange}
            >
                    <MenuItem value="">
            <em>-</em>
            </MenuItem>
                <MenuItem value={"Quito Sur"}>Quito Sur</MenuItem>
                <MenuItem value={"Quito Centro"}>Quito Centro</MenuItem>
                <MenuItem value={"Quito Norte"}>Quito Norte</MenuItem>
                <MenuItem value={"Cumbaya - Tumbaco"}>Cumbayá - Tumbaco</MenuItem>
                <MenuItem value={"Valle de los Chillos"}>Valle de los Chillos</MenuItem>
                <MenuItem value={"Otro"}>Otro</MenuItem>

            </Select>
            </FormGroup>
            <FormGroup>
                <Label for="pagina_web">Página Web</Label>
                <Input
                    type="text"
                    name="pagina_web"
                    id="pagina_web"
                    placeholder="Página Web"
                    value={form.pagina_web}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label for="telefono">Teléfono</Label>
                <Input
                    type="text"
                    name="telefono"
                    id="telefono"
                    placeholder="Teléfono"
                    value={form.telefono}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label for="whatsapp">Whatsapp</Label>
                <Input
                    type="text"
                    name="whatsapp"
                    id="whatsapp"
                    placeholder="Whatsapp"
                    value={form.whatsapp}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label for="facebook">Facebook</Label>
                <Input
                    type="text"
                    name="facebook"
                    id="facebook"
                    placeholder="Facebook"
                    value={form.facebook}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label for="instagram">Instagram</Label>
                <Input
                    type="text"
                    name="instagram"
                    id="instagram"
                    placeholder="Instagram"
                    value={form.instagram}
                    onChange={handleChange}
                />
            </FormGroup>
            
          
            <FormGroup>
                <Label for="descuento">Descuento</Label>
                <Input
                    type="text"
                    name="descuento"
                    id="descuento"
                    placeholder="Descuento"
                    value={form.descuento}
                    onChange={handleChange}
                />
            </FormGroup>
           
            
        
                
            <Button>Submit</Button>
        </Form>
    );
}

export default EditForm;



   