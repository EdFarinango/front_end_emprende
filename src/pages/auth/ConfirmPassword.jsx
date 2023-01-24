

import React, { useState } from 'react';
import axios from 'axios';
import { Label, Button } from '../../components';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ContrastRounded } from '@mui/icons-material';

export const ConfirmPassword = () => {
  const navigate = useNavigate();
  const [token, settoken] = useState("");
  const [activo, setactivo] = useState(false);
  const [Mensajeactivo, setMensajeactivo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setpassword_confirmation] = useState("");
  const [shown, setShown] = React.useState(false);

  const switchShown = () => setShown(!shown);

    useEffect(() => {
      let cadenatoken1 = window.location.href.split("token=")[1];
      cadenatoken1.split("&");
      settoken(cadenatoken1.split("&")[0]);
      setEmail(window.location.href.split("email=")[1]);


       

     }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      token: token,
      email: email,
      password: password,
      password_confirmation: password_confirmation,
    };
    try {
      const response = await axios.post(
        "https://backend-emprende.herokuapp.com/api/v1/reset-password",
        data
      );
      console.log(response.data);
      setMensajeactivo(response.data.message);
      setactivo(true);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.log(error);
      console.log(error);
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h3 className="text-center">Cambiar Contraseña</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <Label htmlFor="password">Contraseña</Label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Contraseña"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <Label htmlFor="password_confirmation">
                    Confirmar Contraseña
                  </Label>
                  <input
                    type="password"
                    className="form-control"
                    id="password_confirmation"
                    name="password_confirmation"
                    placeholder="Confirmar Contraseña"
                    onChange={(e) => setpassword_confirmation(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <Button type="submit" className="btn btn-primary">
                    Cambiar Contraseña
                  </Button>
                </div>
              </form>
              {activo ? (
                <div className="alert alert-success" role="alert">
                  {Mensajeactivo}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

