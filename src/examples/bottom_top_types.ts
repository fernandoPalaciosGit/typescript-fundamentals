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
