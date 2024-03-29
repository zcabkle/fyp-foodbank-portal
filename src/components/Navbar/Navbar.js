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
import MenuItem from '@mui/material/MenuItem';
import GroupsIcon from '@mui/icons-material/Groups';
import './Navbar.css';

function Navbar() {
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
          <GroupsIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fontSize: '32px' }} />
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
            </Menu>
          </Box>
          <GroupsIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, fontSize: '32px' }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Foodbank Portal
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

            <NavLink to="/" className={(navData) => (navData.isActive ? "active-link" : 'link-item')}>
              <Box
                sx={{ my: 2, pr: 2, color: 'white', display: 'block' }}
              >
                Overview
              </Box>
            </NavLink>

            <NavLink to="/foodbanks" className={(navData) => (navData.isActive ? "active-link" : 'link-item')}>
              <Box
                sx={{ my: 2, pr: 2, color: 'white', display: 'block' }}
              >
                Foodbank Branches
              </Box>
            </NavLink>

            <NavLink to="/items" className={(navData) => (navData.isActive ? "active-link" : 'link-item')}>
                <Box sx={{ my: 2, pr: 2, color: 'white', display: 'block' }}>
                Items
                </Box>
            </NavLink>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;