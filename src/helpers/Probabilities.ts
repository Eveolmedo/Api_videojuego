export function calculateSuccessProbability(level: number, difficulty: string): number {
    let baseProbability = 0;
    
    switch (difficulty) {
        case "EASY":
            baseProbability = 0.8;
            break;
        case "MEDIUM":
            baseProbability = 0.5;
            break;
        case "HARD":
            baseProbability = 0.2;
            break;
    }

    // Incrementar probabilidad segun nivel del personaje
    const adjustedProbability = baseProbability + level * 0.02;
    return Math.min(adjustedProbability, 1); // Asegurar que no pase del 100%
}