import React, { useContext } from "react";
import { AuthContext } from "../../contexts";
import "bootstrap/dist/css/bootstrap.min.css";

import { useState } from "react";

import ModalNewEmp from "../../components/organisms/ModalNewEmp";

import { createTheme, ThemeProvider } from "@material-ui/core/styles";

import { makeStyles } from "@material-ui/core/styles";

import { blue } from "@material-ui/core/colors";

import Footer from "../../components/footer";
import SearchComponent from "./SerchComponent";

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "20px",
    paddingRight: "20px",
    justifyContent: "center",
  },
  tableContainer: {
    marginTop: "20px",
  },
  table: {
    minWidth: 650,
  },
});

export const Emprendimientos = ({ emprendimientos }) => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const classes = useStyles();
  const darkTheme = createTheme({
    palette: {
      type: "dark",
    },
    color: {
      primary: blue,
    },
  });

  const lightTheme = createTheme({
    palette: {
      type: "light",
    },
    color: {
      primary: blue,
    },
  });

  const changeTheme = () => {
    setDarkMode(!darkMode);
  };

  const updateState = (item) => {
    const itemIndex = emprendimientos.findIndex((data) => data.id === item.id);
    const newArray = [
      // destructure all items from beginning to the indexed item
      ...data.slice(0, itemIndex),
      // add the updated item to the array
      item,
      // add the rest of the items to the array from the index after the replaced item
      ...data.slice(itemIndex + 1),
    ];
    setData(newArray);
  };

  return (
    <>
      <div
        className="h-screen w3-content w3-padding contp h-100"
        style={{ maxWidth: 1400, marginTop: 25 }}
      >
        <div className=" w3-round w3-white w3-padding-32 w3-center">
          <div className="container-fluid containerEmp">
            <h4 className="card-title">Catalogo de Emprendimientos</h4>

            <ModalNewEmp item={data} updateState={updateState} data={data} />
            <hr className="sep" />
          </div>
         

          <div className="table-responsive">
            <SearchComponent
              item={data}
              updateState={updateState}
              data={data}
            />
          </div>
        </div>
        
      </div>
      <footer>
    
          <Footer />
       
      </footer>
          </>
  );
};
export default Emprendimientos;
