import { Character } from "../models/Character";
import { Warrior } from "../models/Warrior";
import { Mage } from "../models/Mage";

export let characters: Character[] = []

export function createCharacter(name: string, level: number, health: number, type: "Warrior" | "Mage" = "Warrior"){ //Valor default warrior
    try {
        let character: Character;
    
        if (type === "Warrior") {
            character = new Warrior(name, level, health);
        } else {
            character = new Mage(name, level, health);
        }
    
        characters.push(character);
        return character;
    } catch (error) {
        return console.error("Error al crear un personaje", error)
    }
}

export function listCharacters(){
    try {
        return characters.length === 0 ? "Todavia no se agrego ningun personaje" : characters;
    } catch (error) {
        return console.error("Error al listar personajes", error);
    }
}

export function updateCharacter(name: string, level?: number, health?: number, experience?: number){
    try {
        let character = characters.find((character) => character.name === name)
        if (!character) return false; // En caso de que character sea undefined
    
        if (level !== undefined) character.level = level;
        if (health !== undefined) character.health = health;
        if (experience !== undefined) character.experience = experience;

    } catch (error) {
        console.error("Error al actualizar el personaje", error)
    }
}

export function deleteCharacter(name: string){
    try {
        return characters = characters.filter((character) => character.name !== name)
    } catch (error) {
        console.error("Error al eliminar el personaje", error)
    }
}