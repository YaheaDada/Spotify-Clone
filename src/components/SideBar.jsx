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
  const sidebarWidth = open ? 600 : 80;
  const navigate = useNavigate();

  const iconStyle = {
    color: "white",
    fontSize: "2.25rem", // 50% bigger (1.5rem * 1.5)
  };

  const textProps = {
    primaryTypographyProps: {
      style: { color: "white", fontSize: "1.8rem", fontWeight: 500 },
    },
  };

  return (
    <div
      className="bg-[#1e1e1e] text-white flex flex-col justify-between transition-all duration-300"
      style={{ width: sidebarWidth }}
    >
      <div>
        {/* Toggle button */}
        <IconButton onClick={() => setOpen(!open)} className="text-white m-2">
          <MenuIcon sx={iconStyle} />
        </IconButton>

        <Divider className="bg-gray-600" />

        <List>
          <ListItemButton onClick={() => navigate("/")}>
            <ListItemIcon>
              <HomeIcon sx={iconStyle} />
            </ListItemIcon>
            {open && <ListItemText primary="Home" {...textProps} />}
          </ListItemButton>

          <ListItemButton onClick={() => navigate("/Profile")}>
            <ListItemIcon>
              <SettingsIcon sx={iconStyle} />
            </ListItemIcon>
            {open && <ListItemText primary="Profile" {...textProps} />}
          </ListItemButton>

          <ListItemButton onClick={() => navigate("/AboutUs")}>
            <ListItemIcon>
              <InfoIcon sx={iconStyle} />
            </ListItemIcon>
            {open && <ListItemText primary="About Us" {...textProps} />}
          </ListItemButton>
        </List>
      </div>

      <List>
        <ListItemButton onClick={() => navigate("/Register")}>
          <ListItemIcon>
            <PersonAddIcon sx={iconStyle} />
          </ListItemIcon>
          {open && <ListItemText primary="Register" {...textProps} />}
        </ListItemButton>
      </List>
    </div>
  );
}
``