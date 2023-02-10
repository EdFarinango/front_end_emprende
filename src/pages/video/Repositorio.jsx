import React from "react";

import Button from "@mui/material/Button";

import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";

import { Box } from "@mui/system";

import "./style.css";
import axios from "axios";

import { Form, FormGroup, Label, Input } from "react-bootstrap";
import FormInput from "../../components/templates/Inputs";

import { useContext } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";
import ModalVideo from "../../components/organisms/ModalEditVideo";
import Loading from "../../components/atoms/Loading";
import Buho from "../../components/assets/buho.png"
import { Image } from "@mui/icons-material";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();
const Repositorio = ({ video }) => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    url: "",
  });

  const handleInputChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const regrasarArriba = () => {
    window.scrollTo(0, 0);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(form);
    axios
      .post(
        `https://backend-emprende.herokuapp.com/api/v1/videoconferencia/create`,
        form,
        { headers: { accept: "application/json", authorization: token } }
      )
      .then((response) => {
   
        getData();
        alert({
          title: "Video agregado correctamente",
          icon: "success",

        })
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://backend-emprende.herokuapp.com/api/v1/videoconferencia`,
        {
          headers: { accept: "application/json", authorization: token },
        }
      );
      setData(response.data.data.video_conferencias);
      console.log(response.data.data.video_conferencias);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
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
      //pattern: "^{3,255}$",
      required: true,
    },
    {
      id: 3,
      name: "url",
      type: "text",
      placeholder: "Ingrese la dirección del video",
      errorMessage: "Debe ingresar un apellido válido!",
      label: "Dirección del video",
      pattern: "^https?://[w-]+(.[w-]+)+[/#?]?.*$",
      required: true,
    },
  ];

  const updateVideo = async (id) => {
    try {
      const response = await axios.get(
        `https://backend-emprende.herokuapp.com/api/v1/videoconferencia/${id}/update`,
        { headers: { accept: "application/json", authorization: token } }
      );

      await getData();

      //console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

if (loading) {
    return (
      <Loading/>
    );
  } else

  if (user) {
    return (
      <>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <main>
            {/* Hero unit */}
            <div>
          <Container maxWidth="lg">
            
                <Container maxWidth="sm">
               
          <Box sx={{ display: "flex", justifyContent: "center" }}>
          
            <Box sx={{ width: "100%" }}>
              
              <Form onSubmit={handleSubmit} className="form-control">
              <h2>Formulario de Registro de videos</h2>
                <FormGroup>
                  {inputs.map((input) => (
                    <FormInput
                      key={input.id}
                      {...input}
                      value={form[input.name]}
                      onChange={handleInputChange}
                    />
                  ))}
                </FormGroup>

                <Button color="info" type="submit">
                  Ingresar
                </Button>
              </Form>
            </Box>
          </Box>

                </Container>
              </Container>         


             
          
          <br />

       
              <Container
                maxWidth="sm"
                sx={{ mt: 4, mb: 2, display: "flex", flexDirection: "column" }}
              >
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="text.primary"
                  gutterBottom
                >
                 
                  <img src = {Buho} alt = "logo" width = "150" height = "150" className="d-inline-block align-top imgAling" />
                  Videos de la comisión Emprende-ESFOT
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  color="text.secondary"
                  paragraph
                >
                  Aquí encontrarás los videos de la comisión Emprende-ESFOT
                </Typography>
              </Container>

              
            </div>
            <Container sx={{ py: 8 }} maxWidth="lg">
              <Grid container spacing={12}>
                {data.map((item) => (
                  <Grid item key={item.id} sm={6} md={4}>
                    <Box
                      sx={{
                        height: "400px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div className="embed-responsive embed-responsive-16by9 shadow-1-strong rounded mb-4">
                        <iframe
                          src={item.url}
                          width="100%"
                          height="200px"
                          className="embed-responsive-item"
                          allowFullScreen="true"
                          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        />
                      </div>
                      <Box sx={{ flexGrow: 0 }}>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="h2"
                          align="center"
                        >
                          {item.nombre}
                        </Typography>
                        <Typography align="center">
                          {item.descripcion}
                        </Typography>
                      </Box>
                      <Box sx={{ p: 2 }}>
                        <Grid container spacing={2} justifyContent="center">
                          <Grid item>
                            <ModalVideo
                              video={item}
                              buttonLabel="Editar"
                              type="button"
                              className="btn btn-primary"
                              id={item.id}
                            
                            />
                          </Grid>
                          
                        </Grid>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              
            </Container>
          </main>
          {/* Footer */}
          <footer>
            <Typography variant="h6" align="center" gutterBottom>
              Footer
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="text.secondary"
              component="p"
            >
              Something here to give the footer a purpose!
            </Typography>
            <Box sx={{ mt: 5 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                align="center"
              ></Typography>
            </Box>
          </footer>
          {/* End footer */}
        </ThemeProvider>
      </>
    );
  } else {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <main>
          {/* Hero unit */}
          <div>
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Repositorio
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="text.secondary"
                paragraph
              >
                En esta sección encontrarás videos de conferencias y talleres
                realizados por Emprende.
              </Typography>
            </Container>
          </div>
          <Container sx={{ py: 8 }} maxWidth="lg">
            <Grid container spacing={12}>
              {data.map((item) => (
                <Grid item key={item.id} sm={6} md={4}>
                  <Box
                    sx={{
                      height: "400px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div className="embed-responsive embed-responsive-16by9 shadow-1-strong rounded mb-4">
                      <iframe
                        src={item.url}
                        width="100%"
                        height="200px"
                        className="embed-responsive-item"
                        allowFullScreen="true"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      />
                    </div>
                    <Box sx={{ flexGrow: 0 }}>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        align="center"
                      >
                        {item.nombre}
                      </Typography>
                      <Typography align="center">
                        {item.descripcion}
                      </Typography>
                      

                    </Box>
                    
                  </Box>
                </Grid>
              ))}
            </Grid>

          </Container>
        </main>
        {/* Footer */}
        <footer>
          <Typography variant="h6" align="center" gutterBottom>
            Footer
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
            Something here to give the footer a purpose!
          </Typography>
          <Box sx={{ mt: 5 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
            ></Typography>
          </Box>
        </footer>
        {/* End footer */}
      </ThemeProvider>
    );
  }

};

export default Repositorio;
