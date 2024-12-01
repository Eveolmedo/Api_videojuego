import { createCharacter, listCharacters, updateCharacter } from "./characterController"
import { assignMission, startMissions, listMissions } from "./gameLogic";
import { triggerEvent } from "./gameEvent";
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
        console.log("4. Listar misiones de un personaje");
        console.log("5. Mejorar un pesonaje")
        console.log("6. Ejecutar misiones de un personaje");
        console.log("7. Salir");

        const option = await askQuestion("Elige una opción: ");

        switch (option) {
            case "1": {
                const name = await askQuestion("Nombre del personaje: ");
                const level = parseInt(await askQuestion("Nivel inicial: "), 10);
                const health = 100
                const type = await askQuestion("Tipo (Warrior/Mage): ") as "warrior" | "mage";

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
                const difficulty = await askQuestion("Dificultad (Easy/Medium/Hard):")  as "easy" | "medium" | "hard";

                assignMission(characterName.toLocaleUpperCase(), description, difficulty);
                break;
            }
            case "4": {
                const name = await askQuestion("Nombre del personaje: ");
                const missions = listMissions(name.toLocaleUpperCase())
                console.log(missions)
                break;
            }
            case "5": {
                const name = await askQuestion("Nombre del personaje: ");
                console.log("INGRESA UN 0 SI NO QUERES CAMBIAR ESA CARACTERISTICA")
                const level = parseInt(await askQuestion("Nuevo nivel: "));
                const health = parseInt(await askQuestion("Vida del personaje: "));
                const experience = parseInt(await askQuestion("Experiencia del personaje: "));
                updateCharacter(name.toLocaleUpperCase(), level, health, experience)
                console.log(listCharacters());
                break;
            }
            case "6": {
                const characterName = await askQuestion("Nombre del personaje: ");
                try {
                    startMissions(characterName.toLocaleUpperCase(), () => {});
                } catch (err) {
                    console.error(err);
                }
                triggerEvent(characterName.toLocaleUpperCase());
                break;
            }
            case "7": {
                console.log("Saliendo del sistema.");
                rl.close();
                return;
            }
            default:
                console.log("Opción no válida. Intenta nuevamente.");
        }
    }
}