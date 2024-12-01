import { characters } from "./characterController";
import { listEvents } from "../helpers/ListEvents";

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
            const randomEvent = listEvents[Math.floor(Math.random() * listEvents.length)];
    
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
        console.log("Presiona enter para continuar o 7 para salir");
        clearInterval(intervalId);
        resolve();
      }, 20000);
    });
}