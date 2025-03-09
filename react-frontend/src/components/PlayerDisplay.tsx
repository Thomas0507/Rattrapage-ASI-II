import { Icon, Typography } from "@mui/material";
import React from "react";
import { Player } from "../models/Player";
import { PlayerChat } from "../models/interface/PlayerChat";
import CircleIcon from '@mui/icons-material/Circle';
import { motion } from "framer-motion";

interface PlayerDisplayProps {
    player: PlayerChat;
}

export const PlayerDisplay = ({player}: PlayerDisplayProps) => {
    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', backgroundColor: "lightgrey", padding: "0.5em", alignItems: "center", borderRadius: "4px"}}>
            <Typography align="center">{player.username}</Typography>
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
            </div>
        </div>
    );
}