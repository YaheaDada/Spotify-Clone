import { useState } from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const sidebarWidth = open ? 240 : 60;
  const navigate = useNavigate();

  return (
    <div
      className="bg-gray-800 text-white flex flex-col justify-between transition-width duration-300 "
      style={{ width: sidebarWidth }}
    >
      <div>
        {/* Toggle button */}
        <IconButton onClick={() => setOpen(!open)} className="text-white m-2">
          <MenuIcon />
        </IconButton>

        <Divider className="bg-gray-600" />

        <List>
          <ListItemButton onClick={() => navigate("/")}>
            <ListItemIcon className="text-white" style={{ color: "white" }}>
              <HomeIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Home" />}
          </ListItemButton>

          <ListItemButton onClick={() => navigate("/Profile")}>
            <ListItemIcon className="text-white" style={{ color: "white" }}>
              <SettingsIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Profile" />}
          </ListItemButton>

          <ListItemButton onClick={() => navigate("/AboutUs")}>
            <ListItemIcon className="text-white" style={{ color: "white" }}>
              <InfoIcon />
            </ListItemIcon>
            {open && <ListItemText primary="About Us" />}
          </ListItemButton>
        </List>
      </div>

      <List>
        <ListItemButton onClick={() => navigate("/Register")}>
          <ListItemIcon className="text-white" style={{ color: "white" }}>
            <PersonAddIcon />
          </ListItemIcon>
          {open && <ListItemText primary="Register" />}
        </ListItemButton>
      </List>
    </div>
  );
}

// https://github.com/public-apis/public-apis
