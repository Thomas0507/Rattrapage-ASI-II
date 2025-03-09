import { Box, Icon, Tooltip, Typography } from "@mui/material";
import React from "react";
import { Player } from "../models/Player";
import { PlayerChat } from "../models/interface/PlayerChat";
import CircleIcon from '@mui/icons-material/Circle';
import { motion } from "framer-motion";
import ChatIcon from '@mui/icons-material/Chat';

interface PlayerDisplayProps {
    player: PlayerChat;
    clickOnPlayer: (player: PlayerChat) => void
}

export const PlayerDisplay = ({player, clickOnPlayer}: PlayerDisplayProps) => {
    
const handleClick = () => {
    clickOnPlayer(player);
}
function getChatIconTooltip() {
    return "Chat with " + player.username;
}

    return (
        <div>
            <Box style={{display: 'flex', justifyContent: 'space-between', backgroundColor: "lightgrey", padding: "0.5em", alignItems: "center", borderRadius: "4px"}}
            sx={{
                cursor: "pointer",  // Changes cursor on hover
            }}
            onClick={handleClick}>
            <Typography component="span"
            sx={{textAlign: "left", width: "100%"}}
            align="center">{player.username}</Typography>
            <Tooltip title={getChatIconTooltip()}>
                <ChatIcon/>
            </Tooltip>
            {
                player.connected ? 
                (
                    <motion.div
                    animate={{
                        scale: [1, 1.2, 1], // Grows slightly then shrinks back
                        opacity: [1, 0.8, 1], // Light fading effect
                      }}
                      transition={{
                        duration: 1.5, // Slow pulse effect
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}>
                        <CircleIcon sx={{ color: "#4CAF50", fontSize: 20 }}/>
                    </motion.div>
                ) :
                (
                    <motion.div>
                        <CircleIcon sx={{ color: "#9E9E9E", fontSize: 20 }}/>
                    </motion.div>
                )
            }
            </Box>
        </div>
    );
}