import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaNetworkWired } from 'react-icons/fa';

import axios from 'axios';





import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';


import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import ModalPswd from './ModalPswd';
import alert from 'sweetalert'


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link href="#" textDecoration="none">
                2022 - Emprende
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
const theme = createTheme();





export const Login = () => {


    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    //const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const onLogin = async (e) => {
        e.preventDefault();
        setErrors(validationsForm(form));


        if (Object.keys(errors).length === 0) {
            //console.log("No hay errores");
            setLoading(true);
            //console.log(form);
            try {
                await axios.post('https://backend-emprende.herokuapp.com/api/v1/login',
                    { ...form }).then((response) => {
                        const { access_token, token_type, user } = response.data.data
                        // console.warn(access_token, token_type, user);
                        // console.log(response);
                        setLoading(false);
                        setResponse(true);
                        setTimeout(() => {
                            setResponse(false)
                        }, 2500);
                        login(user, `${token_type} ${access_token}`);
                        // eslint-disable-next-line no-lone-blocks
                        {
                            alert && alert({
                                title: ["Bienvenido"],
                                text: "Ingreso exitoso",
                                iconColor: "success",
                                button: false,
                                timer: "2000",
                            })



                            navigate('/administracion');
                        }
                    }).catch((error) => {
                        //console.log(error);
                        setLoading(false);
                        setResponse(false);
                    });

            } catch (error) {
                setLoading(false);
                setResponse(false);
                if (!FaNetworkWired) {
                    //console.log(error);
                } else {
                    //console.log(error.response.data.message, error);

                }
            }
        } else {
            if (errors.email) {
                alert({
                    title: "Error",
                    text: "El email es requerido",
                    icon: "error",
                    button: false,
                    timer: "1500",
                })
            } else
                if (errors.password) {
                    alert({
                        title: "Error",
                        text: "Ingrese una contraseña valida",
                        icon: "error",
                        button: false,
                        timer: "1500",
                    })
                }

        }
    };


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };


    const handleBlur = (e) => {

        handleChange(e);
        setErrors(validationsForm(form));


    }







    const validationsForm = (form) => {
        let errors = {};
        //let regexName = /^[a-zA-ZÀ-ÿ\s]{1,40}$/; // Letras y espacios, pueden llevar acentos.
        let regexEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        let regexPassword = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/; // 4 a 12 digitos.
        //let regexPhone = /^\d{7,10}$/; // 7 a 14 numeros.


        if (!form.email) {
            errors.email = "Por favor ingrese un correo electrónico";
        } else if (!regexEmail.test(form.email)) {
            errors.email = "El correo electrónico no es válido";

        } else
            if (!form.password) {
                errors.password = "Por favor ingrese una contraseña";
            }
            else if (!regexPassword.test(form.password)) {
                errors.password = "La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, una minúscula, una mayúscula y un simbolo";
            }



        return errors;






    };



    return (

        <ThemeProvider theme={theme}>

            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Typography component="h1" variant="h5">
                        Iniciar Sesión
                    </Typography>
                    <Box component="form" noValidate onSubmit={onLogin} sx={{ mt: 1 }}>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="email"
                            label="Correo electrónico"
                            type="email"
                            id="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={form.email}
                            autoComplete="email"



                        />

                        {errors.email && <span className='error'>{errors.email}</span >}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password"

                            onChange={handleChange}
                            onBlur={handleBlur}

                            value={form.password}
                            autoComplete="current-password"


                        />






                        <Grid container>




                            {/* Desactivar boton */}

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, bgcolor: '#15A0A0' }}
                            >
                                Iniciar sesión
                            </Button>



                        </Grid>

                    </Box>
                    <ModalPswd variant="body2" />
                </Box>

                <Copyright sx={{ mt: 8, mb: 4 }} />

            </Container>






        </ThemeProvider>
    );
}
