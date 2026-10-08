let apples: number = 5;

let now: Date = new Date();


//array
let fruits: string[] = ["apple", "banana", "cherry"];

let numbers: Array<number> = [1, 2, 3, 4, 5];

let mixed: (string | number)[] = ["apple", 1, "banana", 2];

type mix = {
    name: string;
    age: number;
};

let john: mix = {
    name: "John",
    age: 30
};

let arrrayOfObjects: mix[] = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 35 }
];

//FUnction
const logNumber: (i: number) => void = (i: number) => {
    console.log(i);
};

function add(a: number, b: number): number {
    return a + b;
}

const result: number = add(5, 10);

//Void function
function logMessage(message: string): void {
    console.log(message);
}

logMessage("Hello, TypeScript!");

//Optional parameters
function greet(name: string, greeting?: string): string {
    return `${greeting || "Hello"}, ${name}!`;
}

const json = '{"name": "Alice", "age": 25}';

const parsed = JSON.parse(json);

console.log(parsed);

let numbers2: number[] = [-101, 22, -3, 24, -53];
let numberAboveZero2: boolean | number = false;
let numberAboveZero: number[] = numbers2.filter((num) => num > 0);