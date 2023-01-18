import React from 'react'
import ReactPlayer from 'react-player/youtube'
import Card from 'react-bootstrap/Card';

 






import { Row} from 'react-bootstrap';




import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';


import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';


import Cards from './Card';


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const cards = [1, 2, 3];


const videos = [
  {
    id: 1,
    title: 'Conferencia1_TASA',
    description: 'Econonomía circular dentro del pryecto CUERO 360°, Ciclos conscientes.',
    url: 'https://youtu.be/pA7tv-D8a3s',

  },
  {
    id: 2,
    title: 'Conferencia2_TASA',
    description: 'Econonomía circular dentro del pryecto CUERO 360°, Ciclos conscientes.',
    url: 'https://fb.watch/i54UezKUru/',
  },

  {
    id: 3,
    title: 'Conferencia3_TASA',
    description: 'Econonomía circular dentro del pryecto CUERO 360°, Ciclos conscientes.',
    url: 'https://youtu.be/pA7tv-D8a3s',
  },

  {
    id: 4,
    title: 'Conferencia4_TASA',
    description: 'Econonomía circular dentro del pryecto CUERO 360°, Ciclos conscientes.',
    url: 'https://youtu.be/pA7tv-D8a3s',
  },
];


const theme = createTheme();
const Repositorio = () => {
  
    return (


 

      <ThemeProvider theme={theme}>
      

    
        <CssBaseline />
        <main>
          {/* Hero unit */}
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Conferencias Emprendimientos ESFOT
              </Typography>
              <Typography variant="h5" align="center" color="text.secondary" paragraph>
                Repositorio de conferencias de emprendimientos de la ESFOT
              </Typography>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}

                justifyContent="center"
              >
                <Button variant="contained">Conferencias</Button>
                <Button variant="outlined">Talleres</Button>
              </Stack>
            </Container>
          </Box>
          <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {videos.map((video) => (
                <Grid item key={video} xs={12} sm={6} md={4}>
                  <Cards video={video} />
                </Grid>
              ))}
            </Grid>
          </Container>
          
            </main>


</ThemeProvider>

     

// <ThemeProvider theme={theme}>
// <CssBaseline />
// <main>

//   {/* Hero unit */}
//   <Box
//           sx={{
//             bgcolor: 'background.paper',
//             pt: 8,
//             pb: 6,
//           }}
//         >
//           <Container maxWidth="sm">
//             <Typography
//               component="h1"
//               variant="h2"
//               align="center"
//               color="text.primary"
//               gutterBottom
//             > 

//               Conferencias Emprendimientos ESFOT
//             </Typography>

          
    




            

//             <Typography variant="h5" align="center" color="text.secondary" paragraph>
//               Repositorio de conferencias de emprendimientos de la ESFOT

//             </Typography>
//             <Stack
//               sx={{ pt: 4 }}
//               direction="row"
//               spacing={2}
//               justifyContent="center"
//             >

// </Stack>
//           </Container>
//         </Box>

//   <Container sx={{ py: 8 }} maxWidth="md">
//     {/* End hero unit */}
//     <Grid container spacing={4}>


            

//         <Row className='mt-2 d-flex justify-content-between '>
    
     
       


//         <Card style={{ width: '18rem', height: 'auto'  }} >
//         <div>
//         <ReactPlayer
//         url='https://fb.watch/i54UezKUru/'
//         width='100%'
//         height='100%'
//         controls
//         />
//         </div>

          
        
         
//         <CardContent sx={{ flexGrow: 1 }}>
//         <Typography gutterBottom variant="h5" component="h2">
//                       Conferencia1_TASA
//                     </Typography>
//                     <Typography>
//                     Econonomía circular dentro del pryecto CUERO 360°, Ciclos conscientes.
//                     </Typography>
//                   </CardContent>
//                   <CardActions>
//                     ver video 


//                     <Button size="small">Edit</Button>
//                   </CardActions>
//         </Card>


   










//         <Card style={{ width: '18rem', height: 'auto' }} >
//         <div>
//         <ReactPlayer
//         url='https://youtu.be/pA7tv-D8a3s'
//         width='100%'
//         height='100%'
//         controls
//         />
//         </div>

//         <CardContent sx={{ flexGrow: 1 }}>
//         <Typography gutterBottom variant="h5" component="h2">
//                       Conferencia1_TASA
//                     </Typography>
//                     <Typography>
//                     Econonomía circular dentro del pryecto CUERO 360°, Ciclos conscientes.
//                     </Typography>
//                   </CardContent>
//                   <CardActions>
//                     ver video 


//                     <Button size="small">Edit</Button>
//                   </CardActions>
//         </Card>



//         <Card style={{ width: '18rem' }} >
//         <div>
//         <ReactPlayer
//         url='https://youtu.be/pA7tv-D8a3s'
//         width='100%'
//         height='100%'
//         controls
//         />
//         </div>

//         <CardContent sx={{ flexGrow: 1 }}>
//         <Typography gutterBottom variant="h5" component="h2">
//                       Conferencia1_TASA
//                     </Typography>
//                     <Typography>
//                     Econonomía circular dentro del pryecto CUERO 360°, Ciclos conscientes.
//                     </Typography>
//                   </CardContent>
//                   <CardActions>
//                     ver video 


//                     <Button size="small">Edit</Button>
//                   </CardActions>
//         </Card>


        





// </Row>
// </Grid>
// </Container>

    


            
// </main>
//             </ThemeProvider>
       
 )
}

export default Repositorio