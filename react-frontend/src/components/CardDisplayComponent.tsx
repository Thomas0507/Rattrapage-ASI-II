import React, { useState } from "react"
import { motion } from "motion/react"
import { Card } from "../models/Card";
import CardComponent from "./CardComponent";

interface CardDisplayProps {
    card: Card;
    onClick: (card: Card) => void

}

export const CardDisplayComponent = ({card, onClick}: CardDisplayProps) => {
    const cardBackSvgPath = "../../public/yugioh-back-card.svg";

    const [hidden, setHidden] = useState(true);

    const onClickFunction = () => {
        onClick(card);
        setHidden(false);
    }
    return (
        <motion.div
            key={hidden ? 'hidden' : 'shown'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            onClick={onClickFunction}
        >
            {hidden ? (
                <motion.img
                src={cardBackSvgPath}
                alt={card.name}
                key="hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                style={{ width: 200, height: 'auto' }}
                />
            ): (
                <motion.div
                // src={card.image}
                // alt={card.name}
                key="shown"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                style={{ width: 200, height: 'auto' }}
                >
                <CardComponent card={card}/>
                </motion.div>
            )}

        </motion.div>

    )
}