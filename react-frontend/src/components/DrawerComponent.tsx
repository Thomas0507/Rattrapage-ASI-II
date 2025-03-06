import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import { Home, Settings, Info } from "@mui/icons-material";

interface PlayerDto {
    username: string;
}

interface DrawerProps {
    players: PlayerDto[]
}

export const DrawerComponent = ({players}: DrawerProps) => {

  const drawerWidth = 60;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <List>
        {[{ text: "Home", icon: <Home /> }, { text: "Settings", icon: <Settings /> }, { text: "About", icon: <Info /> }].map((item, index) => (
          <ListItem key={index} sx={{ display: "flex", justifyContent: "center" }}>
            <ListItemIcon>{item.icon}</ListItemIcon>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
