// las clases se pueden usar como tipos o como variables
export class MyClass {
}

const MyFirstClass = MyClass;
const MySecondClass: MyClass = new MyClass(); // class as type and as prototype of instances

// las clases, las interfaces y los namespace pueden mergear sus declaraciones sin colisionar
interface SimpSon {
    habilites: string[];
}

namespace SimpSon {
}

class SimpSon {
    get name() {
        return 'Hommer';
    }
}

const myPet: SimpSon = new SimpSon();
myPet.habilites // from the interface
myPet.name // from the Class

// los namespaces también pueden colisionar clases
export class IndyGame {
}

export namespace RetroArea {
    export class IndyGame {
    }
}

const myGame: IndyGame = new RetroArea.IndyGame();
const myOtherGame: IndyGame = new IndyGame();

// los namespace también pueden colisionar con las funciones
function getCurrency(currency: string) {
    return {
        getFormat: (value: number) => `${currency} ${value}`
    }
}

namespace getCurrency {
    const currency = '$';
    export const getFormat = (value: number) => `${currency} ${value}`
}

getCurrency('€').getFormat(654);
getCurrency.getFormat(987);
