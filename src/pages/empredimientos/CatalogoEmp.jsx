



import React, { useContext } from 'react';
import { AuthContext } from '../../contexts';
import 'bootstrap/dist/css/bootstrap.min.css';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import axios from 'axios';
import { useState } from 'react';

import { useEffect } from 'react';
import './style.css';

import IMG from '../../components/assets/canoaBar.png';

import './responsive';
import { Link } from '@material-ui/core';
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';
import Footer from '../../components/footer';
import FacebookIcon from '@mui/icons-material/Facebook';
import Logo from '../../components/assets/logo.png';
import NavBar from '../../components/NavBar/NavBar';









export const CatalogoEmp = () => {


  //setear los hooks useState

  const [search, setSearch] = useState("")

  //función para traer los datos de la API



  //función de búsqueda
  const searcher = (e) => {
    setSearch(e.target.value)
  }
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




  const token = localStorage.getItem('token');
  const [data, setData] = useState([]);





  const getData = async () => {

    try {
      const response = await axios.get(
        `https://backend-emprende.herokuapp.com/api/v1/emprendimiento`,
        { headers: { 'accept': 'application/json', 'authorization': token } }
      );
      console.log(response.data.data.emprendimientos);
      setData(response.data.data.emprendimientos)

    } catch (error) {
      console.log(error);
    }
  }
  const dato = !search ? data : data.filter((dato) => dato.nombre.toLowerCase().includes(search.toLocaleLowerCase()))









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

                    <div class="input-group rounded">





                    </div>
                    <Slide autoplay={false}>
                      {data.map((item) => (


                        <div className="each-slide-effect">
                          <div
                            style={{
                              backgroundImage: `url(${item.image})`,
                            }}
                          >
                            <span className="w3-right w3-opacity-2">
                              {item.nombre}
                            </span>





                          </div>






                        </div>

                      ))}
                    </Slide>

                  </div>
                </div>
              </div>
            </div>

            <input value={search} onChange={searcher} type="text" placeholder='Search' className='form-control search' />


            {dato.map((item) => (
              <div >

                <div className="w3-container w3-card w3-white w3-round w3-margin"><br />
                  <img src="https://www.w3schools.com/w3images/avatar2.png" alt="Avatar" className="w3-left w3-circle w3-margin-right" style={{ width: '60px' }} />
                  <span className="w3-right w3-opacity">1 min</span>
                  <h4>{item.nombre}</h4><br />
                  <hr className="w3-clear" />

                  <div className="w3-row-padding" style={{ margin: '0 -16px' }}>
                    <div className="w3-half">
                      <p className="w3-opacity">Descripcion</p>
                      <p>{item.descripcion}</p>
                    </div>
                    <div className="w3-half">

                      <img src={item.image}
                        style={{ width: '100%', height: '100%' }} alt="Northern Lights" className="w3-margin-bottom" />




                    </div>
                  </div>
                  <a className="btn text-white btn-floating m-1" style={{ backgroundColor: '#4c4c4c' }} href="https://www.facebook.com/" target="_blank" role="button"><i /><FacebookIcon></FacebookIcon></a>
                  <a className="btn text-white btn-floating m-1" style={{ backgroundColor: '#4c4c4c' }} href="https://www.instagram.com/" target="_blank" role="button"><i /><FacebookIcon></FacebookIcon></a>
                  <a className="btn text-white btn-floating m-1" style={{ backgroundColor: '#4c4c4c' }} href="https://twitter.com/" target="_blank" role="button"><i /><FacebookIcon></FacebookIcon></a>






                </div>

              </div>

            ))}



            {/* <!-- End Middle Column --> */}
          </div>
          {/* <!-- Right Column --> */}
          <div className="w3-col">



            <img src={Logo} alt="Avatar" style={{ width: '100%' }} />



            <br />

            <br />
            <div className="w3-card w3-round w3-white w3-padding-16 w3-center">
              <p>ADS</p>
            </div>
            <br />
            <div className="w3-card w3-round w3-white w3-padding-32 w3-center">
              <p><i className="fa fa-bug w3-xxlarge" /></p>
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










  )

}

export default CatalogoEmp;

