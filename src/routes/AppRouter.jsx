import React from 'react'
import { Routes, Route} from 'react-router-dom';

import { Login, App } from '../pages';
import { AuthTemplate } from '../components';
import { AuthProvider } from "../contexts";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { DashboardTemplate } from '../components/templates/DashboardTemplate';
import { Recovery } from '../pages/auth/recovery';

import NavBar from '../components/NavBar/NavBar';
import { Inicio} from '../pages/landingPage/Inicio';

import { Perfil } from '../pages/users/admin/perfil';
import { Emprendimientos } from '../pages/empredimientos/Emprendimientos';






export const AppRouter = () => {
    return (
        <AuthProvider>
            <NavBar />
      
            <Routes>
                
            < Route path='*' element={<h1>404: Especifique una ruta correctamente</h1>} />
            <Route path='/' element={<Inicio />} />
                <Route path='login/*' element={
                    
                    <PublicRoute>
                    
                        <Routes>
                            <Route element={<AuthTemplate />}>
                                <Route path='/*' element={<Login />} />
                              
                            </Route>
                            
                        </Routes>
                    </PublicRoute>
                } />

                <Route element={<AuthTemplate />}>
                <Route path='/recovery/*' element={<Recovery />} /> 
                
               
                </Route>

                
                
                
                                        <Route path='/administracion/*'  element={
                    <PrivateRoute>
                        <Routes>
                          
                                <Route element={<DashboardTemplate />}>
                                    <Route path='/*' element={<App />} />
                                    <Route path='/users' element={<Perfil />} />

                                  
                                    

                                    
                                </Route>
                        </Routes>
                    </PrivateRoute>
                } />
                <Route path='/users/*' element={
                    <PrivateRoute>
                        <Routes>
                            <Route element={<DashboardTemplate />}>
                                <Route path='/*' element={<Perfil />} />
                            </Route>
                            <Route element={<Emprendimientos />}
                          
                            >
                                <Route path='/emprendimientos' element={<Emprendimientos />} 
                              
                                
                                />
                            </Route>

                            </Routes>
                    </PrivateRoute>
                } />



             



                



            </Routes>
        </AuthProvider >
    )
      
}
