typessvript se ejecuta en tiempo de compilacion
no se ejecuta ni interpreta en el navegador, asi que el tipado solo se valida en tiempo de compilacion
traduce su lenguaje en un codigo vanilla javascript
permite que un lenguaje fuertemente typado que evita comprobaciones de tipo en el programa (aligera la ejecucion)
la mayoria de codigo javascript puede interpretarlo el compilador de Typescript, excluyendo algunos casos 

PARTES DEL COMPILADOR DE TYPESCRIPT
- lenguaje: tokens
- lenguaje de servidor: permite hacer queris sobre el estado del codigo, lo aprovechan los ides y consolas para notificar
- compiler: type-checking + transpilador de codigo


CONFIGURACION del compilador: tsconfig.json
{"target": "ES5, ES2015, ES2017"}
nos permite defnir el scope del estandar requerido para la compilacion del archivo javascript
por lo tanto definira el nivel de complejidad del archivo javascript creado

{"module": "commonjs"}
tpo de encapsulcion compilada
depende del entorno en el que se ejecutaria el script, por ejemplo se definira commonjs si se utiliza el interprete de nodeJS 


### BABEL + TYPESCRIPT
se puede usar typescript como checker de codigo, y babel como transpilador de modulos
esto permite dejar typescript con la configuracion de esNext (o alguna muy avanzada ES2020) para que babel sea el responsable de definir el target de los escripts y compilar tu codigo moderno al formato que se decida entregar al cliente

### INFERENCIA DE TIPOS
No es necesario declarar el tipo de todas nuestras variables, typescript resuelve el tipo por inferencia del valor asignado a la variable, y nos avisa si reasignamos el valor con otro tipo.

los argumento de metoddo sSI los debemos declara porque no son explicitos desde fuera. Pero si son variables de tipos smples que manejamos desde bloques, NO es necesario declararlos.

RECOMENDACION: si estamos desarrollando para una libreria SI es conveniente, de esta manera el cliente que la requiera es capaz de saber el tipo fuera del compilador de typscript. pero normalmente NO es necesario porque nuestro IDE interpreta por inferencia el tipo y nos alerta adecuadamente.

### TOP TYPES (Any wilcard)
cuando una variable declarada NO se le asigna un valor o un tipo determinado, typescript le asigna el tipo Any
Este un caso donde tyescript permitiria la reasignacion con distiintos tipos de valor en el mismo espacio de memoria.

## INTERSECTION OR UNION OPERATORS en Obejetos
esto es para inicializar una variable con la combincion de diferentes tipos de interfaces
INTERSECTION: todas las propiedades y sus tipos deben aparecer en el objeto declarado
UNION: solo se puede acceder a las propiedades que coincidan

### OVERLOAD SIGNATURES
cada parametro de metodo puede sebreescribirse con varios tipos

### CONTEXT DEFINITION INTO SIGNATURE
podemos definir el tipo de 'this' en la firma del metodo

### INTERFACES VS TYPE ALIASES
definicion de esructura de datos
los aliases se utilizan para nombrar tipos compuestos, extienden las funciones de las interfaces, don mucho mas flecibles.
las interfaces están limitadas a nombrar los tipos de los objetos, arrays y funciones.
los type se pueden combinar por interseccion o union de tipos.
las "auto referencias" no funcionan con los tipos, typescript entra en error cuando encuentra un tipo referenciado circularmente
los type son eagle (permiten la definicion instantanea de tipos), las interfaces son lazy (se pueden combinar con tipos y redefinir la interfaz)

### DICTIONARY OBJECTS
en una interfaz definimos los tipos de propiedades

INDEX SIGNATURE
OPEN INTERFACES: augment types from external resources
ACCESS MODIFIER KEYWORD: visibility of the scope of the variables 
INHERITANCE CLAUSES: different from intersection or union operators.


### CLASSES
ACCESS MODIFIER KEYWORDS: declaración de los miembros especificas
es una manera que tiene typescript de evitar re declarar multiples veces los miembros implementados por una clase

`public`: miembro al que se puede acceder desde la instancia de clase
`private`: miembro que solo es accesible dentro de la clase
`protected` : miembro que es accesible dentro de la clase y la subclase
`readonly`: miembro publico solo de lectura: NO es realmente un modificador de acceso, porque solo funcina a nivel de ts cheker, 

estos modifcadores de acceso tienen que corresponder con los valores de visibilidad de las interfaces que implementan las clases (si las hubiera): `esto quiere decir que las reglas que implementa una clase de una interfaz son conformes si son publicas y visibles desde fuera`

los valores por defecto de las interfaces que se implementan, tambien se aplican a los miembros declarados

## DEFINE ASSIGNMENT -> propiedades privadas
las propiedades privadas se deben inicializar o injectar por constructor
simplemente te alerta de que un miembro internamente podrá accede a una propiedad privada SIN INICIALIZAR y esto no lo permite typescript

## LAZY INITIALIZATION -> propiedades privadas
{private lazyProperty!: number}
esto avisa al compilador que esta propiedad se inicializara posteriormente a la instanciacion de clase


### DURANTE LA TRANSICIÓN A TYPESCRIPT
 
- evitar cambios funcionales: no se deben validar los tipos funcionalmente
- ceñirse al testing de bajo nivel: afectado por el primer punto, no se deben extender los test debidos a ka migracion a typescript
- no ofuscarse con el strong typing que proporciona typescript: el objetivo de la migracion es aprovechar progresivamente el type checker y su compilador.
- testear los types en la medida de lo posible (dtslint: libreria que nos permite testear type information)
- publicar los types para las librerias que lo consuman

`PRIMER PASO` -> errores de compilación a bajo nivel
transformar a bajo nivel los archivos js -> ts, peromitiendo que todos los test pasen y que todos los tipos se declaren a traves de `any` type -> tipo implicito siempre y cuando el compilador de typescript lo permita, para recirdar, la inferencia de tipos en typescript solo ocurre en una direccion (de arriba [variable declarada] hacia abajo [variable asignada])
>
```typescript
function naming (name, password = 123) {
  name.split(','); // inferencia any; como el argumento [name] esta declarado como any, se puede usar como si fuera un array
  password = `${name}`; // inferencia number | undefined --> Error porque no se puede tratar como un string
}
```

`SEGUNDO PASO` -> eliminar any implicito
se trata de añadir la opcion en la configuracion del ts compile: **{"noImplicitAny": true}**
lo que significara es que habra un error de compilacion cuando aparezca un any por inferencia de tipos.
por lo tanto habra que pasar todos los tipos explicitamente, y donde NO se pueda habra que añdir explicitamente el tipo **any**


`TERCER PASO` -> activar los strict checks
**{"strictNullChecks": true}** : no se puede definir valores con null. Solo en las variables que si puedan devolver valores null, se podrá combinar el tipo con null: `private age: string | null`
**{"strict": true}**
**{"strictFunctionTypes": true}** para los tipos argumentos y valores retornados
**{"strictBindCallApply": true}** para los tipos de los callback bindeadon

este paso es el mas extenso, por lo que se debera comitar en pasos
especialmente hay que evita el casting de tipos (esto sobre-escribe el funcionamiento del type checker)