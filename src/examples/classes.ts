// CLASSES BAD
export class User implements simplePhone {
    areaCode: number;
    number: number;

    constructor(areaCode: number, number: number) {
        this.areaCode = areaCode;
        this.number = number;
    }
}

// CLASSES BETTER
export class UserWithModifiers implements HasPhoneNumber {
    readonly SPECIE: string = 'homo sapiens'; // like a final modifier: only access to the same peace of memory (not really, only type checker)
    protected age: number = 0;

    constructor(
        public person: string, // obliga a inicializarla desde la  instancia
        public phone: number = 111
    ) {

    }

    // create a public member {this.myAge} to access the protected value
    get myAge() {
        return this.age;
    }
}

const user = new UserWithModifiers('nando');
user.phone // default value : I dont need to instance initialize
user.age // $ExpectError protected member
user.myAge
user.SPECIE = 'do not rewrite'; // $ExpectError readonly modifier -> this could be overriden as a library because this Error hasonly expected at rtpescript checker level, not at the result in compiled code.

// CLASSES INITIALIZATION
export class Cars {
    private wheel: number; // $ExpectError siempre se debe inicializar una propiedad privada
    private wheelNoInit: number | undefined // OK: sin inicializar -> el compilado la ignorará si no la usa
    private wheelLazy !: number; // LAZY INITIALIZATION

    constructor(
        public roadType: string
    ) {
        if (roadType === 'deportivo') {
            this.wheel = 2; // $ExpectError falla incluso si se inicializa de esta manera: dependiendo del valor de ora propiedad
        }
    }

    async init() {
        this.wheelLazy = this.wheel;
    }
}

const myCar = new Cars('4x4')
myCar.init().then(() => console.log(myCar));

// LAZY INITIALIZATION WITH ANOTHER PROPERTY
export class UserPassword {
    private initialPass!: string;

    get password(): string | Error {
        if (!this.initialPass) { // not really needed
            throw new Error('not yet initialized')
        }
        return this.initialPass;
    }

    async initPassword(): Promise<void> {
        this.initialPass = '123';
    }
}

const userPass = new UserPassword();
userPass.password // will throw Error
userPass.initPassword().then(() => userPass.password); // would return private initialPass value
