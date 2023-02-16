import React, { useState, useEffect } from "react";

import axios from "axios";

import ModalEmp from "../../components/organisms/ModalEmp";
import "./style.css";
import ModalViewEmp from "../../components/organisms/ModalView";

import alert from "sweetalert";

import Loading from "../../components/atoms/Loading";

const SearchComponent = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const [search, setSearch] = useState("");
  const [estado1, setEstado1] = useState("");
  const [verEstado, setVerEstado] = useState(false);
  const [verModal, setVerModal] = useState(false);
  const [pendientes, setPendientes] = useState(0);
  const [loading, setLoading] = useState(false);

  //variables para modal

  const searcher = (e) => {
    setSearch(e.target.value);
  };

  const del = (e) => {
    setSearch("");
  };

  const getData = async () => {
    setLoading(false);
    try {
      const response = await axios.get(
        `https://backend-emprende.herokuapp.com/api/v1/emprendimiento`,
        {
          headers: { accept: "application/json", authorization: token },
        }


      );
      //console.log("ss", response);
      let peticionesPendientes = 0;
      setData(response.data.data.emprendimientos);
      for (let i = 0; i < response.data.data.emprendimientos.length; i++) {
        if (response.data.data.emprendimientos[i].estado1 === 0) {
          peticionesPendientes = peticionesPendientes + 1;
        }
      }
      setPendientes(peticionesPendientes);
      setLoading(true);
    } catch (error) {
      //console.log("gagagaga",error);
    }
  };

  const deleteEmprendimiento = async (id, estado) => {
    if (estado === 1) {
      try {
        console.warn(id);

        alert({
          title:
            "¿Estas seguro, se desactivara el empredimiento y no se visualizara en el catálogo?",

          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then(async (willDelete) => {
          if (willDelete) {
            await axios.get(
              `https://backend-emprende.herokuapp.com/api/v1/emprendimiento/${id}/destroy`,
              { headers: { accept: "application/json", authorization: token } }
            );
            await getData();
            alert("Se ha desactivado el emprendimiento", {
              icon: "success",
            });
          } else {
            alert("Se ha cancelado la eliminación");
          }
        });
      } catch (error) {
        //console.log("este",error);
      }
    } else {
      try {
        console.warn(id);

        alert({
          title:
            "¿Estas seguro, el emprendimiento va a ser activado y se  visualizara en el catálogo?",

          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then(async (willDelete) => {
          if (willDelete) {
            await axios.get(
              `https://backend-emprende.herokuapp.com/api/v1/emprendimiento/${id}/destroy`,
              { headers: { accept: "application/json", authorization: token } }
            );
            await getData();
            alert("Se ha activado correctamente el emprendimiento", {
              icon: "success",
            });
          } else {
            alert("Se ha cancelado la activación");
          }
        });
      } catch (error) {
        //console.log("sssdfcxx",error);
      }
    }
  };

  const estadoEmprendimiento = async (id) => {
    try {
      alert({
        title: "¿Estas seguro de aprobar esta solicitud?",
        text: "El emprendimiento no podra regresar a este estado",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          await axios.get(
            `https://backend-emprende.herokuapp.com/api/v1/emprendimiento/${id}/estado`,
            { headers: { accept: "application/json", authorization: token } }
          );
          getData();
          alert(
            "El emprendimiento ha sido autorizado, debe activarlo para que sea visible en el catálogo",
            {
              icon: "success",
            }
          );
        } else {
          alert("No se ha realizado ningun cambio");
        }
      });
    } catch (error) {
      //
    }
  };

  const updateState = (item) => {
    const itemIndex = data.findIndex((data) => data.id === item.id);
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

  const dato = !search
    ? data
    : data.filter((dato) =>
      dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())
    );

  useEffect(() => {

    //virificar si tiene un token activo 
    if (!token) {
      window.location.href = "/login";
    } else if (token) {

      getData();
    }
  }, []);

  if (!loading) {
    return (
      <div className="container-fluid contentLoading">
        <Loading />
      </div>
    );
  }

  return (
    <div className="container-fluid contentTable">
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          {verEstado ? (
            <div
              className="nav-item nav-link"
              id="nav-home-tab"
              data-toggle="tab"
              role="tab"
              aria-controls="nav-home"
              aria-selected="true"
              onClick={(e) => setVerEstado(false)}
            >
              <p>Emprendimientos Aprobados</p>
            </div>
          ) : (
            <div
              className="nav-item nav-link cli active"
              data-toggle="tab"
              role="tab"
              aria-controls="nav-home"
              aria-selected="true"
              onClick={(e) => setVerEstado(false)}
            >
              <p>Emprendimientos Aprobados</p>
            </div>
          )}
          {verEstado ? (
            <div
              className="nav-item nav-link active"
              id="nav-profile-tab"
              data-toggle="tab"
              role="tab"
              aria-controls="nav-profile"
              onClick={(e) => setVerEstado(true)}
            >
              <p>
                Solicitudes
                {pendientes > 0 ? (
                  <span className="badge badge-pill badge-danger spanRed">
                    {pendientes}
                  </span>
                ) : (
                  <span className="badge badge-pill badge-danger spanGreen">
                    {pendientes}
                  </span>
                )}
              </p>
            </div>
          ) : (
            <div
              className="nav-item nav-link"
              id="nav-profile-tab"
              data-toggle="tab"
              role="tab"
              aria-controls="nav-profile"
              aria-selected="false"
              onClick={(e) => setVerEstado(true)}
            >
              <p>
                Solicitudes
                {pendientes > 0 ? (
                  <span className="badge badge-pill badge-danger spanRed">
                    {pendientes}
                  </span>
                ) : (
                  <span className="badge badge-pill badge-danger spanGreen">
                    {pendientes}
                  </span>
                )}
              </p>
            </div>
          )}
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div
          className="tab-pane fade show active "
          id="nav-home"
          role="tabpanel"
          aria-labelledby="nav-home-tab"
        >
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Emprendimientos</h4>
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
                              <th>Categoria</th>
                              <th>Nombre</th>
                              <th>Descripcion</th>

                              <th>Imagen</th>
                              <th>Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {dato.map(
                              (item) =>
                                item.estado1 === 0 && (
                                  <tr key1={item.id}>
                                    <td>{item.categoria}</td>
                                    <td>{item.nombre}</td>
                                    <td>{item.descripcion}</td>

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
                                          estadoEmprendimiento(item.id)
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
                              <th>Categoria</th>
                              <th>Nombre</th>
                              <th>Descripcion</th>

                              <th>Imagen</th>
                              <th>Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {dato.map(
                              (item) =>
                                item.estado1 === 1 && (
                                  <tr key2={item.id}>
                                    <td>{item.categoria}</td>
                                    <td>{item.nombre}</td>
                                    <td>{item.descripcion}</td>

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
                                            deleteEmprendimiento(
                                              item.id,
                                              item.estado
                                            )
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

    </div>
  );
};
export default SearchComponent;
