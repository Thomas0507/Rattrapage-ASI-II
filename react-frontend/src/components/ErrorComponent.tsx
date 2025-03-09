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
    let jsonyfiedError: Error;
    try {
        jsonyfiedError = JSON.parse(message);
    } catch(err) {
        console.log(err)
        jsonyfiedError = { status: 500, message: "Error", reason:"Unknown Error - The error could not be parsed"};
    }

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