import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import './styles.css';
import { Box, Typography } from '@mui/material';



function Footer() {
  return (
    <>
<footer className='footerLand'>
          <Typography variant="h6" align="center" gutterBottom>
           Comunidad Emprende ESFOT
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
            
            <div className='socialMedia'>
            <a href="https://www.facebook.com/emprende.esfot" target="_blank" rel="noreferrer">
    <FacebookIcon />
  </a>
            
            <div className='mapa'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7913376228116!2d-78.49234128552739!3d-0.21071923501412979!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59a1075e0872b%3A0x44b1552c38388024!2sESFOT%20EPN%2C%20Toledo%2C%20Quito%20170143!5e0!3m2!1ses!2sec!4v1675908176114!5m2!1ses!2sec"  width={400} height={200} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"/>
            </div>
            </div>
          </Typography>
          <Box sx={{ mt: 5 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
            >
             
            </Typography>

            <Typography variant="body2" color="text.secondary" align="right">

            
            </Typography>


     
         
      
          
        
        </Box>
        </footer>

</>



   
  );
}

export default Footer;