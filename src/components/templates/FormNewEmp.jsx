import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";


import InputLabel from '@mui/material/InputLabel';


import MenuItem from '@mui/material/MenuItem';

import Select from '@mui/material/Select';



const EditForm = (props) => {

    const [image, setImage] = useState(null);

    const [data, setData] = useState(null);

    const [open, setOpen] = React.useState(false);

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const token = localStorage.getItem('token');



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

        //console.log(form);

        await axios.post(`https://backend-emprende.herokuapp.com/api/v1/emprendimiento/create`, { ...form },
            { headers: { 'accept': 'application/json', 'authorization': token } }

        ).then(response => {
            const res = response.data;
            //console.log(res);
            toggle();


        })
            .catch(error => {

                //console.log(error);
                //console.log(error.response);

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
            //console.log(error);
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
            //console.log(res);
            toggle();

        })

            .catch(error => {
                //console.log(error);
            });
    }





    return (
        <>

            {/* <div >
<input type="file" name = "files"  onChange={(e)=>setImage(e.target.files[0])} />

<br/>
<br/>
<button className="btn btn-primary" onClick={handleSubmitAv}>Enviar</button>


</div> */}
            <form className="row g-3 needs-validation" noValidate>
                <div className="col-md-4">
                    <label htmlFor="validationCustom01" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="validationCustom01" defaultValue="Mark" required />
                    <div className="valid-feedback">
                        ¡Se ve bien!
                    </div>
                </div>
                <div className="col-md-4">
                    <label htmlFor="validationCustom02" className="form-label">Apellido</label>
                    <input type="text" className="form-control" id="validationCustom02" defaultValue="Otto" required />
                    <div className="valid-feedback">
                        ¡Se ve bien!
                    </div>
                </div>
                <div className="col-md-4">
                    <label htmlFor="validationCustomUsername" className="form-label">Nombre de usuario</label>
                    <div className="input-group has-validation">
                        <span className="input-group-text" id="inputGroupPrepend">@</span>
                        <input type="text" className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required />
                        <div className="invalid-feedback">
                            Por favor, elije un nombre de usuario.
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <label htmlFor="validationCustom03" className="form-label">Ciudad</label>
                    <input type="text" className="form-control" id="validationCustom03" required />
                    <div className="invalid-feedback">
                        Proporciona una ciudad válida.
                    </div>
                </div>
                <div className="col-md-3">
                    <label htmlFor="validationCustom04" className="form-label">Estado</label>
                    <select className="form-select" id="validationCustom04" required>
                        <option selected disabled value>Elige...</option>
                        <option>...</option>
                    </select>
                    <div className="invalid-feedback">
                        Selecciona un estado válido.
                    </div>
                </div>
                <div className="col-md-3">
                    <label htmlFor="validationCustom05" className="form-label">Código postal</label>
                    <input type="text" className="form-control" id="validationCustom05" required />
                    <div className="invalid-feedback">
                        Proporciona un código postal válido.
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" defaultValue id="invalidCheck" required />
                        <label className="form-check-label" htmlFor="invalidCheck">
                            Acepta los términos y condiciones
                        </label>
                        <div className="invalid-feedback">
                            Debe estar de acuerdo antes de enviar.
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <button className="btn btn-primary" type="submit">Enviar formulario</button>
                </div>
            </form>


            <Form onSubmit={handleSubmit} class="row g-3 needs-validation" novalidate>
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
                    <Label for="descripcion" class="form-label">Descripción</Label>
                    <Input class="form-control"
                        requiere
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


                <Label for="image">Imagen</Label>
                <Input
                    type="file"
                    name="image"
                    id="image"
                    placeholder="Imagen"

                    onChange={(e) => setImage(e.target.files[0])}

                />
                <Button color="primary" onClick={handleUpload}>Actualizar</Button>





                <Button>Submit</Button>
            </Form>










        </>
    );
}

export default EditForm;



