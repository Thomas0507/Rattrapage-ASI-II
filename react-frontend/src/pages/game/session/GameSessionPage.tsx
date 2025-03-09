import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ErrorComponent from "../../../components/ErrorComponent";
import { getOptionsByRequestType, RequestType } from "../../../hooks/RequestBuilder";
import Loader from "../../Loader";
import { Player } from "../../../models/Player";
import { GameComponent } from "./JoinGameSession";



export const GameSessionPage = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [username, setUsername]= useState<string>("");

    const path = useLocation().pathname.split("/");
    const sessionUUID: string = String(path[path.length-1]);


    
    useEffect(() => {
        getPlayerInfo();
        // joinGameSession();
    }, [username]);

    const getPlayerInfo = async (): Promise<void> => {
        const response = await fetch(`http://localhost:8081/player`, getOptionsByRequestType(RequestType.GET, {}));
        if (!response.ok) {
            return response.text().then( text => {
              setError(true);
              setErrorMessage(text);
              setLoading(false);   
            });
          }
          setLoading(false);
          const result: Player = await response.json();
          setUsername(result.username);
    }
    




    return (
        <div>
            {
                loading ? (<Loader/>)
                : (
                    <div>
                        {
                            !error ? (
                                <div>
                                    <GameComponent username={username} uuid={sessionUUID} />
                                </div>
                            ) : 
                            (<ErrorComponent message={errorMessage}/>)
                        }
                    </div>
                )
            }
        </div>
    )
}

