import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts";
import { Inicio } from "../../pages/landingPage/Inicio";
import Footer from "../footer";
import { Outlet } from "react-router-dom";

export const DashboardTemplate = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div>
        <div className="flex flex-col flex-1">
          <div className="container mx-auto px-6 py-8">
            <h3 className="text-gray-700 text-3xl font-medium">
              Panel de administración
            </h3>
            <div className="mt-4">
              <div className="flex flex-wrap -mx-6"></div>
            </div>
            <div className="mt-8">
              <div className="mt-4">
                <div className="mt-4">
                  {user.role === "superadmin" ? <Inicio /> : <Outlet />}
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="w3-container w3-theme-d3 w3-padding-16">
      <Footer />
      </footer>
      </div>

      
    </>
  );
};
