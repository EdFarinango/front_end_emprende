import React from "react";
import { Routes, Route } from "react-router-dom";

import { Login, App } from "../pages";
import { AuthTemplate } from "../components";
import { AuthProvider } from "../contexts";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { DashboardTemplate } from "../components/templates/DashboardTemplate";

import NavBar from "../components/NavBar/NavBar";
import { Inicio } from "../pages/landingPage/Inicio";

import { Perfil } from "../pages/users/admin/perfil";
import { Emprendimientos } from "../pages/empredimientos/Emprendimientos";

import CatalogoEmp from "../pages/empredimientos/CatalogoEmp";
import DashboardUsers from "../components/templates/DashboardUsers";
import AdminCard from "../components/organisms/AdminCard";
import AdminsCard from "../components/organisms/AdminsCard";
import Repositorio from "../pages/video/Repositorio";
import Comision from "../pages/comision/Emprende";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { ConfirmPassword } from "../pages/auth/ConfirmPassword";
import { AuthRecovery } from "../components/templates/AuthRecovery";

//import EditFormNew from '../components/templates/FormNewSu';

export const AppRouter = () => {
  return (
    <AuthProvider>
      <NavBar />

      <Routes>
        <Route path="/catalogo" element={<CatalogoEmp />} />
        <Route path="/comision" element={<Comision />} />
        <Route path="/repositorio" element={<Repositorio />} />
        <Route
          path="/404"
          element={
            <h1>
              Error por parte del servidor, contactese con el administrador
            </h1>
          }
        />
        <Route
          path="*"
          element={<h1>404: Especifique una ruta correctamente</h1>}
        />

        <Route path="/" element={<Inicio />} />
        <Route
          path="login/*"
          element={
            <PublicRoute>
              <Routes>
                <Route element={<AuthTemplate />}>
                  <Route path="/*" element={<Login />} />
                </Route>
              </Routes>
            </PublicRoute>
          }
        />

        <Route element={<AuthRecovery />}>
          <Route path="/emprende" element={
          <ConfirmPassword />} />
          <Route> 
            <Route path="/emprende/*" element={<Login />} />
          </Route>
        </Route>

        <Route
          path="/administracion/*"
          element={
            <PrivateRoute>
              <Routes>
                <Route element={<DashboardTemplate />}>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/panel" element={<DashboardUsers />} />
                  <Route path="/admin" element={<AdminsCard />} />
                  <Route path="/super" element={<AdminCard />} />
                  <Route path="/users" element={<Perfil />} />
                  {/* <Route path='/form' element={<EditFormNew/>} /> */}
                </Route>
              </Routes>
            </PrivateRoute>
          }
        />
        <Route
          path="/users/*"
          element={
            <PrivateRoute>
              <Routes>
                <Route element={<DashboardTemplate />}>
                  <Route path="/*" element={<Perfil />} />
                </Route>
                <Route element={<Emprendimientos />}>
                  <Route
                    path="/emprendimientos"
                    element={<Emprendimientos />}
                  />
                </Route>
              </Routes>
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
};
