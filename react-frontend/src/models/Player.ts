import { Card } from "./Card";

export class Player {
    private _id: number;
    private _username: string;
    private _cards: Card[];
    private _cash: number;

    constructor(id, username, cards, cash) {
        this._id = id;
        this._username = username;
        this._cards = cards;
        this._cash = cash;
    }

    public get id() {
        return this._id;
    }
    public get username() {
        return this._username;
    }
    public get cards() {
        return this._cards;
    }
    public get cash() {
        return this._cash;
    }
    public set id(id: number) {
        this._id = id;
    }
    public set username(username: string) {
        this._username = username;
    }
    public set cards(cards: Card[]) {
        this._cards = cards;
    }
    public set cash(cash: number) {
        this._cash = cash;
    }
}