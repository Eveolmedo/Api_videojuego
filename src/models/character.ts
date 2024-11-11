export class Character {
    private _name: string;
    private _level: number;
    private _health: number;
    private _experience: number;
    private _inventory: string[];

    constructor(name: string, level: number, health: number, experience: number, inventory: string[]) {
        this._name = name
        this._level = level
        this._health = health
        this._experience = experience
        this._inventory = inventory
    }

    // Getter para obtener el nombre del personaje
    public get name(): string {
        return this._name
    }

    public get level(): number {
        return this._level
    }

    public get health(): number {
        return this._health
    }

    public get experience(): number {
        return this._experience
    }

    public get inventory(): string[] {
        return this._inventory;
    }

    // Setter modifica el valor de una propiedad privada, permite controlar como se asignan los valores
    public set name(value: string){
        this._name = value
    }

    public set level(value: number){
        this._level = value
    }

    public set health(value: number){
        this._health = value
    }

    public set experience(value: number){
        this._experience = value
    }

    public set inventory(value: string[]){
        this._inventory = value
    }
}

