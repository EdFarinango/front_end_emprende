import React, { useEffect, useState } from "react";

import axios from "axios";

import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "react-bootstrap";

import { AuthContext } from "../../contexts/auth/AuthContext";

import ModalForm from "./ModalSu";
import ModalForm2 from "./ModalNewSu";

import "./styles.css";
import alert from "sweetalert";
import Loading from "../atoms/Loading";
import ModalPswd from "./ModalPswd";

const AdminCard = () => {
  const [admins, setAdmin] = useState([]);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);

  const [toggle, setToggle] = useState(false);

  const getAdmin = async () => {
    setLoading(false);
    try {
      const response = await axios.get(
        `https://backend-emprende.herokuapp.com/api/v1/superadmin`,
        { headers: { accept: "application/json", authorization: token } }
      );

      ///revisar  updateState(response.data.data.users)

      setAdmin(response.data.data.users);
    } catch (error) {
      console.log(error);
    }
    setLoading(true);
  };

  const deleteSuAdmin = async (id, state) => {
    if (state === 1) {
      alert({
        title: "Emprende, mensaje del servidor",
        text: "¿Está seguro que desea desactivar este usuario?",
        icon: "warning",
        buttons: ["Cancelar", "Aceptar"],
      }).then(async (willDelete) => {
        if (willDelete) {
          try {
            const response = await axios.get(
              `https://backend-emprende.herokuapp.com/api/v1/superadmin/${id}/destroy`,
              { headers: { accept: "application/json", authorization: token } }
            );
            await getAdmin().then(() => {
              if (
                response.data.message === "Usuario desactivado correctamente"
              ) {
                alert({
                  title: "Emprende, mensaje del servidor",
                  text: "El usuario ha sido desactivado correctamente",
                  icon: "success",
                  button: "Aceptar",
                });
              } else {
                alert({
                  title: "Emprende, mensaje del servidor",
                  text: "El usuario ha sido activado correctamente",
                  icon: "info",
                  button: "Aceptar",
                });
              }
            });
          } catch (error) {
            console.log(error);
          }
        } else {
          alert({
            title: "Emprende, mensaje del servidor",
            text: "El usuario no ha sido desactivado",
            icon: "info",
            button: "Aceptar",
          });
        }
      });
    } else {
      alert({
        title: "Emprende, mensaje del servidor",
        text: "¿Está seguro que desea activar este usuario?",
        icon: "warning",
        buttons: ["Cancelar", "Aceptar"],
      }).then(async (willDelete) => {
        if (willDelete) {
          try {
            const response = await axios.get(
              `https://backend-emprende.herokuapp.com/api/v1/superadmin/${id}/destroy`,
              { headers: { accept: "application/json", authorization: token } }
            );
            await getAdmin().then(() => {
              if (
                response.data.message === "Usuario desactivado correctamente"
              ) {
                alert({
                  title: "Emprende, mensaje del servidor",
                  text: "El usuario ha sido desactivado correctamente",
                  icon: "success",
                  button: "Aceptar",
                });
              } else {
                alert({
                  title: "Emprende, mensaje del servidor",
                  text: "El usuario ha sido activado correctamente",
                  icon: "info",
                  button: "Aceptar",
                });
              }
            });
          } catch (error) {
            console.log(error);
          }
        } else {
          alert({
            title: "Emprende, mensaje del servidor",
            text: "El usuario no ha sido activado",
            icon: "info",
            button: "Aceptar",
          });
        }
      });
    }
  };

  useEffect(() => {
    getAdmin();
  }, []);

  if (!loading) {
    return (<div className="container-fluid contentLoading">
    <Loading />
  </div>);
  }

  return (
    //crear un nuevo usuario

    <>
      <div className="row justify-content-center h-100">
        <div className="col-12 col-sm-8 col-lg-6">
          {/* Section Heading*/}
          <div
            className="section_heading text-center wow fadeInUp"
            data-wow-delay="0.2s"
            style={{
              visibility: "visible",
              animationDelay: "0.2s",
              animationName: "fadeInUp",
            }}
          >
            <h3>
              EnPreNde <span> Team</span>
            </h3>
            <ModalForm2 buttonLabel="Crear" type="button" />

            <p>Un equipo respaldado por el conocimiento</p>
            <div className="line" />
          </div>
        </div>
      </div>
      <div className="row">
        {admins.map((admin) => (
          <div className="col-12 col-sm-6 col-lg-3" key={admin.id}>
            <div
              className="single_advisor_profile wow fadeInUp"
              data-wow-delay="0.2s"
              style={{
                visibility: "visible",
                animationDelay: "0.2s",
                animationName: "fadeInUp",
              }}
            >
              {/* Team Thumb*/}
              <div className="advisor_thumb">
                <img src={admin.image} alt="" />
                
              
              </div>
              {/* Team Details*/}
              <div className="single_advisor_details_info">
                <h6>{admin.full_name}</h6>
                <p>{admin.email}</p>
                <p className={"designation"}>{admin.rol}</p>
                <p className={"designation"}>
                  {admin.state === 1 ? "Activo" : "Inactivo"}
                </p>
                <div className="line" />
                <div className="d-flex justify-content-center w3-padding separacion">
                {admin.id !== user.id && (
                  <Button
                    className="btnedit btn-secondary"
                    onClick={() => deleteSuAdmin(admin.id, admin.state)}
                  >
                    {" "}
                    {admin.state === 1 ? (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.62 16L11.12 17.5L14.37 14.5"
                          stroke="black"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M8.80994 2L5.18994 5.63M15.1899 2L18.8099 5.63"
                          stroke="black"
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M2 7.84998C2 5.99998 2.99 5.84998 4.22 5.84998H19.78C21.01 5.84998 22 5.99998 22 7.84998C22 9.99998 21.01 9.84998 19.78 9.84998H4.22C2.99 9.84998 2 9.99998 2 7.84998Z"
                          stroke="black"
                          stroke-width="1.5"
                        />
                        <path
                          d="M3.5 10L4.91 18.64C5.23 20.58 6 22 8.86 22H14.89C18 22 18.46 20.64 18.82 18.76L20.5 10"
                          stroke="black"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.49994 14.25C8.49994 16.17 10.0799 17.75 11.9999 17.75C13.9199 17.75 15.4999 16.17 15.4999 14.25M8.80994 2L5.18994 5.63M15.1899 2L18.8099 5.63"
                          stroke="black"
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M2 7.84998C2 5.99998 2.99 5.84998 4.22 5.84998H19.78C21.01 5.84998 22 5.99998 22 7.84998C22 9.99998 21.01 9.84998 19.78 9.84998H4.22C2.99 9.84998 2 9.99998 2 7.84998Z"
                          stroke="black"
                          stroke-width="1.5"
                        />
                        <path
                          d="M3.5 10L4.91 18.64C5.23 20.58 6 22 8.86 22H14.89C18 22 18.46 20.64 18.82 18.76L20.5 10"
                          stroke="black"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                      </svg>
                    )}
                  </Button>
                )}
              
                  {admin.id === user.id && (
                    // boton para abir el modal para cambio de contraseña
                    <ModalPswd
                      buttonLabel="Cambiar contraseña"
                      item={admin}
                      admins={admins}
                      setAdmins={setAdmin}
                      toggle={toggle}
                    />
                  )}

                  {admin.state === 1 ? (
                    <ModalForm
                      buttonLabel="Editar"
                      item={admin}
                      admins={admins}
                      setAdmins={setAdmin}
                      toggle={toggle}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminCard;
