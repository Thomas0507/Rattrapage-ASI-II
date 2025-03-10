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
    
    private _price: number;

    private _resellPrice: number;



    constructor(id?: number, name?: string, description?: string, image?: string, attack?: number, defense?: number, health?: number, mainType?: string,
        dropRate?: number, rarity?: number, collection?:Collection, price?: number, resellPrice?: number) {
        this._id = id || 0;
        this._name = name || "0";
        this._description = description || "0"; 
        this._image = image || "0";
        this._attack = attack || 0;
        this._defense = defense || 0;
        this._health = health || 0;
        this._mainType = mainType || "0";
        this._dropRate = dropRate || 0;
        this._rarity = rarity || 0;
        this._collection = collection || new Collection();
        this._price = price || 0;
        this._resellPrice = resellPrice || 0;
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

    public get health(): number {
        return this._health;
    }
    public set health(value: number) {
        this._health = value;
    }

    public get mainType(): string {
        return this._mainType;
    }

    public set mainType(value: string) {
        this._mainType = value;
    }

    public get dropRate(): number {
        return this._dropRate;
    }
    public set dropRate(value: number) {
        this._dropRate = value;
    }
    public get rarity(): number {
        return this._rarity;
    }
    public set rarity(value: number) {
        this._rarity = value;
    }

    public get collection(): Collection {
        return this._collection;
    }
    public set collection(value: Collection) {
        this._collection = value;
    }

    public get price(): number {
        return this._price;
    }

    public set price(value: number) {
        this._price = value;
    }

    public get resellPrice(): number {
        return this._resellPrice;
    }
    public set resellPrice(value: number) {
        this._resellPrice = value;
    }
    
}