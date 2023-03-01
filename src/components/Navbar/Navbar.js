import * as React from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import GroupsIcon from '@mui/icons-material/Groups';
import './Navbar.css';

function Navbar2() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <GroupsIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Foodbank Portal
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
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
              <MenuItem key={'overview'} onClick={handleCloseNavMenu}>
                <NavLink to="/" className={(navData) => (navData.isActive ? "active-menu" : 'menu-item')}>Overview</NavLink>
              </MenuItem>

              <MenuItem key={'foodbanks'} onClick={handleCloseNavMenu}>
                <NavLink to="/foodbanks" className={(navData) => (navData.isActive ? "active-menu" : 'menu-item')}>Foodbanks</NavLink>
              </MenuItem>

              <MenuItem key={'items'} onClick={handleCloseNavMenu}>
                <NavLink to="/items" className={(navData) => (navData.isActive ? "active-menu" : 'menu-item')}>Items</NavLink>
              </MenuItem>

              <MenuItem key={'help'} onClick={handleCloseNavMenu}>
                <NavLink to="/help" className={(navData) => (navData.isActive ? "active-menu" : 'menu-item')}>Help</NavLink>
              </MenuItem>
            </Menu>
          </Box>
          <GroupsIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Foodbank Portal
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>


              <Button
                key={'overview'}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <NavLink to="/" className={(navData) => (navData.isActive ? "active-link" : 'link-item')}>Overview</NavLink>
              </Button>

              <Button
                key={'foodbank_branches'}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <NavLink to="/foodbanks" className={(navData) => (navData.isActive ? "active-link" : 'link-item')}>Foodbank Branches</NavLink>
              </Button>

              <Button
                key={'items'}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <NavLink to="/items" className={(navData) => (navData.isActive ? "active-link" : 'link-item')}>Items</NavLink>
              </Button>

              <Button
                key={'help'}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <NavLink to="/help" className={(navData) => (navData.isActive ? "active-link" : 'link-item')}>Help</NavLink>
              </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar2;