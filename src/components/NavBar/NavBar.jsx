
import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';
import Logout from '@mui/icons-material/Logout';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import ListItemIcon from '@mui/material/ListItemIcon';
import { AuthContext } from '../../contexts';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../assets/logo.png';


const pages = ['Comisión Emprende', 'Catálogo de Emprendimientos', 'Conferencias y Talleres'];


function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = async () => {
    handleCloseUserMenu();
    try {
      await axios.post(
        'https://backend-emprende.herokuapp.com/api/v1/logout',
        {}, { headers: { 'accept': 'application/json', 'authorization': token } }
      );
      navigate('/', { replace: true });
      logout();
      console.log('logout');
    } catch (error) {
      console.log(error);
    }


  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);


  };


function refreshPage() {
        window.location.reload(false);
      }
  

  return (
    <AppBar position="static" color='transparent' style={{ background: '#15A0A0' }} >

      <Container maxWidth="xl" >
        <Toolbar disableGutters >
          <Box sx={{ flexGrow: 12, display: { xs: 'none', md: 'flex' } }}>
            <Link to="/">
            <img src={Logo} alt="Logo" style={{ width: '150px', height: 'auto' }} />
            </Link>
              </Box>
         
          

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
           
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

          {/* <Typography
            variant="h5"

            component="a"
            href="/"
            sx={{
              fontWeight: 'bold',
              flexGrow: 12,
              fontFamily: 'Montserrat',



              color: 'White',

              textDecoration: 'none',
            }}
          >
            Emprende
          </Typography> */}

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

            <Button
              component={Link} to="/comision"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Comisión Emprende
            </Button>
            <Button component={Link} to="/catalogo" onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
              Catálogo
            </Button>
            <Button component={Link} to="/repositorio" onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
              Conferencias y Talleres
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Ver opciones">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>

                <Avatar alt={user && user.full_name ? user.full_name : 'Invitado'} style={{ background: '#17b3bb' }}
                > {user && user.full_name ? user.full_name[0] : 'I'} </Avatar>
              </IconButton>
            </Tooltip>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="inherit"
            >
              {user && user.full_name ? user.full_name : 'Invitado'}
            </Typography>





            <Menu
              sx={{ mt: '45px', }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',

              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >


              <MenuItem>
             
                {user && user.full_name ? <Button onClick={handleLogout}
                >Cerrar Sesión</Button> : <Button component={Link} to="/login"
                  onClick={handleCloseUserMenu} sx={{ display: 'block' }}>
                  Iniciar Sesión</Button>
                }

              </MenuItem>
              <MenuItem>
    
               {}
                  <Button component={Link} to="/administracion" onClick={handleCloseUserMenu}
                    sx={{ display: 'block' }}>Administración</Button> 
                  
              </MenuItem>








            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;