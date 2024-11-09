import { Character } from "./Character.js"

export class Warrior extends Character {
    private _attack: number;
    private _defense: number;

    constructor(name: string, level: number, health: number, experience: number, inventory: string[], attack: number, defense: number){
        // Super se utiliza dentro de una subclase para hacer referencia a la clase base 
        super(name, level, health, experience, inventory) // Asegura que el const. de la clase character tambien se ejecute
        this._attack = attack;
        this._defense = defense;
    }

    // Getters
    public get attack(): number {
        return this._attack;
    }

    public get defense(): number {
        return this._defense;
    }

    // Setters
    public set attack(value: number) {
        this._attack = value;
    }

    public set defense(value: number) {
        this._defense = value;
    }

    public increaseResistance() {
        this._defense += 5;  // Incremento en defensa
        console.log(`${this.name} aumenta su resistencia en combate!`);
    }
}