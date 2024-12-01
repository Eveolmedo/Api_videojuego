type listEvents = {
    type: "encounter" | "health" | "trap";
    message: string;
    effect: (character: any) => void;
};
  
export let listEvents: listEvents[] = [
  {
    type: "encounter",
    message: "Esta zona esta llena de zombies que te rodean.",
    effect: (character) => {
      character.health -= 20;
      console.log("Pierdes 20 puntos de salud.");
    },
  },
  {
    type: "health",
    message: "¡Has encontrado una planta verde!",
    effect: (character) => {
      character.health += 5;
      console.log("Recuperas 5 de salud");
    },
  },
  {
    type: "trap",
    message: "Pisaste una trampa para osos.",
    effect: (character) => {
      character.health -= 10;
      console.log("Pierdes 10 puntos de salud.");
    },
  },
  {
    type: "encounter",
    message: "Te encontraste al buhonero",
    effect: (character: { inventory: string[] }) => {
        const items = ["Linterna", "Mapa", "Planta"];
        const item = items[Math.floor(Math.random() * items.length)];
      
        if (!character.inventory.includes(item)) {
          character.inventory.push(item);
          console.log(`Compras un(a) ${item}`);
        } else {
          console.log(`El buhonero te ofrece un(a) ${item}, pero ya lo tienes`);
        }
    }
  },
];