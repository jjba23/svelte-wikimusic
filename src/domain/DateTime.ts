import date from "date-and-time";

export const toEuropeanTimestamp = (instant: Date) => {
    const utcDate = new Date(instant);
    return date.format(utcDate, "HH:mm:ss - DD/MM/YYYY");
};

export const toEuropeanDate = (instant: Date) => {
    const utcDate = new Date(instant);
    return date.format(utcDate, "DD/MM/YYYY");
};
