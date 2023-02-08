import React, { useContext } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";
import { useState } from "react";

import { useEffect } from "react";
import "./style.css";

import "./responsive";

import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import Footer from "../../components/footer";
import FacebookIcon from "@mui/icons-material/Facebook";
import Logo from "../../components/assets/logo.png";

import { useRef } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";

export const CatalogoEmp = () => {
  //setear los hooks useState

  const [search, setSearch] = useState("");
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  
  const searcher = (e) => {
    setSearch(e.target.value);
  };
  const getData = async () => {
    try {
      const response = await axios.get(
        `https://backend-emprende.herokuapp.com/api/v1/emprendimiento`,
        { headers: { accept: "application/json", authorization: token } }
      );
      console.log(response.data.data.emprendimientos);
      setData(response.data.data.emprendimientos);
    } catch (error) {
      console.log(error);
    }
  };

  const dato = !search
    ? data
    : data.filter((dato) =>
        dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())
      );

  

  useEffect(() => {
    getData();
  }, []);
  
  return (
    <>
    
 
               <div
        className="w3-container w3-padding"
               
               >
         
           
              
             
               
       
                  <Swiper
                    cssMode={true}
                    navigation={true}
                    pagination={true}
                    mousewheel={true}
                    keyboard={true}
                    modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                   
                    
                  >





                  


                    {dato.map((item) => (
                      item.state === 1 || item.estado1 === 1 ?  (

                        <SwiperSlide>
                        <div

                          className="card"
                          style={{
                            height: "400px",
                            width: "auto",
                            margin: "auto",
                            borderRadius: "10px",
                          }}
                        >
                          <img
                            src={item.image}
                            className="card-img-top"
                            alt="..."
                            style={{ height: "250px", 
                            borderRadius: "10px",
                          
                          }}
                          />
                          <div className="card-body">
                            <h5 className="card-title">{item.nombre}</h5>
                            <p className="card-text">{item.descripcion}</p>
                            
                          </div>
                        </div>
                      </SwiperSlide>
                      ) : 
                        
                          item.length > 1 ? <h1>No hay emprendimientos</h1> : null
                        
                        
                        
                        
                        
                        
                        
                        


                    
                    ))}
                    












                  </Swiper>
                 






      
                


                
            
        
        
        </div>

 


    {/* catalodo de emprendimientos */}
    <div className="w3-content" style={{ maxWidth: 1400, marginTop: 15 }}>





                        

                           





                       


     

    

 
     
        
          <div className="w3-col">
            <div className="w3-row-padding">
              <div className="w3-col m12">
                <div className="w3-card w3-round w3-white">
                  {/* <div className="w3-container w3-padding">
                    <h6 className="w3-opacity">Emprendimientos ESFOT</h6>
                    
                    <div className="slide-container w3-card">
                    <Swiper
                      cssMode={true}
                      navigation={true}
                      pagination={true}
                      mousewheel={true}
                      keyboard={true}
                      modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                      className="mySwiper"
                    >
                      {data.map((item) => (
                        <SwiperSlide>
                          <div className="card"  style={{ height: "400px", width: "auto", margin: 5 }}                         
                            
                          >
                            <img
                              src={item.image}
                              alt="fotoEmprendimiento"
                              
                              object-fit="cover"
                            />
                            
                           <div className="sobreImagen">
                             {item.nombre}
                             <br/>

                         
                           
                           
                           
                            {item.cobertura}
                            <br/>
                            {item.categoria}
                            <br/>
                           {item.descuento} % de descuento
                           
                           </div>
                         
                           
                           
                          </div>
                          
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>

          
 


  


        
            {dato.map((item) => (
              item.estado === 1 ? (
                <div  >
                <div className="w3-container w3-card w3-white w3-round w3-margin"style={{ marginBottom : 10 }}><br />
                  <img
                    src={item.image}
                    alt="fotoEmprendimiento"
                    className="w3-left w3-circle w3-margin-right"
                    style={{ width: "60px" }}
                  />
                  <span className="w3-right w3-opacity">1 min</span>
                  <h4>{item.nombre}</h4>
                  <br />
                  <hr className="w3-clear" />
                  <p>{item.descripcion}</p>
                  <div className="w3-row-padding" style={{ margin: 0 }}>
                    <div className="w3-half">
                      <img
                        src={item.image}
                        style={{ width: "100%", height: "100%" }}
                        alt="fotoEmprendimiento"
                      />
                    </div>
                    <div className="w3-half">
                      <img
                        src={item.image}
                        style={{ width: "100%", height: "100%" }}
                        alt="fotoEmprendimiento"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    className="w3-button w3-theme-d1 w3-margin-bottom"
                  >
                    <i className="fa fa-thumbs-up" /> Like
                  </button>
                  <button
                    type="button"
                    className="w3-button w3-theme-d2 w3-margin-bottom"
                  >
                    <i className="fa fa-comment" /> Comment
                  </button>
                </div>
                </div>

              
              ) : (
               
                dato.length < 0 ? (
                  <div className="w3-container w3-card w3-white w3-round w3-margin"style={{ marginBottom : 10 }}><br />
                  <img
                    src={item.image}
                    alt="fotoEmprendimiento"
                    className="w3-left w3-circle w3-margin-right"
                    style={{ width: "60px" }}
                  />
                  </div>
                ) : (
                  <div>


                  </div>
                )
                                
                              
                              
              )
              
            ))
            
            }
            {
              dato.length < 0 ? (
                <div className="w3-container w3-card w3-white w3-round w3-margin"style={{ marginBottom : 10 }}><br />
                <img
                  src={Logo}
                  alt="fotoEmprendimiento"
                  className="w3-left w3-circle w3-margin-right"
                  style={{ width: "60px" }}
                />
                </div>
              ) : (
                <div>
                  </div>
              )


            }



           





          </div>
          
          
          {/* <div className="w3-col ">
            <img src={Logo} alt="Avatar" style={{ width: "100%" }} />

            <br />

            <br />
            <div className="w3-card w3-round w3-white w3-padding-16 w3-center">
              <p>ADS</p>
            </div>
            <br />
            <div className="w3-card w3-round w3-white w3-padding-32 w3-center">
              <p>
                <i className="fa fa-bug w3-xxlarge" />
              </p>
            </div>
       
          </div> */}
     
       

       
   
      <br />
 
      <footer className="w3-container w3-theme-d3 w3-padding-16">
        <Footer />
      </footer>
      <script src="https://www.w3schools.com/lib/w3.js" />
      <script src="https://www.w3schools.com/lib/w3data.js" />
      <script src="https://www.w3schools.com/lib/w3color.js" />
      <script src="https://www.w3schools.com/lib/w3codecolor.js" />
      <script src="https://www.w3schools.com/lib/w3colorpicker.js" />
      <script src="https://www.w3schools.com/lib/w3cssmenu.js" />
      <script src="https://www.w3schools.com/lib/w3cssfilter.js" /> 
      </div>
    </>
  );
};

export default CatalogoEmp;
