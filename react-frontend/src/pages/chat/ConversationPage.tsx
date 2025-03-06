import React, { useEffect, useState } from "react"
import Conversation from "./Conversation"
import { getOptionsByRequestType, RequestType } from "../../hooks/RequestBuilder";
import Loader from "../Loader";
import ErrorComponent from "../../components/ErrorComponent";

export const ConversationPage = () => {

    const [players, setPlayers] = useState<any[]>([]);
    const [username, setUsername] = useState<string>("");
    const [loading, setLoading] = useState<Boolean>(true);
    const [error, setError] = useState<Boolean>(false);
    const [errorMessage, setErrorMessage] = useState<any>("");

    useEffect(() => {
              const fetchData = async () => {
                  try {
                      const response = await fetch(`http://localhost:8081/player`, getOptionsByRequestType(RequestType.GET, {}));
                      const responsePlayers = await fetch(`http://localhost:8081/player/all`, getOptionsByRequestType(RequestType.GET, {}));
                      if (!response.ok) {
                        return response.text().then( text => {
                          setError(true);
                          setErrorMessage(text);}
                        );
                      }
                      if (!responsePlayers.ok) {
                        return responsePlayers.text().then( text => {
                          setError(true);
                          setErrorMessage("");
                        });
                      }
                      const result = await response.json();
                      const playerResult = await responsePlayers.json();
                      setPlayers(playerResult);
                      setUsername(result.username);
                  } catch(err) {
                      // setError(true)
                      // setErrorMessage("Error encountered")
                  } finally {
                      setLoading(false);
                  }
              };
              
              fetchData();
    }, []);

    return (
    <div>
        {
            loading ? (<Loader/>) :
            <div>
                {
                    error ? ( <ErrorComponent message={errorMessage}/>) :
                    (
                        // todo: add player list =>
                        // todo: add navigation to private chat
                        <Conversation username={username}/>
                    )
                }
            </div>
        }

    </div>
    )
}