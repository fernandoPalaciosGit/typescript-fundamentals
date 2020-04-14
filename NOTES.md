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


BABEL + TYPESCRIPT
se puede usar typescript como checker de codigo, y babel como transpilador de modulos
esto permite dejar typescript con la configuracion de esNext (o alguna muy avanzada ES2020) para que babel sea el responsable de definir el target de los escripts y compilar tu codigo moderno al formato que se decida entregar al cliente