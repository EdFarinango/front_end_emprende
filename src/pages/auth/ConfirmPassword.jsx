

import React, { useState } from 'react';
import axios from 'axios';
import { Label } from '../../components';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Button from "@mui/material/Button";
import  { useContext } from "react";


import { AuthContext } from "../../contexts";
import { Link } from "react-router-dom";

import { FaNetworkWired } from "react-icons/fa";


import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import ModalPswd from "./ModalPswd";
import alert from "sweetalert";

export const ConfirmPassword = () => {
  const navigate = useNavigate();
  const [token, settoken] = useState("");
  const [activo, setactivo] = useState(false);
  const [Mensajeactivo, setMensajeactivo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setpassword_confirmation] = useState("");
  const [shown, setShown] = React.useState(false);
  const theme = createTheme();
  const switchShown = () => setShown(!shown);

    useEffect(() => {
      let cadenatoken1 = window.location.href.split("token=")[1];
      cadenatoken1.split("&");
      settoken(cadenatoken1.split("&")[0]);
      setEmail(window.location.href.split("email=")[1]);


       

     }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      token: token,
      email: email,
      password: password,
      password_confirmation: password_confirmation,
    };
    try {
      const response = await axios.post(
        "https://backend-emprende.herokuapp.com/api/v1/reset-password",
        data
      ).then((response) => {
        console.log(response);
        if (response.status === 200) {
          alert("Contraseña actualizada correctamente");
        }
      });
      console.log( "hey1",response.data);
      setMensajeactivo(response.data.message);
      setactivo(true);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
     
      

      //console.log(error.response.data.errors.password[0]);

    
        if (error.response.data.errors.password)
        {
          if (error.response.data.errors.password.length === 4) {
            alert({
              title: "Error",
              text: "Ingrese una contraseña valida",
              icon: "error",
              button: false,
              timer: 2000,
            });
  
          }
          if (error.response.data.errors.password.length === 3) {
            alert({
              title: "Error",
              text: "La contraseña debe contener al menos una mayúscula y una minúscula, La contraseña debe contener al menos 8 caracteres",
              icon: "error",
              button: false,
              timer: 2000,
            });
  
          }else if(error.response.data.errors.password.length === 2){
            alert ({
              title: "Error",
              text: "La contraseña debe contener al menos una mayúscula y una minúscula",
              icon: "error",
              button: false,
              timer: 2000,
            })
  
            
          }if(error.response.data.errors.password[0] ==='validation.required'){
            alert ({
              title: "Error",
              text: "No se puede enviar un formulario vacío ",
              icon: "error",
              button: false,
              timer: 2000,
            })
          }
          
          
          
          else if(error.response.data.errors.password.length === 1){
            alert ({
              title: "Error",
              text: "Las contraseñas no coinciden, intente nuevamente",
              icon: "error",
              button: false,
              timer: 2000,
            })
          }
        }else 
         if (error.response.data.errors.email === "passwords.token")
        {
          alert ({
            title: "Error",
            text: "El tiempo de espera para cambiar la contraseña ha expirado, realize el proceso nuevamente",
            icon: "error",
            button: false,
            timer: 3000,
          })
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
      

       

     

      

     

    }
  }

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
             <Typography component="h1" variant="h5"
                sx={{
                    color: "#000000",
                    fontWeight: "bold",
                    fontFamily: "Montserrat",
                }}
                
             >
               EMPRENDE
            </Typography>
            <Typography component="h1" variant="h6"
            sx={{
             
              
                fontFamily: "Montserrat",
                fontWeight: "bolder",
                fontSize : "0.5 rem",
            }}
            >
            Establece una nueva contraseña
            </Typography>
            <Box component="form"  sx={{ mt: 1 }} className = "formControl"  onSubmit={handleSubmit}>
            
                <TextField
                    margin="normal"
                  
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Contraseña"
                    onChange={(e) => setPassword(e.target.value)}
                    
         



                />
               
             
            
                <TextField
                    margin="normal"
                    
                    type="password"
                    className="form-control"
                    id="password_confirmation"
                    name="password_confirmation"
                    placeholder="Confirmar Contraseña"
                    onChange={(e) => setpassword_confirmation(e.target.value)}

                   


                />
                






                <Grid container>




             

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, bgcolor: '#15A0A0' }}
                    >
                        Enviar
                    </Button>
                    
                    <Grid container>
                    <Grid item xs>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 2, mb: 2, fontFamily: "Montserrat", fontSize: "0.8rem", fontWeight: "bold" }}>
                            La contraseña debe contener al menos una mayúscula y una minúscula, La contraseña debe contener al menos 8 caracteres
                        </Typography>
                    </Grid>
                </Grid>


                </Grid>
               
                

                

            </Box>

            
        </Box>

            

    </Container>

   




</ThemeProvider>
    
  );
};

