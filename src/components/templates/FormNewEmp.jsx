import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";





const FormNewEmp = ({emprendimientos}) => {

    
    const token = localStorage.getItem('token');
    const [error , setError] = useState(false);
    const navigate = useNavigate();

    const [form, setForm] = useState(
        {
          id: "",
          rol_esfot:  "",
          nombre: "",
          descripcion: "",
          categoria: "",
          direccion: "",
          cobertura:  "",
          pagina_web: "",
          telefono: "",
          whatsapp: "",
          facebook:  "",
          instagram: "",
          estado:  "",
      



    
}
    );

    const handleChange = (e) => {
      setForm({
          ...form,
          [e.target.name]: e.target.value
      });
  }

    const FormNew  = async (e) => {
        e.preventDefault();

        

        try {

           
                await axios.post(
                    `https://backend-tesis.herokuapp.com/api/emprendimiento/create`,
                    { ...form }, { headers: { 'accept': 'application / json', 'authorization': token } }
                );
                navigate("/users/emprendimientos");
                console.log("success");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Form onSubmit={FormNew}>
            <FormGroup>
                <Label for="rol_esfot">Rol Esfot</Label>
                <Input
                    type="text"
                    name="rol_esfot"
                    id="rol_esfot"
                    placeholder="Rol Esfot"
             
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
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label for="descripcion">Descripcion</Label>
                <Input
                    type="text"
                    name="descripcion"
                    id="descripcion"
                    placeholder="Descripcion"
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label for="categoria">Categoria</Label>
                <Input
                    type="text"
                    name="categoria"
                    id="categoria"
                    placeholder="Categoria"
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label for="direccion">Direccion</Label>
                <Input
                    type="text"
                    name="direccion"
                    id="direccion"
                    placeholder="Direccion"
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
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label for="pagina_web">Pagina Web</Label>
                <Input
                    type="text"
                    name="pagina_web"
                    id="pagina_web"
                    placeholder="Pagina Web"
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label for="telefono">Telefono</Label>
                <Input
                    type="text"
                    name="telefono"
                    id="telefono"
                    placeholder="Telefono"
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
                    onChange={handleChange}
                />
            </FormGroup>



            
            
            
            <Button>Enviar</Button>

        </Form>
    );
}


export default FormNewEmp;
