import { Card } from "./Card";

export class Banner {
    private _id: number;

    private _title: string;

    private _description: string;

    private _cost: number;

    private _guaranteedSSR: boolean;

    private _startDate: Date;
    
    private _endDate: Date;

    private _isActive: boolean;

    private _imageUrl: string;

    private _summonableCards: Card[];

    private _featuredCards: Card[];

    constructor(id: number,
        title: string,
        description: string,
        cost: number,
        guaranteedSSR: boolean,
        startDate: Date,
        endDate: Date,
        isActive: boolean,
        imageUrl: string,
        summonableCards: Card[],
        featuredCards: Card[]) {
            this._id = id
            this._title = title 
            this._description = description
            this._cost = cost
            this._guaranteedSSR = guaranteedSSR
            this._startDate = startDate
            this._endDate = endDate
            this._isActive = isActive;
            this._imageUrl = imageUrl;
            this._summonableCards = [...summonableCards]
            this._featuredCards = [...featuredCards]
    }

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
    public get title(): string {
        return this._title;
    }
    public set title(value: string) {
        this._title = value;
    }

    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }

    public get cost(): number {
        return this._cost;
    }
    public set cost(value: number) {
        this._cost = value;
    }
    public get guaranteedSSR(): boolean {
        return this._guaranteedSSR;
    }
    public set guaranteedSSR(value: boolean) {
        this._guaranteedSSR = value;
    }
    public get startDate(): Date {
            return this._startDate;
        }
    public set startDate(value: Date) {
        this._startDate = value;
    }
    public get endDate(): Date {
        return this._endDate;
    }
    public set endDate(value: Date) {
        this._endDate = value;
    }
    public get isActive(): boolean {
        return this._isActive;
    }
    public set isActive(value: boolean) {
        this._isActive = value;
    }
    public get imageUrl(): string {
        return this._imageUrl;
    }
    public set imageUrl(value: string) {
        this._imageUrl = value;
    }
    public get summonableCards(): Card[] {
        return this._summonableCards;
    }
    public set summonableCards(value: Card[]) {
        this._summonableCards = value;
    }
    public get featuredCards(): Card[] {
        return this._featuredCards;
    }
    public set featuredCards(value: Card[]) {
        this._featuredCards = value;
    }
}