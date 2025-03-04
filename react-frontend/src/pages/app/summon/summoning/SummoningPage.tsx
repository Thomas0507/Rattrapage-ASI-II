import React, { useEffect, useState } from "react"
import { SummonComponent } from "../../../../components/SummonComponent"
import { Card } from "../../../../models/Card";
import Loader from "../../../Loader";
import { getOptionsByRequestType, RequestType } from "../../../../hooks/RequestBuilder";
import { useLocation } from "react-router-dom";
export const SummoningPage = () => {
    // do an invocation =>
    const cardsDroppedMock: Card[] = [
        new Card(1, "Lamball", "A simple sheep trying his best", "https://paldex.io/cdn-cgi/image/format=auto,width=300/images/pal-icons/T_SheepBall_icon_normal.png", 1, 1, "Neutral")
        ,        new Card(1, "Lamball", "A simple sheep trying his best", "https://paldex.io/cdn-cgi/image/format=auto,width=300/images/pal-icons/T_SheepBall_icon_normal.png", 1, 1, "Neutral"),
        new Card(1, "Lamball", "A simple sheep trying his best", "https://paldex.io/cdn-cgi/image/format=auto,width=300/images/pal-icons/T_SheepBall_icon_normal.png", 1, 1, "Neutral"),
        new Card(1, "Lamball", "A simple sheep trying his best", "https://paldex.io/cdn-cgi/image/format=auto,width=300/images/pal-icons/T_SheepBall_icon_normal.png", 1, 1, "Neutral"),
        new Card(1, "Lamball", "A simple sheep trying his best", "https://paldex.io/cdn-cgi/image/format=auto,width=300/images/pal-icons/T_SheepBall_icon_normal.png", 1, 1, "Neutral")

    ];
    const [cardsDropped, setCardsDropped] = useState(cardsDroppedMock);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const path = useLocation().pathname.split("/");
    const bannerId = Number(path[path.length-1]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8081/banner/summon/` + bannerId, getOptionsByRequestType(RequestType.GET, {}));
                if (!response.ok) {
                    throw new Error(`Error: $(response.statusText)`);
                }
                // todo: handle card not found
                const result = await response.json();
                setCardsDropped(result);
            } catch(err) {
                setError(err.message)
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [])


    return (
        <div>
    {
        loading ? (
            <Loader />
        ) : (
            <SummonComponent droppedCards={cardsDropped}/>
        )
    }
            </div>
    )
}