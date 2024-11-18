import { createCharacter, listCharacters, updateCharacter, deleteCharacter, assignMission, startMissions, listMissions, triggerEvent } from "./controllers/gameLogic";
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
assignMission("Leon", "Encontrarse con Wesker", 'EASY', 100, MissionType.Side);
assignMission("Ada", "Rescatar a Ashley", 'HARD', 500, MissionType.Main);

// Listar misiones
console.log(listMissions("Leon"));
console.log(listMissions("Ada"));

startMissions('Leon', () => {})

// Eliminar personaje
deleteCharacter("Ada");
console.log("Personajes despues de eliminar a Ada:");
console.log(listCharacters());
