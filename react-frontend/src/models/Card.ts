import { Collection } from "./Collection";

export class Card {
    private _id: number;

    private _name: string;

    private _description: string;

    private _image: string;
    
    private _attack: number;

    private _defense: number;

    private _health: number;

    private _mainType: string;

    private _dropRate: number;

    private _rarity: number;

    private _collection: Collection;

    constructor(id, name, description, image, attack, defense, type) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._image = image;
        this._attack = attack;
        this._defense = defense;
        this._mainType = type;

    }

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
        
    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }
    

    public get image(): string {
        return this._image;
    }
    public set image(value: string) {
        this._image = value;
    }

    public get attack(): number {
        return this._attack;
    }
    public set attack(value: number) {
        this._attack = value;
    }

    public get defense(): number {
        return this._defense;
    }
    public set defense(value: number) {
        this._defense = value;
    }

    public get type(): string {
        return this._mainType;
    }

    public set type(value: string) {
        this._mainType = value;
    }
}