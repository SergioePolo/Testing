import { TestBed } from "@angular/core/testing";
import { LoginService } from "./login.service";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting, HttpTestingController } from "@angular/common/http/testing";

describe('Entorno de pruebas del servicio de Login', () => {

    //Se deben definir los mock -> Donde se simulan las peticiones API reales con información ficticia y sin enviar una petición a la API

    //1. Configuración inicial del entorno de pruebas
    let httpMock: HttpTestingController;
    let service: LoginService;
    const credentialsMock = {
        email: 'sergio@gmail.com',
        password: '12334567'
    }
    const tokenMock = 'mahlfgqonvsodughaskvnañskghoñwaehiqoncv<oirop';


    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                LoginService,
                provideHttpClient(),
                provideHttpClientTesting(),
            ]
        })

        httpMock = TestBed.inject(HttpTestingController);
        service = TestBed.inject(LoginService);
    });

    it('Case 1: Sumilation of he post query...', () => {
        const apiUrl = 'http://localhost:9000/iniciarSesion';
        const responseMock = { msg: 'Inicio de sesión exitoso' }
        service.login(credentialsMock.email, credentialsMock.password).subscribe(
            (res) => {
                expect(res).toEqual(responseMock);
            }
        );
        //Simulación de petición a un back
        const req = httpMock.expectOne(apiUrl)//Nos dice que la simulación sea igual a la url dada
        expect(req.request.method).toBe('POST');
        req.flush(responseMock);
    })

    it('Case 2: get Data...', ()=>{
        localStorage.setItem('token', tokenMock);
        expect(service.getToken()).toBe(tokenMock); //Debe traer el mismo token almacenado en el localStorage
    })

    it('Case 3: Validation Loggued status...', ()=>{
        localStorage.setItem('token', tokenMock);
        expect(service.isLoggedIn()).toBeTrue();//Debe rerotnar verdadero si existe un token en el localStorage
    })

    it('Case 4: Validate logOut...', ()=>{
        localStorage.setItem('token', tokenMock);
        service.logout();
        expect(localStorage.getItem('token')).toBeNull();//No debe retornar nada sino validar si no hay token en el localStorage
    })
})