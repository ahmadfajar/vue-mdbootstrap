export const padLeft = (str, targetLength = 2, padString = '0') => {
    targetLength = targetLength >> 0;
    str = String(str);
    padString = String(padString);
    if (str.length > targetLength) {
        return String(str)
    }

    targetLength = targetLength - str.length;
    if (targetLength > padString.length) {
        padString += padString.repeat(targetLength / padString.length);
    }

    return padString.slice(0, targetLength) + String(str);
};

export const padRight = (str, targetLength = 2, padString = '0') => {
    targetLength = targetLength >> 0;
    str = String(str);
    padString = String(padString);
    if (str.length > targetLength) {
        return String(str)
    }

    targetLength = targetLength - str.length;
    if (targetLength > padString.length) {
        padString += padString.repeat(targetLength / padString.length);
    }

    return String(str) + padString.slice(0, targetLength);
};
