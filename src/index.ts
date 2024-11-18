import { createCharacter, listCharacters, updateCharacter, deleteCharacter, assignMission, completeMission, listMissions, triggerEvent } from "./controllers/gameLogic";
import { MissionType } from "./models/Mission";

// Crear personajes
const warrior = createCharacter("Leon", 11, 150, "Warrior");
const mage = createCharacter("Ada", 10, 120, "Mage");

// Listar personajes
console.log("Personajes creados:");
console.log(listCharacters());

// Actualizar personaje
updateCharacter("Leon", 12, 160 );
console.log("Leon actualizado:");
console.log(listCharacters());

// Asignar misiones
assignMission("Leon", "Rescatar a Ashley", 'HARD', 500, MissionType.Main);
assignMission("Ada", "Encontrarse con Wesker", 'EASY', 100, MissionType.Side);

// Listar misiones
console.log(listMissions("Leon"));
console.log(listMissions("Ada"));

// Completar una mision
if (completeMission("Leon", 0)) {
  console.log("Leon completo una mision y gano experiencia.");
} else {
  console.log("Leon fallo en la mision.");
}

// Eliminar personaje
deleteCharacter("Ada");
console.log("Personajes despues de eliminar a Ada:");
console.log(listCharacters());

triggerEvent("Leon")