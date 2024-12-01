export function calculateExperience(difficulty: string, reward: number): number {
    switch (difficulty) {
        case "EASY":
            return 10 + reward;
        case "MEDIUM":
            return 20 + reward;
        case "HARD":
            return 50 + reward;
        default:
            return 0; // Si no se especifica dificultad
    }
}