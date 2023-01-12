import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaNetworkWired } from 'react-icons/fa';

import axios from 'axios';



import Avatar from '@mui/material/Avatar';

import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';


function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link  href="#" text-decoration="none">
          2022 - Emprende
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  const theme = createTheme();
  
export const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    
    

    const onLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/login', {
                email,
                password
            });
            const { access_token, token_type, user } = response.data.data
            console.warn(access_token, token_type, user);

            login(user, `${token_type} ${access_token}`);
             // eslint-disable-next-line no-lone-blocks
            {
               


                navigate('/administracion');
            }
        } catch (error) {
            if (!FaNetworkWired) {
                console.log(error);
            } else {
                console.log(error.response.data.message, error);
                setEmail('');
                setPassword('');
            }
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    
                    <Typography component="h1" variant="h5">
                        Iniciar Sesión
                    </Typography>
                    <Box component="form" onSubmit={onLogin} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required 
                            fullWidth
                            id="email"
                            label="Correo Electrónico"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                                           
                            onChange={(e) => setEmail(e.target.value)}

                          
                          
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />  
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Recuérdame"
                        />
                        
                        <Grid container>
                            <Grid item xs>
                                <Link to="/recovery" variant="body2">
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </Grid>
                            
                            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 , bgcolor: '#15A0A0'}}
            >
              Iniciar sesión
            </Button>
                        </Grid>
                    </Box>
                </Box>
               
                <Copyright sx={{ mt: 8, mb: 4 }} />

      </Container>
                    
          


        </ThemeProvider>
    );
}
