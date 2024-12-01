import { createCharacter, listCharacters, updateCharacter, deleteCharacter, characters } from "./characterController"
import { assignMission, startMissions, listMissions } from "./gameLogic";
import { triggerEvent } from "./gameEvent"
import { MissionType } from "../models/mission";
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function askQuestion(query: string): Promise<string> {
    return new Promise((resolve) => rl.question(query, resolve));
}


export async function startConsoleInterface() {
    console.log("Bienvenido al sistema de gestión de personajes.");

    while (true) {
        console.log("\nOpciones:");
        console.log("1. Crear un personaje");
        console.log("2. Listar personajes");
        console.log("3. Asignar mision a un personaje");
        console.log("4. Listar misiones de un pesonaje");
        console.log("5. Ejecutar misiones de un personaje");
        console.log("6. Salir");

        const option = await askQuestion("Elige una opción: ");

        switch (option) {
            case "1": {
                const name = await askQuestion("Nombre del personaje: ");
                const level = parseInt(await askQuestion("Nivel inicial: "), 10);
                const health = 100
                const type = await askQuestion("Tipo (Warrior/Mage): ") as "Warrior" | "Mage";

                createCharacter(name.toLocaleUpperCase(), level, health, type);
                console.log(`Personaje ${name} creado exitosamente.`);
                break;
            }
            case "2": {
                const characters = listCharacters()
                console.log(characters)
                break;
            }
            case "3": {
                const characterName = await askQuestion("Nombre del personaje: ");
                const description = await askQuestion("Descripción de la misión: ");
                const difficulty = await askQuestion("Dificultad (Easy/Medium/Hard): ");

                assignMission(characterName, description, difficulty);
                break;
            }
            case "4": {
                const name = await askQuestion("Nombre del personaje: ");
                const missions = listMissions(name)
                console.log(missions)
                break;
            }
            case "5": {
                const characterName = await askQuestion("Nombre del personaje: ");
                try {
                    startMissions(characterName, () => {});
                } catch (err) {
                    console.error(err);
                }
                
                break;
            }
            case "6": {
                console.log("Saliendo del sistema.");
                rl.close();
                return;
            }
            default:
                console.log("Opción no válida. Intenta nuevamente.");
        }
    }
}