import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaNetworkWired } from "react-icons/fa";

import axios from "axios";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import ModalPswd from "./ModalPswd";
import alert from "sweetalert2";

import withReactContent from 'sweetalert2-react-content';
import X from "../../components/assets/logo_esfot_buho.png"

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link href="#" textDecoration="none">
        2019 - Emprende
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const theme = createTheme();

export const Login = () => {


  const Alerta = withReactContent(alert)
  const { login } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({});

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleLogout = async () => {




    //console.log("token desde logout", localStorage.getItem('token'));

    try {
      await axios.post(
        'https://backend-emprende.herokuapp.com/api/v1/logout',
        {}, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }


      )
      logout();
      //console.log("salio");
    } catch (error) {
      logout();
      //console.log(error);




    }


  };
  const onLogin = async (e) => {

    e.preventDefault();
    setErrors(validationsForm(form));

    if (Object.keys(errors).length === 0) {


      try {
        await axios
          .post("https://backend-emprende.herokuapp.com/api/v1/login", {
            ...form,
          }).then((response) => {

            //console.log(response);



            const { access_token, token_type, user } = response.data.data;




            setResponse(response)

            login(user, `${token_type} ${access_token}`);


            //console.log("Ingreso exitoso");


            Alerta.fire({
              title: <p>EMPRENDE</p>,
              text: "Bienvenido",
              //imagen con tamaño 100x100
              imageUrl: X,
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


            }).then(() => {
              window.location.href = "/administracion";
            });




          }

          ).catch((error) => {



            localStorage.setItem("token", error.response.data.data.access_token);






            if (error.response.data.errors) {
              Alerta.fire({
                title: <p>Atención!</p>,
                text: "Debe proporcionar una dirección de correo electrónico y una contraseña válidas",
                //imagen con tamaño 100x100
                imageUrl: X,
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
            } else
              if (error.response.data.message === "Usuario ya tiene una sesión iniciada") {



                Alerta.fire({
                  title: "Emprende",
                  html:
                    <div>
                      <p>Este usuario ya tiene una sesión activa</p>
                      <p>Para ingresar debe cerrar sesión en los otros dispositivos</p>
                    </div>
                  ,
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: "Cerrar sesión",
                  cancelButtonText: "Cancelar",
                }).then((resultado) => {
                  if (resultado.value) {

                    setForm({
                      email: "",
                      password: "",
                    });
                    handleLogout().then(() => {
                      Alerta.fire({
                        title: <p>Atención!</p>,
                        text: "Se cerró todas las sesiones activas relacionadas a este usuario",
                        //imagen con tamaño 100x100
                        imageUrl: X,
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
                    }).catch((error) => {
                      //console.log(error);
                      handleLogout();
                    });






                  } else {

                    Alerta.fire("Cancelado", "No se cerró la sesión");
                  }
                });


              } if (error.response.data.message === "Las credenciales ingresadas son incorrectas.") {

                Alerta.fire({
                  title: <p>Atención!</p>,
                  text: "Las credenciales proporcionadas no coinciden con nuestros registros",
                  //imagen con tamaño 100x100
                  imageUrl: X,
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
                });
              }

          });










      } catch (error) {


        Alerta.fire({
          title: <p>Atención!</p>,
          text: "Las credenciales proporcionadas no coinciden con nuestros registros",
          //imagen con tamaño 100x100
          imageUrl: X,
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
        });
      }













    }
    // Alerta.fire({
    //   title: <p>Atención!</p>,
    //   text: "La contraseña es obligatoria, ingrese una contraseña válida",
    //   //imagen con tamaño 100x100
    //   imageUrl: X,
    //   imageHeight: 100,
    //   imageWidth: "auto",
    //   imageAlt: 'alertaEPN',
    //   //boton desactivado
    //   showConfirmButton: false,
    //   //tiempo de desaparicion
    //   timer: 3000,
    //   //color de fondo
    //   background: '#fff',
    //   //color de texto
    //   customClass: {
    //     title: 'text-dark',
    //     text: 'text-dark',
    //     popup: 'bg-light',
    //     icon: 'bg-light'
    //   }


    // });
    //     console.log(error.response.data.message);

    //     if (error.response.data.message === "Usuario ya tiene una sesión iniciada") {

    //       setTokenSesion(error.response.data.data.access_token);
    //       Alerta.fire({
    //         title: "Emprende",
    //         html: 
    //           <div>
    //             <p>Este usuario ya tiene una sesión activa</p>
    //             <p>¿Desea cerrar la sesión activa?</p>
    //           </div>
    //         ,
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonText: "Sí, cerra sesión",
    //         cancelButtonText: "Cancelar",
    //       }).then((resultado) => {
    //         if (resultado.value) {

    //           handleLogout();
    //           setForm({
    //             email: "",
    //             password: "",
    //           });
    //           console.log("se cerro la sesión");
    //           handleLogout();
    //         } else {
    //           // Dijeron que no
    //           Alerta.fire("Cancelado", "No se cerró la sesión");
    //         }
    //       });
    //     }








    //       Alerta.fire({
    //         title: <p>Atención!</p>,
    //         text: "Debe ingresar una contraseña válida",
    //         //imagen con tamaño 100x100
    //         imageUrl: X,
    //         imageHeight: 100,
    //         imageWidth: "auto",
    //         imageAlt: 'alertaEPN',
    //         //boton desactivado
    //         showConfirmButton: false,
    //         //tiempo de desaparicion
    //         timer: 3000,
    //         //color de fondo
    //         background: '#fff',
    //         //color de texto
    //         customClass: {
    //           title: 'text-dark',
    //           text: 'text-dark',
    //           popup: 'bg-light',
    //           icon: 'bg-light'
    //         }


    //       })



    //       Alerta.fire({
    //         title: <p>Atención!</p>,
    //         text: "Las credenciales proporcionadas no coinciden con nuestros registros",
    //         //imagen con tamaño 100x100
    //         imageUrl: X,
    //         imageHeight: 100,
    //         imageWidth: "auto",
    //         imageAlt: 'alertaEPN',
    //         //boton desactivado
    //         showConfirmButton: false,
    //         //tiempo de desaparicion
    //         timer: 3000,
    //         //color de fondo
    //         background: '#fff',
    //         //color de texto
    //         customClass: {
    //           title: 'text-dark',
    //           text: 'text-dark',
    //           popup: 'bg-light',
    //           icon: 'bg-light'
    //         }


    //       })
    //     }



    //     Alerta.fire({
    //       title: <p>Atención!</p>,
    //       text: "La dirección de correo electrónico es obligatoria, ingrese un correo válido",
    //       //imagen con tamaño 100x100
    //       imageUrl: X,

    //       imageHeight: 100,
    //       imageWidth: "auto",
    //       imageAlt: 'alertaEPN',
    //       //boton desactivado
    //       showConfirmButton: false,
    //       //tiempo de desaparicion
    //       timer: 3000,
    //       //color de fondo
    //       background: '#fff',
    //       //color de texto
    //       customClass: {
    //         title: 'text-dark',
    //         text: 'text-dark',
    //         popup: 'bg-light',
    //         icon: 'bg-light'
    //       }


    //     })


    //     Alerta.fire({
    //       title: <p>Atención!</p>,
    //       text: "La contraseña es obligatoria, ingrese una contraseña válida",
    //       //imagen con tamaño 100x100
    //       imageUrl: X,
    //       imageHeight: 100,
    //       imageWidth: "auto",
    //       imageAlt: 'alertaEPN',
    //       //boton desactivado
    //       showConfirmButton: false,
    //       //tiempo de desaparicion
    //       timer: 3000,
    //       //color de fondo
    //       background: '#fff',
    //       //color de texto
    //       customClass: {
    //         title: 'text-dark',
    //         text: 'text-dark',
    //         popup: 'bg-light',
    //         icon: 'bg-light'
    //       }


    //     })

    // }
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
  };

  const validationsForm = (form) => {
    let errors = {};
    //let regexName = /^[a-zA-ZÀ-ÿ\s]{1,40}$/; // Letras y espacios, pueden llevar acentos.
    let regexEmail =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/; // Letras, numeros, guion y guion_bajo
    let regexPassword = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{2,4}$/; ///^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/; // 4 a 12 digitos.
    //let regexPhone = /^\d{7,10}$/; // 7 a 14 numeros.

    if (!form.email) {
      errors.email =
        "La dirección de correo electrónico es obligatoria, ingrese un correo válido";
    } else if (!regexEmail.test(form.email)) {
      errors.email = "El correo electrónico ingresado no es válido";
    } else if (!form.password) {
      errors.password = "Por favor ingrese una contraseña";
    }

    // }else if (!form.password) {
    //     errors.password = "Por favor ingrese una contraseña";
    // } else if (!regexPassword.test(form.password)) {
    //     errors.password = "La contraseña no es válida";
    // }

    return errors;
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{
              color: "#000000",
              fontWeight: "bold",
              fontFamily: "Montserrat",
            }}
          >
            EMPRENDE
          </Typography>
          <Typography
            component="h2"
            variant="h5"
            sx={{
              fontFamily: "Montserrat",
              fontWeight: "bolder",
              fontSize: "1 rem",
            }}
          >
            Ingresa al panel de administración
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={onLogin}
            sx={{ mt: 1 }}
            className="formControl"
          >
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
            />
            {errors.email && ( // Si hay errores, se muestran
              <div className="error">{errors.email}</div>
            )}

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
            {errors.password && ( // Si hay errores, se muestran

              <div className="error">{errors.password}</div>
            )}




            <Grid container>



              <Button
                disabled={errors.email || errors.password}
                className="btn"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: "#15A0A0" }}
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
};
