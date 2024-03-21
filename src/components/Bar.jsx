import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Image from "../assets/dlbc.png";
import { Button, Stack } from "@mui/material";
import PersonOffIcon from "@mui/icons-material/PersonOff";

export default function Bar() {
  const [open, setOpen] = React.useState(false);
  const [userType, setUserType] = React.useState("Super Admin");

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };
  const navigate = useNavigate();

  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      className="text-bg-primary h-100"
    >
      <Typography
        variant="h6"
        color="inherit"
        component="div"
        sx={{ p: 2, textAlign: "center", fontWeight: "bold" }}
      >
        <img
          src={Image}
          alt=""
          className="img"
          style={{ width: "40px", height: "40px", margin: "5px" }}
        />
        {userType}
      </Typography>
      <List>
        {[
          { text: "Report Page", icon: <AssessmentIcon />, link: "/report" },
          { text: "New Report", icon: <AddBoxIcon />, link: "/new" },
          { text: "Edit Report", icon: <EditNoteIcon />, link: "/edit" },
          {
            text: "Delete Report",
            icon: <DeleteForeverIcon />,
            link: "/delete",
          },
        ].map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            button
            component={Link}
            to={item.link}
          >
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {[
          { text: "All Admin", icon: <AccountBoxIcon />, link: "/all_admin" },
          { text: "Add Admin", icon: <PersonAddAltIcon />, link: "/new_admin" },
          { text: "Delete Admin", icon: <PersonOffIcon />, link: "/edit" },
        ].map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            button
            component={Link}
            to={item.link}
          >
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon onClick={toggleDrawer(true)} />
          </IconButton>
          <Typography variant="h5" color="inherit" component="div">
            <img
              src={Image}
              alt=""
              className="img"
              style={{ width: "50px", height: "50px", margin: "10px" }}
            />
            Admin Page
          </Typography>
          <Stack direction="row" spacing={2} style={{ marginLeft: "auto" }}>
            <Button variant="contained" color="error" onClick={handleLogout}>
              <Link
                to="/logout"
                style={{ textDecoration: "none", color: "white" }}
              >
                Logout
              </Link>
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </Box>
  );
}
