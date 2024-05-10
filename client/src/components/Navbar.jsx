import React, { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "state";
import profileImage from "assets/profile.jpeg";

import {
  AppBar,
  Button,
  Box,
  Typography,
  IconButton,
  InputBase,
  Toolbar,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";

function Navbar({ user,isSidebarOpen, setIsSidebarOpen }) {
  const dispatch = useDispatch();
  // usetheme se hum pallete typography etc value of custom theme define kr skte h
  const theme = useTheme();

  //MUI K documentation k acc hume open close chahiye dropdown k liye so hum ye sb usi k liye variable bna rhe h
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  return (
    // appbar use hota h bs upr ka navbar ka dhancha banne k liye aur toolbar me hum content dalte h
    <AppBar sx={{
      position: "static",
      background: "none",
      boxShadow: "none",
    }}>
      {/* toolbar m ye property lgane se left and right content m spacing aa jaega */}
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        {/* FlexBetween(we have prepared)can now be used in place of the regular Box component from Material-UI, and it will apply 
   the specified styles (flex display, space-between justification, and center alignment) to its children      */}
        <FlexBetween>
          {/* button bna dia h sbko  */}
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
          {/* yha p click se setmode action call hoga jo ki reducer k through uski store value(mode) ko change kr dega
    ab kyuki store m change hua h app js file k andr mode variable props m change hoga aur vo change hoga to 
    component render hoga jo ki app js m theme variable ko change krega aur themesetting se puri theme change ho jaegi app ki
    aur usk baad is wali file me icon change hoga theme pallete se  */}
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>
          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={handleClose}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>

        </FlexBetween>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
