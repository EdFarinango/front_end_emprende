


import React, { useContext } from 'react';
import { AuthContext } from '../../contexts';
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

import ModalEmp from '../../components/organisms/ModalEmp';
import ModalNewEmp from '../../components/organisms/ModalNewEmp';

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Card from "./Card";
import {
  
  Divider,
  TableContainer,
  Paper,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Switch, Grid } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "20px",
    paddingRight: "20px",
    justifyContent: "center"
  },
  tableContainer: {
    marginTop: "20px"
  },
  table: {
    minWidth: 650
  }
});

export const Emprendimientos = ({emprendimientos}) => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem('token');
  const [data, setData] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const classes = useStyles();
  const darkTheme = createMuiTheme({
    palette: {
      type: "dark"
    },
    color: {
      primary: blue
    }
  });

  const lightTheme = createMuiTheme({
    palette: {
      type: "light"
    },
    color: {
      primary: blue
    }
  });

  const changeTheme = () => {
    setDarkMode(!darkMode);
  };

  

  



  const getData = async () => {
    try {
      const response = await axios.get(
        `https://backend-emprende.herokuapp.com/api/v1/emprendimiento`,
        { headers: { 'accept': 'application/json', 'authorization': token } }
      );

      setData(response.data.data.emprendimientos)
      console.log(response.data.data.emprendimientos)
    } catch (error) {
      console.log(error);
    }
  }

  const deleteEmprendimiento = async (id) => {
    try {
      const response = await axios.get(
        `https://backend-emprende.herokuapp.com/api/v1/emprendimiento/${id}/destroy`,
        { headers: { 'accept': 'application/json', 'authorization': token } }
      );
      console.log(id)
    

      
    } catch (error) {
      console.log(error);
    }
  }

  


  const updateState = (item) => {
    const newData = data.map((emprendimientos) => {
      if (emprendimientos.id === item.id) {
        return item;
      }
      return emprendimientos;
    });
    setData(newData);


  }










  return (


    <>

<ThemeProvider theme={darkMode ? darkTheme : lightTheme}>

      <Switch checked={darkMode} onChange={changeTheme} />
      <Grid container spacing={1} className={classes.gridContainer}>
        <Grid className={classes.gridCardItem} item xs={12} md={4} sm={6}>
          <Card />
        </Grid>
       


      </Grid>
      <Divider />
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Rol</TableCell>
              <TableCell align="right">Nombre</TableCell>
              <TableCell align="right">Descripción</TableCell>
              <TableCell align="right">Categoria</TableCell>
              <TableCell align="right">Dirección</TableCell>
              
             
              <TableCell align="right">Acciones</TableCell>
           
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((emprendimientos) => (
              <TableRow key={emprendimientos}>
                <TableCell component="th" scope="row">
                  {emprendimientos.id}
                </TableCell>

                <TableCell align="right">{emprendimientos.rol_esfot }</TableCell>
                <TableCell align="right">{emprendimientos.nombre}</TableCell>
                <TableCell align="right">{ emprendimientos.descripcion}</TableCell>
                <TableCell align="right">{emprendimientos.categoria}</TableCell>
                <TableCell align="right">{emprendimientos.direccion}</TableCell>
                
              
               
                <TableCell align="right">  {emprendimientos.estado === 1? (
                  <button className="btn btn-info" onClick={() => deleteEmprendimiento(emprendimientos.id)}>Desactivar</button>
                ) : (
                  <button className="btn btn-info" onClick={() => deleteEmprendimiento(emprendimientos.id)}>Activar</button>
                )}

                <ModalEmp emprendimientos={emprendimientos} updateState={updateState} data={data} />
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
   


    </>







  );
}
export default Emprendimientos;