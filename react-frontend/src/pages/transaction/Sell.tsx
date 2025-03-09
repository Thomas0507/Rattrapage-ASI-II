import React from "react";
import { Button, Container, Typography } from "@mui/material";
import { useProfile } from "../../pages/profile/ProfilePage";
import { useAuth } from "../../hooks/useAuth"; 

const Sell: React.FC = () => {
    const { player, setPlayer } = useProfile(); // ✅ Accès aux cartes du joueur
    const { user } = useAuth(); // ✅ Récupérer le token utilisateur

    const handleSell = async (cardId: number) => {
        try {
            const response = await fetch("http://localhost:8081/transaction", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user}` // ✅ Token utilisateur
                },
                body: JSON.stringify({
                    cards: [{ id: cardId }], // ✅ Envoyer la carte vendue sous forme de tableau
                    amount: 50,  // 🔹 Prix temporaire (peut être dynamique selon la carte)
                    transactionType: "SELL",
                }),
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }

            alert("Vente réussie !");

            // ✅ Mettre à jour le profil après la vente
            await updatePlayerData();

        } catch (err) {
            console.error("Erreur lors de la vente :", err);
            alert(`Vente échouée: ${err.message}`);
        }
    };

    // ✅ Fonction pour mettre à jour les données du joueur après une vente
    const updatePlayerData = async () => {
        try {
            const response = await fetch("http://localhost:8081/player", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${user}`,
                },
            });

            if (!response.ok) {
                throw new Error("Impossible de récupérer les données du joueur.");
            }

            const updatedPlayer = await response.json();
            setPlayer(updatedPlayer); // ✅ Mettre à jour le contexte avec les nouvelles cartes
        } catch (err) {
            console.error("Erreur mise à jour du joueur:", err);
        }
    };

    return (
        <Container>
            <Typography variant="h4">Sell Your Cards</Typography>
            <div style={{ display: 'flex', gap: '1em', flexWrap: 'wrap' }}>
                {player.cards.length > 0 ? (
                    player.cards.map((_card) => (
                        <div key={_card.id}>
                            <Typography variant="h6">{_card.name}</Typography>
                            <Button 
                                variant="contained" 
                                color="secondary" 
                                onClick={() => handleSell(_card.id)}
                                sx={{ marginTop: 1 }}
                            >
                                Sell
                            </Button>
                        </div>
                    ))
                ) : (
                    <Typography>You have no cards to sell.</Typography>
                )}
            </div>
        </Container>
    );
};

export default Sell;
