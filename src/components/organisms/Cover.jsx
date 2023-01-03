import React from 'react';
import { Link } from 'react-router-dom'
import { ShieldIcon } from '../atoms'

export const Cover = () => {
  return (
    <>
       
          <Link to="/">
          <div className='col-md-4 col-lg-7 col-xl-6'>
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
          className='img-fluid' alt="Phone image"></img>
      </div>
            
          </Link>

       
       
      
    </>
  )
}
