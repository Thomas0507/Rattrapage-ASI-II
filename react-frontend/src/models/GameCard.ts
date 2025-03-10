import { Card } from "./Card";
import { Collection } from "./Collection";

export class GameCard extends Card {
    
    private _maxHealth: number;

    private _maxAttack: number;

    private _maxDefense: number;

    // player who own the card, used for attack recognition
    private _owner: string;

    private _selected: boolean;

    constructor(id?: number,
                name?: string,
                description?: string,
                image?: string,
                attack?:number, 
                defense?: number,
                health?: number,
                mainType?: string,
                dropRate?:number,
                rarity?: number,
                collection?: Collection,
                price?: number,
                resellPrice?: number,
                maxHealth?: number,
                maxAttack?: number,
                maxDefense?: number,
                owner?: string,
                // only for ihm
                selected?: boolean
            ) {
        super(id, name, description, image, attack, defense, health, mainType, dropRate, rarity, collection, price, resellPrice);
        this._maxAttack = maxAttack || 0;
        this._maxDefense = maxDefense || 0;
        this._maxHealth = maxHealth || 0;
        this._owner = owner || "";
        this._selected = selected || false; 
    }

    public get maxHealth(): number {
        return this._maxHealth;
    }
    public set maxHealth(value: number) {
        this._maxHealth = value;
    }
    public get maxAttack(): number {
        return this._maxAttack;
    }
    public set maxAttack(value: number) {
        this._maxAttack = value;
    }
    public get maxDefense(): number {
        return this._maxDefense;
    }
    public set maxDefense(value: number) {
        this._maxDefense = value;
    }
    public get owner(): string {
        return this._owner;
    }
    public set owner(value: string) {
        this._owner = value;
    }
    public get selected(): boolean {
        return this._selected;
    }
    public set selected(value: boolean) {
        this._selected = value;
    }
}