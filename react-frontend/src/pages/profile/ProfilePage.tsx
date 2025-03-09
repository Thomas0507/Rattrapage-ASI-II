import React, { useEffect, useState, createContext, useContext } from "react";
import ProfileComponent from "../../components/ProfileComponent";
import { Player } from "../../models/Player";
import { getOptionsByRequestType, RequestType } from "../../hooks/RequestBuilder";
import { useAuth } from "../../hooks/useAuth";

// 🔹 Interface pour le contexte
interface ProfileContextType {
    player: Player;
    setPlayer: React.Dispatch<React.SetStateAction<Player>>;
}

// 🔹 Création du contexte Profile
const ProfileContext = createContext<ProfileContextType | null>(null);

// 🔹 Hook pour utiliser le contexte Profile
export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error("useProfile must be used within a ProfileProvider");
    }
    return context;
};

// ✅ Création d'un **ProfileProvider** indépendant
export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [player, setPlayer] = useState<Player>(new Player(0, '', [], 0));
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8081/player", getOptionsByRequestType(RequestType.GET));
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const result = await response.json();
                setPlayer(result);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);


    useEffect(() => {
        console.log("Mise à jour du profil détectée :", player);
    }, [player]); 
    
    return (
        <ProfileContext.Provider value={{ player, setPlayer }}>
            {children}
        </ProfileContext.Provider>
    );
};


function ProfilePage() {
    const { player } = useProfile(); // Utilise `useProfile` directement

    return (
        <div>
            <ProfileComponent player={player} />
        </div>
    );
}

export default ProfilePage;
