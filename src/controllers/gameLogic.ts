import { characters } from "./characterController";
import { Mission, MissionType } from "../models/mission";
import { calculateExperience } from "../helpers/Experience";
import { calculateSuccessProbability } from "../helpers/Probabilities";
import { getRandomMissionType, missionReward } from "../helpers/MissionType";

let missions: { [characterName: string]: Mission[] } = {};

export function assignMission(characterName: string, description: string, difficulty: string, reward?: number, type?: MissionType) {
    try {
        type = getRandomMissionType();
        reward = missionReward(type)
        const mission = new Mission(description, difficulty, reward, type);
        if (!missions[characterName]) missions[characterName] = []
        missions[characterName].push(mission);
    } catch (error) {
        return console.error("Error al asignar la mision", error);
    }
}

export function listMissions(characterName: string): Mission[] | null {
    return missions[characterName] || null;
}

export function startMissions(characterName: string, callback: Function): void {
    let characterMissions = missions[characterName];
    let missionIndex = 0
    
    function nextMission() {
        try {       
            if (characterMissions.length != 0) {
                completeMission(characterName, missionIndex)
                    .then(() => {
                        nextMission(); // Continuar con la siguiente misión
                    })
                    .catch((error) => {
                        console.log(`La mision "${characterMissions[missionIndex].description}" falló ${error}`);
                    });
            } else {
                console.log('Todas las misiones han sido procesadas');
            }
        } catch (error) {
            console.error("Error en la secuencia de misiones", error);
            callback(error);
        }
    }
    
    nextMission(); // Iniciar el proceso de misiones
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
        
        try {
            const mission = characterMissions[missionIndex];
            if (mission) {
                const successProbability = calculateSuccessProbability(character.level, mission.difficulty);
                console.log(`Probabilidad de éxito: ${(successProbability * 100).toFixed(2)}%`);
                // Aumentamos la experiencia
                if (successProbability >= Math.random()) {
                    character.level++
                    let xp = calculateExperience(mission.difficulty, mission.reward)
                    console.log(`¡Misión completada! Ganas ${xp} puntos de experiencia.`);
                    console.log(`${character.name} sube de experiencia a ${character.experience + xp} y ahora es nivel ${character.level}`)
                    characterMissions.splice(missionIndex, 1); // Eliminamos la mision completada
                    resolve(true); // Mision completada con éxito
                } else {
                    console.log("No hubo exito en la mision")
                    return reject(`Intentalo de nuevo.`);
                }
            }
        } catch (error) {
            console.error("Error al completar la mision", error)
        }
    });
}

