import { Character } from "../models/Character";
import { Warrior } from "../models/Warrior";
import { Mage } from "../models/Mage";
import { Mission, MissionType } from "../models/Mission";

let characters: Character[] = []

export function createCharacter(name: string, level: number, health: number, type: "Warrior" | "Mage" = "Warrior"){
    let character: Character;
  
    if (type === "Warrior") {
        character = new Warrior(name, level, health);
    } else {
        character = new Mage(name, level, health);
    }
  
    characters.push(character);
    return character;
}

export function listCharacters(){
    return characters;
}

const updateCharacter = (name: string) => {

}

const deleteCharacter = (name: string) => {
    return characters = characters.filter((character) => character.name !== name)
}