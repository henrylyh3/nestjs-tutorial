function add (a: number, b: number): number {
    return a + b;
}

function subtract (a: number, b: number): number {
    return a - b;
}

function multiply (a: number, b: number): number {
    return a * b;
}

function divide (a: number, b: number): number {
    if (b === 0) {
        throw new Error("Division by zero is not allowed.");
    }
    return a / b;
}
const logger = (message: string): void => {
    console.log(message);
}

const throwError = (message: string): never => {
    throw new Error(message);
}

const forecast = {
    date: new Date(),
    weather: "sunny"
}

const logWearrher = (forecast: { date: Date; weather: string }): void => {
    console.log(forecast.date);
    console.log(forecast.weather);
}
logWearrher(forecast);



