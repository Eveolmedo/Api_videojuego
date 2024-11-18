import { Character } from "../models/Character";
import { Warrior } from "../models/Warrior";
import { Mage } from "../models/Mage";
import { Mission, MissionType } from "../models/Mission";
import { gameEvents } from "../helpers/GameEvent";
import { calculateExperience } from "../helpers/Experience";
import { calculateSuccessProbability } from "../helpers/Probabilities";

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

export function completeMission(characterName: string, missionIndex: number): Promise<boolean> {
    const character = characters.find(c => c.name === characterName);
    const characterMissions = missions[characterName];
    
    return new Promise((resolve, reject) => {
        if (!character) {
            return reject('El Personaje no existe');
        } else if (!characterMissions) {
            return reject('El Personaje no tiene misiones asignadas');
        }
        
        const mission = characterMissions[missionIndex];
        if (mission) {
            const successProbability = calculateSuccessProbability(character.level, mission.difficulty);
            console.log(`Probabilidad de éxito: ${(successProbability * 100).toFixed(2)}%`);
            // Aumentamos la experiencia
            if (successProbability >= Math.random()) {
                character.level++
                let xp = calculateExperience(mission.difficulty) + mission.reward
                console.log(`¡Misión completada! Ganas ${xp} puntos de experiencia.`);
                console.log(`${character.name} sube de experiencia a ${character.experience + xp} y ahora es nivel ${character.level}`)
            } else {
                return reject(`La misión falló. Intentalo de nuevo.`);
            }
            characterMissions.splice(missionIndex, 1); // Eliminamos la mision completada
            return resolve(true); // Mision completada con éxito
        }
    });
}

export function listMissions(characterName: string): Mission[] | null {
    return missions[characterName] || null;
}

export function startMissions(characterName: string, callback: Function): void {
    let characterMissions = missions[characterName];
    let missionIndex = 0;

    function nextMission() {
        if (missionIndex < characterMissions.length) {
            completeMission(characterName, missionIndex)
                .then(() => {
                    console.log(`Misión "${missionIndex} completada con exito`);
                    missionIndex++;
                    nextMission(); // Continuar con la siguiente misión
                })
                .catch((error) => {
                    console.log(`Fallo en la misión "${missionIndex}": ${error}`);
                    callback(error); // Llamamos al callback si hay un error
                });
        } else {
            console.log('Todas las misiones han sido procesadas');
        }
    }
    
    nextMission(); // Iniciar el proceso de misiones
}

export async function triggerEvent(name: string): Promise<void> {
    const character = characters.find((char) => char.name === name);
  
    // Validacion de la existencia del personaje
    if (!character) {
        return Promise.reject(`No se encontró un personaje con el nombre ${name}`);
    }

    console.log("Iniciando generación de eventos aleatorios...");
  
    const intervalId = setInterval(async () => {
        try {
            // Seleccionar un evento aleatorio
            const randomEvent = gameEvents[Math.floor(Math.random() * gameEvents.length)];
    
            // Verificar si el personaje puede participar
            if (character.health <= 20) {
                return Promise.reject(`El personaje ${character.name} tiene poca vida (${character.health}) y no puede participar en el evento`);
            }
    
            console.log(`Evento: ${randomEvent.message}`); // Escribe el mensaje del evento 

            // Aplicar el efecto del evento
            randomEvent.effect(character);
    
            console.log(`Estado actual del jugador:`, character);
    
            // Detener el intervalo si el personaje muere
            if (character.health <= 0) {
                console.log("El jugador ha muerto. Fin del juego");
                clearInterval(intervalId);
            }
        } catch (error) {
        console.error(`Error:`, error);
        clearInterval(intervalId); // Detenemos los eventos si ocurre un error
        }
    }, 5000);
  
    // Opcion para detener automaticamente despues de un tiempo
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log("Los eventos terminaron, estas a salvo por ahora...");
        clearInterval(intervalId);
        resolve();
      }, 20000);
    });
}
