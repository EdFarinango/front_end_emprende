import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button
} from "@material-ui/core";
import ModalNewEmp from "../../components/organisms/ModalNewEmp";

const useStyles = makeStyles({
  root: {
    minWidth: 200
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});



export default function SimpleCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Administración de Emprendimientos
          
        </Typography>
       
        <Typography className={classes.pos} color="textSecondary">
        Panel de usuario
        </Typography>
        <Typography variant="body2" component="p">
          En construcción crear un emprendimiento
          <br />
          
        </Typography>
      </CardContent>
      <CardActions>
      <ModalNewEmp buttonLabel="Crear" style={{backgroundColor: "red"}}/>
      </CardActions>
    </Card>
  );
}
