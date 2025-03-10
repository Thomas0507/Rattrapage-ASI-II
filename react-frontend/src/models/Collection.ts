export class Collection {
    private _id: number;

    private _name: string;
    
    private _releaseDate: Date;

    constructor (id?: number, name?: string, releaseDate?: Date) {
        this._id = id || 0,
        this._name = name || "",
        this._releaseDate || Date.now()
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

    public get releaseDate(): Date {
        return this._releaseDate;
    }
    public set releaseDate(value: Date) {
        this._releaseDate = value;
    }
}