export enum MissionType {
    Main = "Main",
    Side = "Side",
    Event = "Event",
}

export class Mission {
    private _description: string;
    private _difficulty: string;
    private _reward: number;
    private _type: MissionType;

    constructor (description: string, difficulty: string, reward: number, type: MissionType){
        this._description = description;
        this._difficulty = difficulty;
        this._reward = reward;
        this._type = type;
    }

    public get description(): string {
        return this._description
    }

    public get difficulty(): string {
        return this._difficulty
    }

    public get reward(): number {
        return this._reward
    }

    get type(): MissionType {
        return this._type;
    }

    public set description(value: string){
        this._description = value
    }

    public set difficulty(value: string){
        this._difficulty = value
    }

    public set reward(value: number){
        this._reward = value
    }

    set type(value: MissionType) {
        this._type = value;
    }
}