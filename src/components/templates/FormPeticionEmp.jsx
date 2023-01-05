import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";






const EditForm = (props) => {

  


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
        segundo_estado : '1',
      
        

    });



    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        if (Object.values(form).includes("")) {
            console.log(e);
            return;
        }
        try {
           
                await axios.post(`https://backend-emprende.herokuapp.com/api/v1/emprendimiento/create`, form, {
                    headers: { Authorization: `Bearer ${token}` },
                });
              
               
            } catch (error) {
                console.log(error);
            }
        
      props.toogle();
    }

    
    return (
        <Form onSubmit={handleSubmit}>
             
       

            <FormGroup>
                <Label for="rol_esfot">Rol Esfot</Label>
                <Input
                    type="text"
                    name="rol_esfot"
                    id="rol_esfot"
                    placeholder="Rol Esfot"
                    value={form.rol_esfot}
                    onChange={handleChange}
                />
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
                <Label for="categoria">Categoría</Label>
                <Input
                    type="text"
                    name="categoria"
                    id="categoria"
                    placeholder="Categoría"
                    value={form.categoria}
                    onChange={handleChange}
                />
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
                <Label for="cobertura">Cobertura</Label>
                <Input
                    type="text"
                    name="cobertura"
                    id="cobertura"
                    placeholder="Cobertura"
                    value={form.cobertura}
                    onChange={handleChange}
                />
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
            <FormGroup>
                <Label for="segundo_estado">Segundo Estado</Label>
                <Input
                    type="text"
                    name="segundo_estado"
                    id="segundo_estado"
                    placeholder="Segundo Estado"
                    value={form.segundo_estado }
                    onChange={handleChange}
                />
            </FormGroup>
            
            <Button>Submit</Button>
        </Form>
    );
}

export default EditForm;



   