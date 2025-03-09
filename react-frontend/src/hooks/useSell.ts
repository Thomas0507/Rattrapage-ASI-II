import { useState } from "react";
import { useAuth } from "../hooks/useAuth"; 
import { useProfile } from "../pages/profile/ProfilePage";

export const useSell = () => { // ✅ Export correct
    const { setPlayer } = useProfile(); 
    const { user } = useAuth(); 
    const [prices, setPrices] = useState<{ [key: number]: number }>({});

    const handlePriceChange = (cardId: number, price: number) => {
        setPrices((prevPrices) => ({
            ...prevPrices,
            [cardId]: price,
        }));
    };

    const handleSell = async (cardId: number) => {
        const price = prices[cardId] || 50;

        try {
            const response = await fetch("http://localhost:8081/transaction", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user}`
                },
                body: JSON.stringify({
                    cards: [{ id: cardId }],
                    amount: price,
                    transactionType: "SELL",
                }),
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }

            alert(`Vente réussie pour ${price} !`);
            await updatePlayerData();
        } catch (err) {
            console.error("Erreur lors de la vente :", err);
            alert(`Vente échouée: ${err.message}`);
        }
    };

    const updatePlayerData = async () => {
        try {
            const response = await fetch("http://localhost:8081/player", {
                method: "GET",
                headers: { "Authorization": `Bearer ${user}` },
            });

            if (!response.ok) {
                throw new Error("Impossible de récupérer les données du joueur.");
            }

            const updatedPlayer = await response.json();
            setPlayer(updatedPlayer);
        } catch (err) {
            console.error("Erreur mise à jour du joueur:", err);
        }
    };

    return { handleSell, handlePriceChange, prices };
};
