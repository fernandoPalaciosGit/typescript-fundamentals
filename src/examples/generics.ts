export interface HasNameByInterface<T> {
    name: T;
    age: T;
}

export type HasNameByType<T> = {
    name: T;
    age: T;
}

const testName: HasNameByInterface<string> | HasNameByType<string>
    = { name: 'Jooan', age: '231' };

// con valor por defecto definido
export interface FilterFunction<T = string> {
    (val: T): boolean
}

// se puede inicializar en función de lo que declare la implentacion del metodo, pero por defecto el tipo del generico lo define (en este caso) la interfax
const selectIfString: FilterFunction = (val) => typeof val === "string";
['654'].filter(selectIfString);
[54].filter(selectIfString); // $ExpectError : valor por defecto es nun string

const selectSomeIfString: FilterFunction<any> = (val) => typeof val === "string";
['654'].filter(selectSomeIfString);
[54].filter(selectSomeIfString);
[true].filter(selectSomeIfString);


// INFERENCIA DE GENERICOS
function resolveOrTimeoutExplicit<Response>(request: Promise<Response>, timeout: number): Promise<Response> {
    /****/
    return new Promise<Response>(() => {
        /****/
    });
}

function resolveOrTimeoutImplicit<T>(request: Promise<T>, timeout: number): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        const taskTimer = setTimeout(() => reject('time out'), timeout);

        request.then((val) => {
            clearTimeout(taskTimer);
            resolve(val);
        });
    });
}

resolveOrTimeoutExplicit(fetch(""), 3000).then((val) => console.log(val));
resolveOrTimeoutImplicit(fetch(""), 3000).then((val) => console.log(val));


// TYPE PARAMETERS (GENERICS) WITH CONSTRAINTS <extends
type ObjectIndex = { id: string };
type ReturnObjectIndex<T extends ObjectIndex> = (array: T[]) => { [val: string]: T }; // todo: ¿it is possible to apply this generic to s function declaration?

const returnDefaultObject = <T extends ObjectIndex>(array: T[]): { [val: string]: T } => {
    const out: { [val: string]: T } = {};
    return array.reduce((acc, val) => {
        acc[val.id] = val;
        return acc;
    }, out);
}

const obj = returnDefaultObject([{ id: 'test', code: 'AAA' }]);
returnDefaultObject([{ code: 'AAA' }]); // $ExpectError el parametro del generico debe extender del tipo ObjectIndex, que contiene un {id: string}
obj.test.code; // el linter nos permite descubrir las propiedades asignadas al objeto {[val: string]: T} gracias a la conversion por ele generico


// SCOPE PARAMETERS
const creatTuple = <T>(val1: T) => {
    // U not accesible at this level
    // return <U>(val2: U): [T, U] => [val1, val2];
    return <U>(val2: U) => [val1, val2] as [T, U];
}

const myTuple = creatTuple('34')(654);

// GENERIC INHERITANCE
interface Shape {
    draw(line: number): void
}

interface Circle extends Shape {
    radius: number;
}

function drawCircle<T extends Circle>(shapes: T[]) { // referencia a mas alto nivel
    shapes.forEach((shape) => shape.draw(shape.radius))
}

function drawCircleSame(shapes: Circle[]) { // referencia de tipos a amas bajo nivel
    shapes.forEach((shape) => shape.draw(shape.radius))
}

const circle = drawCircle([{
    draw() {
    }, radius: 654
}]);
