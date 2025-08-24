import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import DashboardIcon from '@mui/icons-material/Dashboard';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography'; 
import CategoryIcon from '@mui/icons-material/Category';
import { Link, useLocation } from 'react-router-dom';
import Paths from '../common/Paths';
import WebIcon from '@mui/icons-material/Web';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
const drawerWidth = 240;

function Layout(props) {
  const { Screens } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation()
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <Link to={Paths.dashboard}>
          <ListItem disablePadding>
            <ListItemButton selected={location.pathname === Paths.dashboard}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary={"Dashboard"} />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>

      <List>
        <Link to={Paths.category}>
          <ListItem disablePadding>
            <ListItemButton selected={location.pathname === Paths.category}>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary={"Category"} />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
      <List>
        <Link to={Paths.product}>
          <ListItem disablePadding>
            <ListItemButton selected={location.pathname === Paths.product}>
              <ListItemIcon>
                <ProductionQuantityLimitsIcon />
              </ListItemIcon>
              <ListItemText primary={"Product"} />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
      <List>
        <Link to={Paths.Blog}>
          <ListItem disablePadding>
            <ListItemButton selected={location.pathname === Paths.Blog}>
              <ListItemIcon>
                <WebIcon />
              </ListItemIcon>
              <ListItemText primary={"Blog"} />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>

      <List>
        <Link to="/chess">
          <ListItem disablePadding>
            <ListItemButton selected={location.pathname === "/chess"}>
              <ListItemIcon>♟️</ListItemIcon>
              <ListItemText primary={"Chess"} />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: "100%" },
          ml: { sm: `${drawerWidth}px` },
          zIndex:10000
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
           Blogs
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {
            Screens
        }
      </Box>
    </Box>
  );
}


export default Layout;