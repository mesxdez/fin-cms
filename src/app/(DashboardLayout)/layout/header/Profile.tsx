import React, { useState } from "react";
import Link from "next/link";
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Switch,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import { IconListCheck, IconMail, IconUser } from "@tabler/icons-react";
import { useTheme } from "@/utils/ThemeContext";

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const { mode, toggleTheme } = useTheme();

  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleThemeToggle = () => {
    toggleTheme();
    handleClose2();
  };

  return (
    <>
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
        onClick={handleClick2}
      >
        <IconButton
          size="large"
          aria-label="show 11 new notifications"
          color="inherit"
          aria-controls="msgs-menu"
          aria-haspopup="true"
          sx={{
            ...(typeof anchorEl2 === "object" && {
              color: "primary.main",
            }),
          }}
        >
          <Avatar
            src="/images/profile/user-1.jpg"
            alt="image"
            sx={{
              width: 35,
              height: 35,
            }}
          />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle2" fontWeight={600}>
            EP
          </Typography>
          <Typography variant="caption" color="text.secondary">
            wijtraprr@gmail.com
          </Typography>
        </Box>
        <IconButton size="small">
          <SettingsIcon />
        </IconButton>
        {/* ------------------------------------------- */}
        {/* Message Dropdown */}
        {/* ------------------------------------------- */}
      </Box>
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "200px",
          },
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleThemeToggle}>
          <ListItemIcon>
            {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </ListItemIcon>
          <ListItemText>
            {mode === "dark" ? "Light Mode" : "Dark Mode"}
          </ListItemText>
          <Switch
            checked={mode === "dark"}
            onChange={handleThemeToggle}
            size="small"
            onClick={(e) => e.stopPropagation()}
          />
        </MenuItem>

        <Box mt={1} py={1} px={2}>
          <Button
            href="/authentication/login"
            variant="outlined"
            color="primary"
            component={Link}
            fullWidth
          >
            Logout
          </Button>
        </Box>
      </Menu>
    </>
  );
};

export default Profile;
