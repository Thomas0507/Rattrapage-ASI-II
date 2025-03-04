import React, { useEffect, useState } from "react"
import { SummonComponent } from "../../../../components/SummonComponent"
import { Card } from "../../../../models/Card";
import Loader from "../../../Loader";
import { getOptionsByRequestType, RequestType } from "../../../../hooks/RequestBuilder";
import { useLocation } from "react-router-dom";
import ErrorComponent from "../../../../components/ErrorComponent";
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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const path = useLocation().pathname.split("/");
    const bannerId = Number(path[path.length-1]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8081/banner/summon/` + bannerId, getOptionsByRequestType(RequestType.GET, {}));
                if (!response.ok) {
                    return response.text().then( text => {
                        setError(true);
                        setErrorMessage(text);}
                    );
                }
                // todo: handle card not found
                const result = await response.json();
                setCardsDropped(result);
            } catch(err) {
                setErrorMessage(err)
                setError(true);
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
            <div>
                {
                    error ? (<ErrorComponent message={errorMessage}/>) : (
                        <SummonComponent droppedCards={cardsDropped}/>
                    )
                }

            </div>
        )
    }
            </div>
    )
}