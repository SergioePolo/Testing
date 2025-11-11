//Un archivo .test es donde se crean de la aplicación 
//En cada archivo test esta agrupadas las pruebas enfocadas a cada temática

//IMPORTACIONES
import { sum } from "../src/utils/example.js";

//DESARROLLO

/*Existen dos tipos de casos de prueba
    1. Bloques de prueba que se encarga de probar métodos completos 
    Estos son iniciados con la siguiente estructura -> describe(descripción, función flecha)
    2. Casos individuales
    Estos son iniciados con la estructura -> it (descripción, función flecha)
*/

describe('Test sum function...', ()=>{
    //Aquí se describen los casos que se van a probar con el método

    it('Postive number test', ()=>{
        expect(sum(2,3)).toBe(5);
    })

    it('Negative nummer test', ()=>{
        expect(sum(-1,-5)).toBe(-6);
    })

    it('Decimal number tes', ()=>{
        expect(sum(4.4,1.5)).toBe(5.9)
    })


})