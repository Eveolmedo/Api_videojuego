import { Character } from "./Character";

export class Mage extends Character {
    private _magicPower: number;
    private _mana: number;

    constructor(name: string, level: number = 1, health: number = 100, experience: number = 0, inventory: string[] = [], magicPower: number = 20, mana: number = 50){
        super(name, level, health, experience, inventory);
        this._magicPower = magicPower;
        this._mana = mana;
    }

    public get magicPower(): number {
        return this._magicPower
    }

    public get mana(): number {
        return this._mana
    }

    public set magicPower(value: number){
        this._magicPower = value
    }

    public set mana(value: number){
        this._mana = value
    }

    public castSpell() {
        if (this._mana <= 10) {
            this._mana -= 10 // Consume mana al lanzar el hechizo
            console.log(`${this.name} lanza un hechizo poderoso!`);
        } else {
            console.log(`${this.name} no tiene suficiente maná para lanzar un hechizo.`);
        }
    }
}