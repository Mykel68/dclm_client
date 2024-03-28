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
// import EditNoteIcon from "@mui/icons-material/EditNote";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Image from "../assets/dlbc.png";
import { Button, Stack } from "@mui/material";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import HomeIcon from "@mui/icons-material/Home";
import useUserToken from "../hooks/useUserToken";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

export default function Bar() {
  const [open, setOpen] = React.useState(false);
  const { userType } = useUserToken();
  const navigate = useNavigate();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

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
      {[
        {
          text: "Home",
          icon: <HomeIcon />,
          link: userType === "Admin" ? "/admin" : "/super_admin",
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

      <Divider />
      <List>
        {[
          {
            text: "Report Page",
            icon: <AssessmentIcon />,
            link:
              userType === "Admin"
                ? "/admin_report_page"
                : "/super_report_page",
          },
          {
            text: "New Report",
            icon: <AddBoxIcon />,
            link: userType === "Admin" ? "/new_report" : "/super_report",
          },
          // { text: "Edit Report", icon: <EditNoteIcon />, link: "/edit" },
          // {
          //   text: "Delete Report",
          //   icon: <DeleteForeverIcon />,
          //   link: "/delete",
          // },
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
      {userType === "Super admin" ? (
        <List>
          {[
            { text: "All Admin", icon: <AccountBoxIcon />, link: "/all_admin" },
            {
              text: "Add Admin",
              icon: <PersonAddAltIcon />,
              link: "/new_admin",
            },
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
      ) : null}
      <Divider />
      <List>
        {[
          {
            text: "Profile",
            icon: <ManageAccountsIcon />,
            link: "/profile",
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
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
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
                to="/login"
                style={{ textDecoration: "none", color: "white" }}
              >
                Logout
              </Link>
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={toggleDrawer(false)} sx={{ width: 250 }}>
        {DrawerList}
      </Drawer>
    </Box>
  );
}
