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


interface PlayerDto {
    username: string;
}

interface DrawerProps {
    players: PlayerDto[]
}

export const DrawerComponent = ({players}: DrawerProps) => {

    const [open, setOpen] = React.useState(true);
    console.log(players);
    const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
    };
  
    const DrawerList = (
      <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
        <List>
          {players.map((text, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text.username} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    );
    return (
    <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
    </Drawer>
    )
}