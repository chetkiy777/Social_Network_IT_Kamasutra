export const required = value => {
    if (value) return undefined;
    return "Field is reqired";
};

export const maxLengthCreator = (maxLength) => value => {
    if (value.length > maxLength) return `max length is ${maxLength} symbols` ;
    return undefined;
};