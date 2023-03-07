import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

export default function AppMenuBar(props) {

  const { setValues } = props;  

  //const [anchorEl, setAnchorEl] = React.useState < null | HTMLElement>(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const open = Boolean(anchorEl);
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = (mi) => {
    setAnchorEl(null);
  };

  const handleMenu = (mi) => {
    setValues({mi,text:''})
    setAnchorEl(null);
  };

  return (
    <div>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={handleClick}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {/* News */}
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
    <Menu
        id="fade-menu"
        MenuListProps={{
            'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
    >
        <MenuItem onClick={ () => { handleMenu('home') } }>Home</MenuItem>
        <MenuItem onClick={() => { handleMenu('cam') }}>Cam</MenuItem>
        <MenuItem onClick={() => { handleMenu('location') }}>Location</MenuItem>
        <MenuItem onClick={() => { handleMenu('map') }}>Map</MenuItem>
        <MenuItem onClick={() => { handleMenu('share') }}>Share</MenuItem>
        <MenuItem onClick={() => { handleMenu('dial') }}>Dial</MenuItem>
        <MenuItem onClick={handleClose}>Close</MenuItem>
    </Menu>
  </div>
  
  );
}
