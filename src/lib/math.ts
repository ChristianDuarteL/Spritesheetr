import { Gap } from "../providers/arrangement";

export const safeParseInt = (str: string, defaultValue: number = 0) => {
    const parsed = parseInt(str);
    if (isNaN(parsed)) return defaultValue;
    return parsed;
}

export const setGapComponent = (gap: Gap, component: (0 | 1), value: number): Gap => {
    const gapClone: Gap = [...gap];
    gapClone[component] = Math.max(0, value);
    return gapClone;
}