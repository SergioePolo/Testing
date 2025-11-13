
import { TestBed } from '@angular/core/testing'; //TestBed configura el entorno de pruebas 
import { EjemploService } from './ejemplo.service'; //Servicio o ponentes a probar

describe('EjemploService', () => {
  let service: EjemploService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EjemploService]
    });
    service = TestBed.inject(EjemploService);
  });


  it('Debería sumar 2 números correctamente', ()=>{
    const resultado = service.suma(2,5);
    expect(resultado).toBe(7);
  })
});
