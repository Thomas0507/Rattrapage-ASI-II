import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export const GameSessionPage = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const path = useLocation().pathname.split("/");
    const sessionUUID: string = String(path[path.length-1]);

    

    return (
        <div>
            gameSession
        </div>
    )
}

