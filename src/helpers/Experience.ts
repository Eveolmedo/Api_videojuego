export function calculateExperience(difficulty: string): number {
    switch (difficulty) {
        case "EASY":
            return 10;
        case "MEDIUM":
            return 20;
        case "HARD":
            return 50;
        default:
            return 0; // Si no se especifica dificultad
    }
}