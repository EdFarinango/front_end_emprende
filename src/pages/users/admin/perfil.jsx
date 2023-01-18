import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { useContext } from 'react';
import { Link, Outlet,  useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts';
import AdminCard from '../../../components/organisms/AdminCard';
import AdminsCard from '../../../components/organisms/AdminsCard';
import Footer from '../../../components/footer';


export const Perfil= () => {
 

  return (
    <div>
     
      
 
      
      <h1 className='text-4xl font-bold'>Administradores</h1>
      <AdminsCard />
      <footer className="w3-container w3-theme-d3 w3-padding-16">
  <Footer />
  </footer>
      
    </div>


    

          




          
  );
}
