import React, { useEffect, useState, createContext, useContext} from "react"
import ProfileComponent from "../../components/ProfileComponent"
import { Player } from "../../models/Player"
import { Card } from "../../models/Card";
import { getOptionsByRequestType, RequestType } from "../../hooks/RequestBuilder";
import { useAuth } from "../../hooks/useAuth"; 


const ProfileContext = createContext(null);


export const useProfile = () => {
    return useContext(ProfileContext);
};

function ProfilePage () {
    const { user } = useAuth();
    const [player, setPlayer] = useState(new Player(0, '', [], 0));
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    // const player = new Player(1, "username", [
    //     new Card(1, "Lamball", "A simple sheep trying his best", "https://paldex.io/cdn-cgi/image/format=auto,width=300/images/pal-icons/T_SheepBall_icon_normal.png", 1, 1, "Neutral")
    //     ],
    //     45);


    useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch(`http://localhost:8081/player`, getOptionsByRequestType(RequestType.GET, {}) )
                    if (!response.ok) {
                        throw new Error(`Error: $(response.statusText)`);
                    }
                    const result = await response.json();
                    setPlayer(result);
                } catch(err) {
                    setError(err.message)
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }, [user])

    return (
    <div>
        <ProfileComponent player={player}/>
    </div>)
}

export default ProfilePage