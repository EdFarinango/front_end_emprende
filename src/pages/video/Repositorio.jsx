import React from "react";

import Button from "@mui/material/Button";

import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
//import "./css/custom.css";
import { Box } from "@mui/system";
//import "./css/custom.css.map";
//import "./css/normalize.css";
import "./style.css";
import axios from "axios";

import { Form, FormGroup, Label, Input } from "react-bootstrap";
import FormInput from "../../components/templates/Inputs";

import { useContext } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";





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
const cards = [1, 2, 3];

const videos = [
  {
    id: 1,
    title: "Facturación electrónica",
    description:
      "Usuarios de la facturación electrónica se clasifican en personas naturales y jurídicas, los requisitos son la cedula de identidad o RUC. Es obligatoria la facturación electrónica si el régimen RIMPE lo estipula.",
    url: "https://www.facebook.com/plugins/video.php?height=300&href=https%3A%2F%2Fwww.facebook.com%2F100063704537871%2Fvideos%2F725697909140280%2F&show_text=false&width=560&t=0",
  },
  {
    id: 2,
    title: "Innovación Desde sus conceptos hasta su aplicación en emprendimientos",
    description:
      "#actitudESFOT #emprendeesfotf",
    url: "https://www.facebook.com/plugins/video.php?height=302&href=https%3A%2F%2Fwww.facebook.com%2F100063704537871%2Fvideos%2F430155859213826%2F&show_text=false&width=560&t=0",
  },

  {
    id: 3,
    title: "Soluciones ecológicas y sustentables, el futuro de la construcción",
    description:
      "#actitudESFOT #emprendeesfot",
    url: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2F100063704537871%2Fvideos%2F751594912828832%2F&show_text=false&width=560&t=0https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2F100063704537871%2Fvideos%2F751594912828832%2F&show_text=false&width=560&t=0",
  },

  {
    id: 4,
    title: "La innovación como catalizador de emprendimientos sostenibles.",
    description:
      "#actitudESFOT #emprendeesfot.",
    url: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2F100063704537871%2Fvideos%2F761035128684599%2F&show_text=false&width=560&t=0",
  },
  {
    id: 5,
    title: "Concepto de MVP en Startups y como apoya a su crecimiento",
    description:
      "Charla dictada por Juan Diego Montero Co-Founder & User Experience Consultant en Tinkin.",
    url: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2F100063704537871%2Fvideos%2F705680330801000%2F&show_text=false&width=560&t=0",
  },
  {
    id: 6,
    title: "Nichos de negocio en el sector de la cocina y la gastronomía",
    description:
      "Daniel Ituma",
    url: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2F100063704537871%2Fvideos%2F402886001611495%2F&show_text=false&width=560&t=0",
  },
  {
    id: 7,
    title: "Aprendiendo a Emprender",
    description:
      "Experiencias del programa Aprendiendo a Emprender y oportunidades de emprendimiento en ingeniería y Tecnología.",
    url: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2F100063704537871%2Fvideos%2F265857248827325%2F&show_text=false&width=560&t=0",
  },
  
  {
    id: 8,
    title: "Conversatorio Kradac Movilidad urbana",
    description:
      "Bruno Valarezo CEO Kradac Movilidad urbana Parte 1.",
    url: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2F100063704537871%2Fvideos%2F1212375275897794%2F&show_text=false&width=560&t=0",
  },{
    id: 9,
    title: "Conversatorio Kradac Movilidad urbana",
    description:
      "Bruno Valarezo CEO Kradac Movilidad urbana Parte 2.",
    url: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2F100063704537871%2Fvideos%2F542238636868667%2F&show_text=false&width=560&t=0",
  },
  {
    id: 10,
    title: "Economía Circulares parte 1",
    description:
      "#actitudESFOT #emprendeesfot",
    url: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2F100063704537871%2Fvideos%2F519750889308318%2F&show_text=false&width=560&t=0",
  },
  {
    id: 11,
    title: "Economía Circulares parte 2",
    description:
      "#actitudESFOT #emprendeesfot",
    url: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2F100063704537871%2Fvideos%2F224386489600392%2F&show_text=false&width=560&t=0",
  },
  {
    id: 12,
    title: "Tips para emprender",
    description:
      "#David Loja Romero actitudESFOT #emprendeesfot",
    url: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2F100063704537871%2Fvideos%2F2935239490090638%2F&show_text=false&width=560&t=0",
  }
 
  

];

