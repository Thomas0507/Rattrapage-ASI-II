import { Alert } from "@mui/material";
import React from "react";

interface RareCardDroppedProps {
    message: string
}


const RareCardDroppedComponent = ({message}: RareCardDroppedProps) => {
    
    return (

    // fixme: display when a card is revealed
    <Alert variant="filled" severity="success" sx={{backgroundColor: 'rgba(255, 215, 50, 0.9)', color: "white", fontSize: 30}}>
        <span style={{fontWeight: "bold"}}>
            {message}
        </span>
        
    </Alert>
    )

}

export default RareCardDroppedComponent;