export const get = <T>(key: string, defaultValue: T): T => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
};

export const set = <T>(key: string, value: T): void => {
    localStorage.setItem(key, JSON.stringify(value));
};