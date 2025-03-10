import { GameCard } from "./GameCard";
import { Player } from "./Player";

export class GamePlayer {
    private _id: number;
    private _playerName: string;
    private _cards: GameCard[];
    private _cash: number;
    private _isBottom: boolean;   
    private _actionPoint: number;

    
    constructor(id?: number, username?: string, cards?: GameCard[], cash?: number, isBottom?: boolean, actionPoint?: number) {
            this._id = id || 0;
            this._playerName = username || "";
            this._cards = cards || [];
            this._cash = cash || 0;
            this._isBottom = isBottom || false;
            this._actionPoint = actionPoint || 0
        }
    
    public get id() {
        return this._id;
    }
    public get playerName() {
        return this._playerName;
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
    public set playerName(username: string) {
        this._playerName = username;
    }
    public set cards(cards: GameCard[]) {
        this._cards = cards;
    }
    public set cash(cash: number) {
        this._cash = cash;
    }
    public get isBottom(): boolean {
        return this._isBottom;
    }
    public set isBottom(value: boolean) {
        this._isBottom = value;
    }
    public get actionPoint(): number {
        return this._actionPoint;
    }
    public set actionPoint(value: number) {
        this._actionPoint = value;
    }
}