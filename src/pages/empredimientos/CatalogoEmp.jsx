



import React, { useContext } from 'react';
import { AuthContext } from '../../contexts';
import 'bootstrap/dist/css/bootstrap.min.css';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import axios from 'axios';
import { useState } from 'react';

import { useEffect } from 'react';



import styled from "styled-components";

import IMG from '../../components/assets/canoaBar.png';

import  './responsive';



const Container = styled.div`
marginTop: 2,

  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
    @media (max-width: 380px) {
    height: 100%;
    width: 100%;
    display: flex;
    position: relative;
    overflow: hidden;
    }
`;
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
  transition: all 1.5s ease;
`;

const Slide = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #${(props) => props.bg};
`;


const ImageContainer = styled.div`
  flex: 1;
  height: 100%;
 
`;


const Image = styled.img`
  height: 80%;
  width: auto;
  @media (max-width: 380px) {
    height: 50%;
  width: auto;
    position: absolute;
    opacity: 0.5;
    }
`;

const InfoContainer = styled.div`
  flex: 2;
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 70px;
  @media (max-width: 380px) {
    font-size:20px;
    position: absolute;
    
    }
`;
const Description = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
    @media (max-width: 380px) {
    font-size:10px;
    position: absolute;
   
 
    }
  
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.3em;
  font-size: 1rem;
  background-color: transparent;
  cursor: pointer;
  /* border: none; */
 
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  opacity: 0.7;
  cursor: pointer;
  z-index: 2;
`;




export const CatalogoEmp = () => {

    const { user } = useContext(AuthContext);
    const token = localStorage.getItem('token');
    const [data, setData] = useState([]);
    const [panels, setPanels] = useState([0, 1, 2, 3, 4]);
    const [slideIndex, setSlideIndex] = React.useState(0);
    const handleClick = (direction) => {
      if (direction === "left") {
        setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
      } else if (direction === "right") {
        setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
      } else {
        console.log("error");
      }
    };


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

    

    useEffect(() => {
        getData();
      }, []);

return (
    <>
    

<Container   >
     <Arrow direction="left" onClick={() => handleClick("left")}>
        <KeyboardArrowLeftIcon />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {data.map((item) =>
         
        <Slide bg="f5fafd" key={item.id}>
          <ImageContainer>
            <Image src={IMG} />
          </ImageContainer>
          <InfoContainer>
            
            <Title>{item.nombre}</Title>

            <Description>{item.descripcion}</Description>
            <Button>Ver mas</Button>
          </InfoContainer>
        </Slide>
        )}

      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <KeyboardArrowRightIcon />
       
      </Arrow>
    </Container>
 
    

    
        <div className="container">
        
            <div className="row">   
                <div className="col-12">
                    <h1 className="text-center">Catalogo de Emprendimientos</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12">
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Nombre</th>
                                                    <th scope="col">Descripcion</th>
                                                    <th scope="col">Categoria</th>
                                                   
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    data.map((item) => (
                                                        <tr key={item.id}>
                                                            <td>{item.nombre}</td>
                                                            <td>{item.descripcion}</td>
                                                            <td>{item.categoria}</td>
                                                            
                                                            
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    
    
        
        
        </>
)

}

export default CatalogoEmp;

