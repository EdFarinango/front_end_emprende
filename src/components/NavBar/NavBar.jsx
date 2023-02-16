
import React, { useContext, useState, useEffect } from 'react';
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
import { Link, NavLink } from 'react-router-dom';
import Logout from '@mui/icons-material/Logout';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import ListItemIcon from '@mui/material/ListItemIcon';
import { AuthContext } from '../../contexts';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../assets/logo.png';
import './style.css';


function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [imagen, setImagen] = useState(null);
  const [lista, setLista] = useState([]);

  const [descripcion, setDescripcion] = useState('');
  const [admin, setAdmin] = useState('');
  const [admins, setAdmins] = useState('');

  const handleLogout = async () => {
    handleCloseUserMenu();
    try {
      await axios.post(
        'https://backend-emprende.herokuapp.com/api/v1/logout',
        {}, { headers: { 'accept': 'application/json', 'authorization': token } }
      );
      navigate('/', { replace: true });
      logout();

    } catch (error) {
      ////console.log(error);
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

  const getAdmin = async () => {

    try {
      const response = await axios.get(
        `https://backend-emprende.herokuapp.com/api/v1/superadmin`,
        { headers: { accept: "application/json", authorization: token } }
      );


      setLista(response.data.data.users);



      setAdmin(response.data.data.users);

    } catch (error) {
      ////console.log(error);
    }

  };

  const getAdmins = async () => {

    try {
      const response = await axios.get(
        `https://backend-emprende.herokuapp.com/api/v1/admin`,
        { headers: { accept: "application/json", authorization: token } }
      );

      ///revisar  updateState(response.data.data.users)
      user.admin = response.data.data.users;
      setAdmins(response.data.data.users);
      console.log(response.data.data.users);

    } catch (error) {
      ////console.log(error);
    }

  };




























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

            <IconButton className="menuButton"
              size="large"

              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}

            >
              <MenuIcon className='menuButton' />
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
              <MenuItem component={Link} to="/comision" onClick={handleCloseNavMenu}>
                Comisión Emprende
              </MenuItem>
              <MenuItem component={Link} to="/catalogo" onClick={handleCloseNavMenu}>
                Catálogo
              </MenuItem>
              <MenuItem component={Link} to="/repositorio" onClick={handleCloseNavMenu}>
                Repositorio
              </MenuItem>



            </Menu>
            <Typography
              className="emprende"
              variant="h5"

              component="a"
              href="/"
              sx={{
                marginBlockStart: '0.3em',
                marginBlockEnd: '0.3em',
                marginInlineStart: '0.3em',
                marginInlineEnd: '0.3em',

                color: 'white',

                fontFamily: 'Roboto',
                fontSize: '1.5rem',
                lineHeight: 1.6,
                letterSpacing: '0.01em',
                textDecoration: 'none',

              }}
            >
              Emprende
            </Typography>

          </Box>




          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

            <Button
              component={Link} to="/comision"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
              className="linkEmprende"
            >
              Comisión Emprende
            </Button>
            <Button component={Link} to="/catalogo" onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }} className="linkEmprende">
              Catálogo
            </Button>
            <Button component={Link} to="/repositorio" onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }} className="linkEmprende">
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
              color="white"
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

              {user ? <MenuItem>
                <a onClick={handleLogout} className="nav-link li "
                >Cerrar Sesión</a>
              </MenuItem> : <MenuItem>
                <a href="/login" className="nav-link li"
                  onClick={handleCloseUserMenu} sx={{ display: 'block' }} >
                  Iniciar Sesión</a>
              </MenuItem>}

              {
                user ?
                  <MenuItem>
                    <a onClick={handleCloseUserMenu} className="nav-link"
                      href="/administracion"

                    > Administración </a>
                  </MenuItem>
                  : null
              }













            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;