const myAny: any = 321;
const myUnknown: unknown = 321;

myAny.foo.bar.bizz; // any could receive any type of value
myUnknown.foo.bar.bizz; // $ExpectError unknown value must be check before assignment

// GOOD FOR ANY: Promise of any type
const logPromise = async (promise: Promise<any>) => {
    const response = await promise;
    console.log(response);
}

//GOOD FOR UNKNOWN: some part of the application that we wouldn't manage: apis, external modules, interfaces del sistema
if (typeof myUnknown === 'number') {
    Math.ceil(myUnknown);
} else if (Array.isArray(myUnknown)) {
    myUnknown.join(',');
}

// TYPE GUARD
export type HasEmail = {
    email: string;
}

const contact = { name: 'fer' };
const hasEmail = (contactFromLib: any): contactFromLib is HasEmail => {
    return typeof contactFromLib.email === 'string' && contactFromLib.email.length > 0;
}
hasEmail(contact);
//-------------
const isDefined = <T>(variable: T | undefined): variable is T => {
    return typeof variable !== 'undefined';
}
isDefined('string')
isDefined(undefined)

// UNKNOWN PUEDE OPACAR LOS TIPOS: ejemplo de casting de tipos
export interface BrandChannel {
    channel: string;
}

const getBrandType = (brand: string): BrandChannel => {
    return brand as unknown as BrandChannel; // Casting
}

const getBrandTypeString = (brand: BrandChannel): string => {
    return brand as unknown as string; // Casting
}

const myBrand = { channel: 'OTH' };
getBrandType(JSON.stringify(myBrand));
getBrandTypeString(myBrand);

