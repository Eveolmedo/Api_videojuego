import { MissionType } from "../models/mission";

export function getRandomMissionType(): MissionType {
    const missionTypes = Object.values(MissionType); 
    const randomIndex = Math.floor(Math.random() * missionTypes.length);
    return missionTypes[randomIndex] as MissionType;
}

export function missionReward(type: string): number {
    switch (type) {
        case "Main":
            return 100;
        case "Side":
            return 50;
        case "Event":
            return 80;
        default:
            return 0; 
    }
}