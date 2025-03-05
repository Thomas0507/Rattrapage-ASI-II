import React, { useState } from "react"
import { motion } from "motion/react"
import { Card } from "../models/Card";
import CardComponent from "./CardComponent";
import { generateStyleFromRarity } from "../utils/MotionStyle";

interface CardDisplayProps {
    card: Card;
    onClick: (card: Card) => void

}

export const CardDisplayComponent = ({card, onClick}: CardDisplayProps) => {
    const cardBackSvgPath = "../../../public/yugioh-back-card.svg";

    const [hidden, setHidden] = useState(true);
    const animationStyle = generateStyleFromRarity(card.rarity);

    const onClickFunction = () => {
        onClick(card);
        setHidden(false);
    }
    return (
        // todo : add effect according to rarity
        <motion.div
            key={hidden ? 'hidden' : 'shown'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            onClick={onClickFunction}
        >
            {hidden ? (
                <motion.div 
                whileHover={animationStyle.whileHover}
                animate={animationStyle.animate}
                transition={animationStyle.transition}>
                    <motion.img
                        src={cardBackSvgPath}
                        alt={card.name}
                        key="hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        style={{ width: '400px', height: 'auto' }}
                        />
                </motion.div>

            ): (
                <motion.div
                // src={card.image}
                // alt={card.name}
                key="shown"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                style={{ width: 300, height: 'auto' }}
                >
                    <CardComponent card={card} hideShowDetails={true}/>
                </motion.div>
            )}

        </motion.div>

    )
}