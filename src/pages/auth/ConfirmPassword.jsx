

import React, { useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Button from "@mui/material/Button";


import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";



import alert from "sweetalert2";
import  X  from "../../components/assets/logo_esfot_buho.png"
import withReactContent from 'sweetalert2-react-content';

   
export const ConfirmPassword = () => {
  const Alerta = withReactContent(alert)
  const navigate = useNavigate();
  const [token, settoken] = useState("");
  const [activo, setactivo] = useState(false);
  const [Mensajeactivo, setMensajeactivo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setpassword_confirmation] = useState("");
  const [shown, setShown] = React.useState(false);
  const theme = createTheme();

 
    

      useEffect(() => {
       if (window.location.href === "https://emprende-esfot.vercel.app/emprende/reseteo-contraseña") {
        navigate("/login");
      }


      if (token === "") {
       let cadenatoken1 = window.location.href.split("token=")[1];
      cadenatoken1.split("&");
      settoken(cadenatoken1.split("&")[0]);
     setEmail(window.location.href.split("email=")[1]);   
      
       }
       window.history.replaceState({}, document.title, "/emprende/" + "reseteo-contraseña");


  
     }, []);

    

   

  
   
     

  const handleSubmit = async (e) => {
    console.log("asdas",token)
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
          Alerta.fire({
            title: <p>Atención!</p>,
            html:<div> 
            <p>La contraseña ha sido cambiada, sera redirigido al inicio de sesión</p>
            </div>,
            //imagen con tamaño 100x100
            imageUrl: X ,
            imageHeight: 100,
            imageWidth: "auto",
            imageAlt: 'alertaEPN',
            //boton desactivado
          
            //tiempo de desaparicion
            timer: 6000,
            //color de fondo
            background: '#fff',
            //color de texto
            customClass: {
              title: 'text-dark',
              text: 'text-dark',
              popup: 'bg-light',
              icon: 'bg-light'
            }
            
      
          })
          console.log( "hey1",response.data);
      setMensajeactivo(response.data.message);
      setactivo(true);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
        }
      });
      
    } catch (error) {
     
      

      console.log(error.response);

    
        if (error.response.data.errors.password)
        {
          if (error.response.data.errors.password.length === 4) {
            Alerta.fire({
              title: <p>Atención!</p>,
              html:<div> 
              <p>* Debe ingresar ina contraseña valida.</p>
              </div>,
              //imagen con tamaño 100x100
              imageUrl: X ,
              imageHeight: 100,
              imageWidth: "auto",
              imageAlt: 'alertaEPN',
              //boton desactivado
            
              //tiempo de desaparicion
              timer: 6000,
              //color de fondo
              background: '#fff',
              //color de texto
              customClass: {
                title: 'text-dark',
                text: 'text-dark',
                popup: 'bg-light',
                icon: 'bg-light'
              }
              
        
            })
  
          }
          if (error.response.data.errors.password.length === 3) {
              Alerta.fire({
              title: <p>Atención!</p>,
              html:<div> 
              <p>La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula y un número.</p>
              </div>,
              //imagen con tamaño 100x100
              imageUrl: X ,
              imageHeight: 100,
              imageWidth: "auto",
              imageAlt: 'alertaEPN',
              //boton desactivado
            
              //tiempo de desaparicion
              timer: 6000,
              //color de fondo
              background: '#fff',
              //color de texto
              customClass: {
                title: 'text-dark',
                text: 'text-dark',
                popup: 'bg-light',
                icon: 'bg-light'
              }
              
        
            })
            
  
          }else if(error.response.data.errors.password.length === 2 || error.response.data.errors.password[0] === 'The contraseña must contain at least one number.'){
            Alerta.fire({
              title: <p>Atención!</p>,
              html:<div> 
              <p>La contraseña debe contener al menos un número.</p>
              </div>,
              //imagen con tamaño 100x100
              imageUrl: X ,
              imageHeight: 100,
              imageWidth: "auto",
              imageAlt: 'alertaEPN',
              //boton desactivado
            
              //tiempo de desaparicion
              timer: 6000,
              //color de fondo
              background: '#fff',
              //color de texto
              customClass: {
                title: 'text-dark',
                text: 'text-dark',
                popup: 'bg-light',
                icon: 'bg-light'
              }
              
        
            })
  
            
          }else if(error.response.data.errors.password[0] ==='La confirmación de contraseña no coincide.'){
            Alerta.fire({
              title: <p>Atención!</p>,
              html:<div> 
              <p>Las contraseñas ingresadas no coinciden.</p>
              </div>,
              //imagen con tamaño 100x100
              imageUrl: X ,
              imageHeight: 100,
              imageWidth: "auto",
              imageAlt: 'alertaEPN',
              //boton desactivado
            
              //tiempo de desaparicion
              timer: 6000,
              //color de fondo
              background: '#fff',
              //color de texto
              customClass: {
                title: 'text-dark',
                text: 'text-dark',
                popup: 'bg-light',
                icon: 'bg-light'
              }
              
        
            })
  
          }else if(error.response.data.errors.password[0] === 'The contraseña must contain at least one uppercase and one lowercase letter.'){
            Alerta.fire({
              title: <p>Atención!</p>,
              html:<div> 
              <p>Las contraseñas debe contener al menos una mayúscula y una minúscula.</p>
              </div>,
              //imagen con tamaño 100x100
              imageUrl: X ,
              imageHeight: 100,
              imageWidth: "auto",
              imageAlt: 'alertaEPN',
              //boton desactivado
            
              //tiempo de desaparicion
              timer: 6000,
              //color de fondo
              background: '#fff',
              //color de texto
              customClass: {
                title: 'text-dark',
                text: 'text-dark',
                popup: 'bg-light',
                icon: 'bg-light'
              }
              
        
            })
          }
          
          
          
          else if(error.response.data.errors.password[0]=== 'El campo contraseña es obligatorio.'){
            Alerta.fire({
              title: <p>Atención!</p>,
              text: "Debe ingresar una contraseña, todos los campos son obligatorios",
              //imagen con tamaño 100x100
              imageUrl: X ,
              imageHeight: 100,
              imageWidth: "auto",
              imageAlt: 'alertaEPN',
              //boton desactivado
              showConfirmButton: false,
              //tiempo de desaparicion
              timer: 3000,
              //color de fondo
              background: '#fff',
              //color de texto
              customClass: {
                title: 'text-dark',
                text: 'text-dark',
                popup: 'bg-light',
                icon: 'bg-light'
              }
              
        
            })
          }
        }else 
         if (error.response.data.errors.email === "El token de restablecimiento de contraseña es inválido.")
        {
       
          Alerta.fire({
            title: <p>Atención!</p>,
            text:"El tiempo de espera para cambiar la contraseña ha expirado, realize el proceso nuevamente",
            //imagen con tamaño 100x100
            imageUrl: X ,
            imageHeight: 100,
            imageWidth: "auto",
            imageAlt: 'alertaEPN',
            //boton desactivado
            showConfirmButton: false,
            //tiempo de desaparicion
            timer: 3000,
            //color de fondo
            background: '#fff',
            //color de texto
            customClass: {
              title: 'text-dark',
              text: 'text-dark',
              popup: 'bg-light',
              icon: 'bg-light'
            }
            
      
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
                        <Typography variant="body2"  sx={{ mt: 2, mb: 2, fontFamily: "Montserrat", fontSize: "0.8rem", fontWeight: "bolder" }}>
                            * La contraseña debe contener al menos una mayúscula y una minúscula, La contraseña debe contener al menos 8 caracteres
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

