// import Login from './Login';

// describe('Login', () => {
//   describe('Login', () => {
//     it('should render', () => {
//         const result = <Login/>;
//         expect(result).toMatchSnapshot();
      
//     });
//     });
//     });

    

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Login from './Login';
import { Routes } from 'react-router-dom';
import { renderHook } from '@testing-library/react';
import { ContentCutOutlined } from '@mui/icons-material';


let loginResult;

describe('Render Login', () => {
    describe('Login', () => {

     
        it('should render', () => {
         
            const result = <Login/>;
            expect(result).toBeTruthy();
            console.log(<Login/>);

      
          
        });
        
    });
});




  


   


    