const theme = createTheme();
const Repositorio = () => {

  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const {user} = useContext(AuthContext);
  const [form, setForm] = useState({
    title: "",
    url: ""
  });


  const handleInputChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });

    // const url = event.target.value;
    // const urlEncoded = encodeURIComponent(url);
    // console.log(urlEncoded);
  };


  

 





















  const handleSubmit = (event) => {
    event.preventDefault();
    
    axios
      .post(`https://backend-emprende.herokuapp.com/api/v1/videoconferencia/create`, form,
      { headers: { accept: "application/json", authorization: token } })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const getData = async () => {
    try {
      const response = await axios
        .get(`https://backend-emprende.herokuapp.com/api/v1/videoconferencia`, {
          headers: { 'accept': "application/json", 'authorization': token },
        });
        setData(response.data.data.video_conferencias);
      console.log(response.data.data.video_conferencias);
    } catch (error) {
      console.log(error);
    }
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
      name: "url",
      type: "text",
      placeholder: "Ingrese la dirección del video",
      errorMessage: "Debe ingresar un apellido válido!",
      label: "Dirección del video",
      pattern: "^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$",
      required: true,
  
    }
  ];


  const updateVideo = async (id) => {
    try {
      const response = await axios
        .get(
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
  


if (user){
  return (
    <>
<ThemeProvider theme={theme}>
        <CssBaseline />
       <h1>Formulario de Registro de videos</h1>
       <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "100%" }}>


      <Form onSubmit={handleSubmit} className="form-control">
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
         
          Crear
        </Button>
        
      </Form>
      </Box>
      </Box>
      <br />

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
              {/* <div>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item>
                    <Button variant="contained" color="primary">
                      Ver más
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" color="primary">
                      Ver más
                    </Button>
                  </Grid>
                </Grid>
              </div> */}
            </Container>
          </div>
          <Container sx={{ py: 8 }} maxWidth="lg">

            <Grid container spacing={12}>
              {data.map((item) => (
                <Grid item key={item.id}  sm={6} md={4}>
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
                      
                    </Box>
                    <Box sx={{ p: 2 }}>
                      <Grid container spacing={2} justifyContent="center">
                        <Grid item>
                          <Button variant="contained" color="primary">
                            Ver más
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button variant="outlined" color="primary">
                            Ver más
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>














   
            <Grid container spacing={4}>
              {videos.map((video) => (
                <main className="containerVideo my-5 my-md-0 vh-md-100 d-flex align-items-center justify-content-center" 
                sx = {{backgroundColor: "#f5f5f5"}}
                
                >
                  <article className="card overflow-hidden border-0 rounded-3 flex-md-row align-items-center">
                    <div className="order-md-2 flex-md-grow-1 w-100 p-3 p-md-5">
        
                      <div className="embed-responsive embed-responsive-16by9 shadow-1-strong rounded mb-4"> 
                        <iframe
                          src={video.url}
                          width="100%"
                          height="200px"
                          className="embed-responsive-item"
                  
                        
                          allowFullScreen="true"
                          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        />
                      </div>
                     
                    </div>
                    <section className="order-md-1 flex-md-grow-1 w-100">
                      <div className="card-body text-center text-md-start">
                        <h1 className="card-title h2">{video.title}</h1>
                        <p className="text-secondary"
                          style={{
                            fontSize: "1.2rem",
                            fontWeight: "400",
                            lineHeight: "1.5",
                          }}
                        >
                          {video.description}
                        </p>
       

                        <div>
                          <a
                            href="https://www.facebook.com/profile.php?id=100063704537871"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <p>
                              <i className="fa fa-facebook w3-xxlarge" />
                            </p>
                          </a>
                          <p className="text-uppercase text-secondary text-companies">
                            EMPRENDE - ESFOT
                          </p>
                        </div>
                      </div>
                    </section>
                  </article>
   

                  


                 

               
                
                 

                </main>
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
                <Grid item key={item.id}  sm={6} md={4}>
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
                      
                    </Box>
                    <Box sx={{ p: 2 }}>
                      <Grid container spacing={2} justifyContent="center">
                        <Grid item>
                          <Button variant="contained" color="primary">
                            Ver más
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button variant="outlined" color="primary">
                            Ver más
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>














   
            <Grid container spacing={4}>
              {videos.map((video) => (
                <main className="containerVideo my-5 my-md-0 vh-md-100 d-flex align-items-center justify-content-center" 
                sx = {{backgroundColor: "#f5f5f5"}}
                
                >
                  <article className="card overflow-hidden border-0 rounded-3 flex-md-row align-items-center">
                    <div className="order-md-2 flex-md-grow-1 w-100 p-3 p-md-5">
        
                      <div className="embed-responsive embed-responsive-16by9 shadow-1-strong rounded mb-4"> 
                        <iframe
                          src={video.url}
                          width="100%"
                          height="200px"
                          className="embed-responsive-item"
                  
                        
                          allowFullScreen="true"
                          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        />
                      </div>
                     
                    </div>
                    <section className="order-md-1 flex-md-grow-1 w-100">
                      <div className="card-body text-center text-md-start">
                        <h1 className="card-title h2">{video.title}</h1>
                        <p className="text-secondary"
                          style={{
                            fontSize: "1.2rem",
                            fontWeight: "400",
                            lineHeight: "1.5",
                          }}
                        >
                          {video.description}
                        </p>
       

                        <div>
                          <a
                            href="https://www.facebook.com/profile.php?id=100063704537871"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <p>
                              <i className="fa fa-facebook w3-xxlarge" />
                            </p>
                          </a>
                          <p className="text-uppercase text-secondary text-companies">
                            EMPRENDE - ESFOT
                          </p>
                        </div>
                      </div>
                    </section>
                  </article>
   

                  


                 

               
                
                 

                </main>
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
