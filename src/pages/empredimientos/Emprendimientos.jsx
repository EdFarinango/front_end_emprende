


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
import { Link } from 'react-router-dom';
import Footer from '../../components/footer';
import SearchComponent from './SerchComponent';

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

export const Emprendimientos = ({ emprendimientos }) => {
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
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Catalogo de Emprendimientos</h4>
                <div className="table-responsive">
                  <div className="container-fluid">
                    <h2 className='text-center'>Buscador</h2>
                    <SearchComponent />
                  </div>


                </div>
              </div>
            </div>
          </div>
        </div>

      </div>





      {/* 


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

                  <TableCell align="right">{emprendimientos.rol_esfot}</TableCell>
                  <TableCell align="right">{emprendimientos.nombre}</TableCell>
                  <TableCell align="right">{emprendimientos.descripcion}</TableCell>
                  <TableCell align="right">{emprendimientos.categoria}</TableCell>
                  <TableCell align="right">{emprendimientos.direccion}</TableCell>



                  <TableCell align="right">  {emprendimientos.estado === 1 ? (
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
      </ThemeProvider> */}
      <footer className="w3-container w3-theme-d3 w3-padding-16">
        <Footer />
      </footer>


    </>







  );
}
export default Emprendimientos;