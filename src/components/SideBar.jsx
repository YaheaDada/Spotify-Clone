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

export default function App() {
  const [open, setOpen] = useState(true);
  const sidebarWidth = open ? 240 : 60;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className="bg-gray-800 text-white flex flex-col justify-between transition-width duration-300"
        style={{ width: sidebarWidth }}
      >
        <div>
          {/* Toggle button */}
          <IconButton onClick={() => setOpen(!open)} className="text-white m-2">
            <MenuIcon />
          </IconButton>

          <Divider className="bg-gray-600" />

          <List>
            <ListItemButton>
              <ListItemIcon className="text-white">
                <HomeIcon />
              </ListItemIcon>
              {open && <ListItemText primary="Home" />}
            </ListItemButton>

            <ListItemButton>
              <ListItemIcon className="text-white">
                <SettingsIcon />
              </ListItemIcon>
              {open && <ListItemText primary="Profile" />}
            </ListItemButton>

            <ListItemButton>
              <ListItemIcon className="text-white">
                <InfoIcon />
              </ListItemIcon>
              {open && <ListItemText primary="About Us" />}
            </ListItemButton>
          </List>
        </div>

        {/* Register button at the bottom */}
        <List>
          <ListItemButton>
            <ListItemIcon className="text-white">
              <HomeIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Register" />}
          </ListItemButton>
        </List>
      </div>
    </div>
  );
}
