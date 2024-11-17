import { Character } from "../models/Character";
import { Warrior } from "../models/Warrior";
import { Mage } from "../models/Mage";
import { Mission, MissionType } from "../models/Mission";

let characters: Character[] = []
let missions: { [characterName: string]: Mission[] } = {};

export function createCharacter(name: string, level: number, health: number, type: "Warrior" | "Mage" = "Warrior"){ //Valor default warrior
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

export function updateCharacter(name: string, level?: number, health?: number, experience?: number): boolean {
    let character = characters.find((character) => character.name === name)
    if (!character) return false; // En caso de que character sea undefined

    if (level !== undefined) character.level = level;
    if (health !== undefined) character.health = health;
    if (experience !== undefined) character.experience = experience;

    return true;
}

export function deleteCharacter(name: string){
    return characters = characters.filter((character) => character.name !== name)
}


export function assignMission(characterName: string, description: string, difficulty: string, reward: number, type: MissionType): boolean {
    const character = characters.find(c => c.name === characterName);
    if (!character) return false;
    
    const mission = new Mission(description, difficulty, reward, type);
    if (!missions[characterName]) missions[characterName] = []
    missions[characterName].push(mission);
    return true;
}

export function completeMission(characterName: string, missionIndex: number): boolean {
    const character = characters.find(c => c.name === characterName);
    const characterMissions = missions[characterName];
    
    if (!character || !characterMissions || characterMissions.length <= missionIndex) return false;
    
    const mission = characterMissions[missionIndex];
    if (character.level > 10 && mission.difficulty === "HARD") {
      character.experience += mission.reward;
      characterMissions.splice(missionIndex, 1);
      return true;
    }
    
    return false;
  }

export function listMissions(characterName: string): Mission[] | null {
    return missions[characterName] || null;
}

