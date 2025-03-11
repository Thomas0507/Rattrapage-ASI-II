import React, { useState } from "react"
import Input from '@mui/material/Input';

interface GameInviteProps {
    onChange: Function
}

export const GameInviteComponent = ({onChange}: GameInviteProps) => {
    return (
        <div style={{flexGrow: 1}}>
            <Input
            placeholder="Enter the game UUID"
            fullWidth
            onChange={(e) => onChange(e.target.value)} ></Input>
        </div>
    )
}