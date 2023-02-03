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

  //función para traer los datos de la API

  //función de búsqueda
  const searcher = (e) => {
    setSearch(e.target.value);
  };
  //metodo de filtrado 1
  /*  let results = []
  if(!search)
  {
      results = users
  }else{
       results = users.filter( (dato) =>
       dato.name.toLowerCase().includes(search.toLocaleLowerCase())
   )
  } */

  //metodo de filtrado 2

  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);

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

  const images = [
    "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
    "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  ];

  useEffect(() => {
    getData();
  }, []);
  
  return (
    <>
    

      <div className="w3-content" style={{ maxWidth: 1400, marginTop: 15 }}>
     
        <div className="w3-row">
          {/* <!-- Middle Column --> */}
          <div className="w3-col">
            <div className="w3-row-padding">
              <div className="w3-col m12">
                <div className="w3-card w3-round w3-white">
                  <div className="w3-container w3-padding">
                    <h6 className="w3-opacity">Emprendimientos ESFOT</h6>
                    <input
              value={search}
              onChange={searcher}
            
           
              className="search"
            />
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
                  </div>
                </div>
              </div>
            </div>

          
 <div className="box">
  <div className="container-2">
    <span className="icon"><i className="fa fa-search" /></span>
    <input type="search"   value={search} id="search" placeholder="Buscar..." />
  </div>
</div>

  



            {dato.map((item) => (
              <div>
                <div className="w3-container w3-card w3-white w3-round w3-margin">
                  <br />
                  <img
                    src="https://www.w3schools.com/w3images/avatar2.png"
                    alt="Avatar"
                    className="w3-left w3-circle w3-margin-right"
                    style={{ width: "60px" }}
                  />
              
                  <h4>{item.nombre}</h4>
                  <br />
                  <hr className="w3-clear" />

                  <div className="w3-row-padding" style={{ margin: "0 -16px" }}>
                    <div className="w3-half">
                      <p className="w3-opacity desc">Descripcion</p>
                      <p>{item.descripcion}</p>
                      <p className="w3-opacity">Contacto</p>
                      <p>{item.whatsapp}</p>
                      <p className="w3-opacity">Cobertura</p>
                      <p>{item.cobertura}</p>
                      <p className="w3-opacity">Categoria</p>
                      <p>{item.categoria}</p>
                      <p className="w3-opacity">Descuento</p>
                      <p>{item.descuento}</p>
                    </div>
                    <div>
                      <img
                        src={item.image}
                        style={{ width: "400px", height: "auto", borderRadius: "10px", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)" }}
                        alt="Northern Lights"
                        className="w3-margin-bottom"
                      />
                      
                    </div>
                  </div>
                  <a
                    className="btn text-white btn-floating m-1"
                    style={{ backgroundColor: "#4c4c4c" }}
                    href="https://www.facebook.com/"
                    target="_blank"
                    role="button"
                  >
                    <i />
                    <FacebookIcon></FacebookIcon>
                  </a>
                  <a
                    className="btn text-white btn-floating m-1"
                    style={{ backgroundColor: "#4c4c4c" }}
                    href="https://www.instagram.com/"
                    target="_blank"
                    role="button"
                  >
                    <i />
                    <FacebookIcon></FacebookIcon>
                  </a>
                  <a
                    className="btn text-white btn-floating m-1"
                    style={{ backgroundColor: "#4c4c4c" }}
                    href="https://twitter.com/"
                    target="_blank"
                    role="button"
                  >
                    <i />
                    <FacebookIcon></FacebookIcon>
                  </a>
                </div>
              </div>
            ))}

            {/* <!-- End Middle Column --> */}
          </div>
          {/* <!-- Right Column --> */}
          <div className="w3-col">
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
            {/* <!-- End Right Column --> */}
          </div>
          {/* <!-- End Grid --> */}
        </div>
        {/* <!-- End Page Container --> */}
      </div>
      <br />
      {/* <!-- Footer --> */}
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
    </>
  );
};

export default CatalogoEmp;
