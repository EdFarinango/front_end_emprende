import React, { useContext } from "react";
import { AuthContext } from "../../contexts";
//import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";
import { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import Typography from "@material-ui/core/Typography";

import { Row } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";

import ModalInfo from "../../components/organisms/ModalInfo";
import ModalPswd from "../../components/organisms/ModalPswd";
import ModalAvatar from "../../components/organisms/ModalAvatar";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    display: "flex",
    margin: "0 10px",


  },
  media: {
    height: 345,
  },

});

export const Dashboard = () => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");
 

 
  

 
  return (
    <>
      <div className="container  ">
    
          {user && user.rol === "superadmin" && (
                <Row className="mt-2 d-flex justify-content-between">
            <Card className={classes.root}>
              <CardActionArea>
                <Link to="/administracion/super">
                  <CardMedia
                    className={classes.media}
                    image="https://cdn-icons-png.flaticon.com/512/1705/1705768.png"
                    title="Super Usuario"
                  />
                </Link>

                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Super Administradores
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Módulo de administración, se podra crear, editar y
                    desactivar super administradores.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
     

            <Card className={classes.root}>
              <CardActionArea>
                <Link to="/administracion/admin">
                  <CardMedia
                    className={classes.media}
                    image="https://cdn-icons-png.flaticon.com/512/1705/1705768.png"
                    title="Super Usuario"
                  />
                </Link>

                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Administradores
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Módulo de administración, se podra crear, editar y
                    desactivar administradores generales.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>

            <Card className={classes.root}>
            <CardActionArea>
              <Link to="/users/emprendimientos">
                <CardMedia
                  className={classes.media}
                  image="https://cdn-icons-png.flaticon.com/512/2103/2103716.png"
                  title="emprendimiento"
                />
              </Link>

              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Emprendimientos
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Módulo de administración, se podra crear, editar y desactivar
                  emprendimientos.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>



          </Row>
          )}


            
            
        

          {user && user.rol === "admin" && (
                  <Row className="mt-2 d-flex justify-content-center">

          <Card className={classes.root} >
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="https://cdn-icons-png.flaticon.com/512/1705/1705768.png"
                title="Usuario administrador"
                alt = "Usuario administrador"
              />
              <div className="d-flex justify-content-between mt-2">
                <ModalPswd />
                <ModalAvatar />
                <ModalInfo />
              </div>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Pefirl de administrador
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Podra visualizar sus datos actualizar su perfil y cambiar su
                  contraseña.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card className={classes.root}>
            <CardActionArea>
              <Link to="/users/emprendimientos">
                <CardMedia
                  className={classes.media}
                  image="https://cdn-icons-png.flaticon.com/512/2103/2103716.png"
                  title="Administrar Esmprendimiento"
                  alt="Administrar Esmprendimiento"
                />
              </Link>

              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Emprendimientos
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Módulo de administración, se podra crear, editar y desactivar
                  emprendimientos.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>




          </Row>
          )}

          
     
      </div>
    </>
  );
};
