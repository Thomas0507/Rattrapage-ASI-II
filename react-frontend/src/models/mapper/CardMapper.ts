import { Card } from "../Card";

interface CardDto {
    id : number;
    name : string;
    description : string;
    image : string;
    attack : number;
    defense : number;
    health : number;
    mainType : string;
    dropRate : number;
    rarity : number;
    collection : Object 
    price: number;
}


export function CardModelToCardDto(card : Card): CardDto {
    return {
        id : card.id,
        name : card.name,
        description : card.description,
        image : card.image,
        attack : card.attack,
        defense : card.defense,
        health : card.health,
        mainType : card.mainType,
        dropRate : card.dropRate,
        rarity : card.rarity,
        collection : card.collection,
        price : card.price
    }
}