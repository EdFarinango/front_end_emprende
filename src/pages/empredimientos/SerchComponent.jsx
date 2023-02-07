import React, { useState, useEffect } from "react";
import axios from "axios";

import ModalEmp from "../../components/organisms/ModalEmp";
import "./style.css";
import ModalViewEmp from "../../components/organisms/ModalView";

import alert from "sweetalert"

const SearchComponent = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const [search, setSearch] = useState("");
  const [estado1, setEstado1] = useState("");
  const [verEstado, setVerEstado] = useState(false);
  const [verModal, setVerModal] = useState(false);

  //variables para modal
  

 




 










  const searcher = (e) => {
    setSearch(e.target.value);
  };

  const del = (e) => {
    setSearch("");
  };

  const getData = async () => {
    try {
      const response = await axios
        .get(`https://backend-emprende.herokuapp.com/api/v1/emprendimiento`, {
          headers: { 'accept': "application/json", 'authorization': token },
        });
      setData(response.data.data.emprendimientos);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEmprendimiento = async (id) => {

    try {
      console.warn(id);

     alert ({
        title: "¿Estas seguro?",

        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then(async (willDelete) => {
        if (willDelete) {

           await axios.get(
            `https://backend-emprende.herokuapp.com/api/v1/emprendimiento/${id}/destroy`,
            { headers: { 'accept': 'application/json', 'authorization': token } }
          );
       await getData();
          alert("Se ha eliminado el emprendimiento", {
            icon: "success",
          });
        } else {
          alert("Se ha cancelado la eliminación");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

          
      
   

  const estadoEmprendimiento = async (id) => {
    try {
      const response = await axios
        .get(
          `https://backend-emprende.herokuapp.com/api/v1/emprendimiento/${id}/estado`,
          { headers: { accept: "application/json", authorization: token } }
        );

        await getData();
        

      //console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  };



  const updateState = (item) => {
    const itemIndex = data.findIndex(data => data.id === item.id)
    const newArray = [
      // destructure all items from beginning to the indexed item
      ...data.slice(0, itemIndex),
      // add the updated item to the array
      item,
      // add the rest of the items to the array from the index after the replaced item
      ...data.slice(itemIndex + 1)
    ]
    
    setData(newArray)
 

  }

  if (!verModal) {
    
    console.log("no se muestra");
   }
 
  


























  const dato = !search
    ? data
    : data.filter((dato) =>
        dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())
      );

  useEffect(() => {
    getData();

   

  }, []);

  //renderizamos la vista
  return (
    <div className="container-fluid">
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          {verEstado ? (
            <p
              className="nav-item nav-link active"
              id="nav-home-tab"
              data-toggle="tab"
              role="tab"
              aria-controls="nav-home"
              aria-selected="true"
              onClick={(e) => setVerEstado(false)}
            >
              Emprendimientos Aprobados
            </p>
          ) : (
            <p
              className="nav-item nav-link"
              id="nav-home-tab"
              data-toggle="tab"
              role="tab"
              aria-controls="nav-home"
              aria-selected="true"
              onClick={(e) => setVerEstado(false)}
            >
              Emprendimientos Aprobados
            </p>
          )}
          {verEstado ? (
            <p
              className="nav-item nav-link"
              id="nav-profile-tab"
              data-toggle="tab"
              role="tab"
              aria-controls="nav-profile"
              aria-selected="false"
              onClick={(e) => setVerEstado(true)}
            >
              Solicitudes
            </p>
          ) : (
            <p
              className="nav-item nav-link active"
              id="nav-profile-tab"
              data-toggle="tab"
              role="tab"
              aria-controls="nav-profile"
              aria-selected="false"
              onClick={(e) => setVerEstado(true)}
            >
              Solicitudes
            </p>
          )}
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div
          className="tab-pane fade show active"
          id="nav-home"
          role="tabpanel"
          aria-labelledby="nav-home-tab"
        >
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Emprende</h4>
                </div>
                <div className="card-content">
                  <div className="card-body card-dashboard">
                    <div className="row">
                      <div className="col-12">
                        <div className="float-right">
                          <div className="input-group mb-3">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Buscar"
                              aria-label="Buscar"
                              aria-describedby="basic-addon2"
                              value={search}
                              onChange={searcher}
                              onBlur={del}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="table-responsive">
                      {verEstado ? (
                        <table className="table table-striped table-bordered zero-configuration">
                          <thead>
                            <tr>
                              <th>Nombre</th>
                              <th>Descripcion</th>
                              <th>Estado</th>
                              <th>Estado1</th>
                              <th>Imagen</th>
                              <th>Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {dato.map(
                              (item) =>
                                item.estado1 === 0 && (
                                  <tr key1={item.id}>
                                    <td>{item.nombre}</td>
                                    <td>{item.descripcion}</td>
                                    <td>{item.estado}</td>
                                    <td>{item.estado1}</td>
                                    <td>
                                      <img
                                        src={item.image}
                                        alt=""
                                        width="100px"
                                      />
                                    </td>
                                    <td>
                                      <button
                                        className="btnactivar"
                                        onClick={() =>
                                          estadoEmprendimiento(item.id) && updateState(item)
                                        }
                                        title="Activar Solicitud"
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="16"
                                          height="16"
                                          fill="currentColor"
                                          class="bi bi-archive-fill"
                                          viewBox="0 0 16 16"
                                        >
                                          <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z" />
                                        </svg>
                                      </button>
                                      <ModalEmp
                                        emprendimientos={item}
                                        data={data}
                                        setVerModal={true}
                                        updateState={item}
                                      />
                                      <ModalViewEmp
                                        emprendimientos={item}
                                        data={data}
                                      />
                                    </td>
                                  </tr>
                                )
                            )}
                          </tbody>
                        </table>
                      ) : (
                        <table className="table table-striped table-bordered zero-configuration">
                          <thead>
                            <tr>
                              <th>Nombre</th>
                              <th>Descripcion</th>
                              <th>Estado</th>
                              <th>Estado1</th>
                              <th>Imagen</th>
                              <th>Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {dato.map(
                              (item) =>
                                item.estado1 === 1 && (
                                  <tr key2={item.id}>
                                    <td>{item.nombre}</td>
                                    <td>{item.descripcion}</td>
                                    <td>{item.estado}</td>
                                    <td>{item.estado1}</td>
                                    <td>
                                      <img
                                        src={item.image}
                                        alt=""
                                        width="100px"
                                      />
                                    </td>
                                    <td>
                                      {item.estado === 1 ? (
                                        <button
                                          className="btndesactivar"
                                          onClick={() =>
                                            deleteEmprendimiento(item.id) 
                                          }
                                       
                                          title="Desactivar"
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="bi bi-archive-fill"
                                            viewBox="0 0 16 16"
                                          >
                                            <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z" />
                                          </svg>
                                        </button>
                                      ) : (
                                        <button
                                          className="btnactivar"
                                          onClick={() =>
                                            deleteEmprendimiento(item.id) 
                                          }
                                       
                                          title="Activar"
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            class="bi bi-archive-fill"
                                            viewBox="0 0 16 16"
                                          >
                                            <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z" />
                                          </svg>
                                        </button>
                                      )}
                                      
                                      <ModalEmp
                                        emprendimientos={item}
                                        data={data}
                                      />
                                      <ModalViewEmp
                                        emprendimientos={item}
                                        data={data}
                                      />
                                    </td>
                                  </tr>
                                )
                            )}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* {verEstado ? (
        <table className="table table-striped table-bordered zero-configuration">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>Estado</th>
              <th>Estado1</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {dato.map(
              (item) =>
                item.estado1 === 0 && (
                  <tr key={item.id}>
                    <td>{item.nombre}</td>
                    <td>{item.descripcion}</td>
                    <td>{item.estado}</td>
                    <td>{item.estado1}</td>
                    <td>
                      <img src={item.image} alt="" width="100px" />
                    </td>
                    <td>
                      {" "}
                      {item.estado === 1 ? (
                        <button
                          className="btndesactivar"
                          onClick={() => deleteEmprendimiento(item.id)}
                          title="Desactivar"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-archive-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z" />
                          </svg>
                        </button>
                      ) : (
                        <button
                          className="btnactivar"
                          onClick={() => deleteEmprendimiento(item.id)}
                          title="Activar"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-archive-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z" />
                          </svg>
                        </button>
                      )}
                      <ModalEmp emprendimientos={item} data={data} />
                      <ModalViewEmp emprendimientos={item} data={data} />
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      ) : (
        <table className="table table-striped table-bordered zero-configuration">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>Estado</th>
              <th>Estado1</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {dato.map(
              (item) =>
                item.estado1 === 1 && (
                  <tr key={item.id}>
                    <td>{item.nombre}</td>
                    <td>{item.descripcion}</td>
                    <td>{item.estado}</td>
                    <td>{item.estado1}</td>
                    <td>
                      <img src={item.image} alt="" width="100px" />
                    </td>
                    <td>
                      {" "}
                      {item.estado === 1 ? (
                        <button
                          className="btndesactivar"
                          onClick={() => deleteEmprendimiento(item.id)}
                          title="Desactivar"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-archive-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z" />
                          </svg>
                        </button>
                      ) : (
                        <button
                          className="btnactivar"
                          onClick={() => deleteEmprendimiento(item.id)}
                          title="Activar"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-archive-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z" />
                          </svg>
                        </button>
                      )}
                      <ModalEmp emprendimientos={item} data={data} />
                      <ModalViewEmp emprendimientos={item} data={data} />
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      )} */}
    </div>
  );
};
export default SearchComponent;
