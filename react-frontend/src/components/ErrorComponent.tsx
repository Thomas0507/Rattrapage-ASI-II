import { Alert } from "@mui/material";
import React from "react";
import CheckIcon from '@mui/icons-material/Check';

interface ErrorProps {
    message: string
}

interface Error {
    status: number,
    message: string,
    reason: string;
}


const ErrorComponent = ({message}: ErrorProps) => {

    const jsonyfiedError: Error = JSON.parse(message);

    return (
    <Alert severity="error">
        <span style={{fontWeight: "bold"}}>
            {jsonyfiedError.status} - {jsonyfiedError.message}: <br/>
        </span>
        <span>
            {jsonyfiedError.reason}
        </span>
    </Alert>)
}

export default ErrorComponent;