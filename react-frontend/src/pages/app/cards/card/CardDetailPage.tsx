import React, { useState, useEffect } from 'react';
import CardDetailComponent from "../../../../components/CardDetailComponent";
import { Card } from "../../../../models/Card";
import { getOptionsByRequestType, RequestType } from "../../../../hooks/RequestBuilder";


import { useLocation } from 'react-router-dom'


function CardDetailPage () {

    const path = useLocation().pathname.split("/");
    const cardId = Number(path[path.length-1]);
    
    const mockCard = new Card(1, "Lamball", "A simple sheep trying his best", "https://paldex.io/cdn-cgi/image/format=auto,width=300/images/pal-icons/T_SheepBall_icon_normal.png", 1, 1, "Neutral", "", 0, 0, null);
    const [card, setCard] = useState<Card>(mockCard);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8081/cards/` + cardId, getOptionsByRequestType(RequestType.GET, {}) )
                if (!response.ok) {
                    throw new Error(`Error: $(response.statusText)`);
                }
                // todo: handle card not found
                const result = await response.json();
                setCard(result);
            } catch(err) {
                setError(err.message)
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [])


    if (loading) return <p> loading</p> 
    if (error) return <p>Error: {error}</p>
    return (

    <div>
        <CardDetailComponent card={card}/>
    </div>)
}

export default CardDetailPage