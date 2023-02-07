import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import './styles.css';
import { Box, Typography } from '@mui/material';



function Footer() {
  return (
    <>
<footer>
          <Typography variant="h6" align="center" gutterBottom>
            Footer
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
            Something here to give the footer a purpose!
          </Typography>
          <Box sx={{ mt: 5 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
            ></Typography>
          </Box>
        </footer>

</>

   
  );
}

export default Footer;