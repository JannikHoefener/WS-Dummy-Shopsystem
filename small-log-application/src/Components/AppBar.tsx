import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import { SideBarListElement } from "../Types/SideBarTypes";
import { useState } from "react";
import { Link } from "react-router-dom";
import Chip from "@mui/material/Chip";
import { LoginContext } from "../Context/LoginAuthContext";
import { Avatar } from "@mui/material";
import SettingsByAlert from "./Settings";
import Logout from "./Logout";
import OpenCartDrawer from "./Cart";

import TableViewRoundedIcon from "@mui/icons-material/TableViewRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import AddToPhotosRoundedIcon from "@mui/icons-material/AddToPhotosRounded";

const sideBarList: SideBarListElement[] = [
  {
    title: "Add Product",
    icon: () => <AddToPhotosRoundedIcon />,
    path: "/",
  },
  {
    title: "Products as Table",
    icon: () => <TableViewRoundedIcon />,
    path: "Productlist",
  },
  {
    title: "Products as Grids",
    icon: () => <GridViewRoundedIcon />,
    path: "ProductsGrid",
  },
  /* { title: "Setting", icon: () => <SettingsIcon />, path: "*" }, => Building an Button with AlertCard for Settings */
];

/**
 * defines the side bar and app bar
 * @returns
 */
export const TemporaryDrawer = () => {
  const { user } = React.useContext(LoginContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      setIsOpen(open);
    };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {sideBarList.map((element, index) => (
          <ListItem
            key={element.title}
            disablePadding
            component={Link}
            to={element.path}
          >
            <ListItemButton>
              {/* {index + 1} */}
              <ListItemIcon>
                <element.icon />
                {/* {element.icon()} */}
              </ListItemIcon>
              <ListItemText primary={element.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Box ml={"auto"}>
            {/* ml steht für Margin left => wir geben das Element Margin von linke Seite wie möglich "auto"  */}
            {/* Button: Cart with x Items */}
            <OpenCartDrawer/>
            
            {/* this user section */}
            <Chip
              sx={{ bgcolor: "#1359a0", color: "white", fontSize: 15 }}
              avatar={<Avatar alt="User" src="/static/images/avatar/1.jpg" />}
              label={user}
              onClick={() => {}}
            />
            
            {/* Settings */} 
            <SettingsByAlert/>
            
            {/* Button: LogOut */}
            <Logout />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor={"left"} open={isOpen} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
};
