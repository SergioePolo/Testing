import { loginUser } from "../src/controllers/user.controller.js";
import supertest from "supertest"; //Esto nos permite probar peticiones
import mongoose from "mongoose";
import { userModel } from "../src/models/users.model.js";
import bcrypt from "bcryptjs";
import app from '../app.js';

describe('Login function tests...', ()=>{
    //Configuración de las condiciones iniciales que usaran todos los casos de prueba
    const userTest = {
        fullName: 'Sergio',
        email:'sergio@gmail.com',
        password: '123'
    }

    //Procesos antes de cada caso de prueba 
    beforeEach (async ()=>{
        await userModel.deleteMany({});
    });
    
    //Procesos después de todos caso de prueba
    afterAll(async()=>{
        await mongoose.connection.close();
    });

    it('Case 1: Succesfull Login',async ()=>{

        const encryptedPassword = await bcrypt.hash(userTest.password, 10);
        await userModel({...userTest, password: encryptedPassword}).save();

        const response = await supertest(app).post('/iniciarSesion').send({
            emailLogin:'sergio@gmail.com',
            passwordLogin:'123'
        });

        expect(response.statusCode).toBe(200)
    })

    it('Case 2: User not registered', async ()=>{
        const encryptedPassword = await bcrypt.hash(userTest.password, 10);
        await userModel({...userTest, password: encryptedPassword}).save();

        const response = await supertest(app).post('/iniciarSesion').send({
            emailLogin:'jhon@gmail.com',
            passwordLogin:'123'
        });

        expect(response.statusCode).toBe(404)
    })

    it('Case 3: User wrong password', async ()=>{
const encryptedPassword = await bcrypt.hash(userTest.password, 10);
        await userModel({...userTest, password: encryptedPassword}).save();

        const response = await supertest(app).post('/iniciarSesion').send({
            emailLogin:'sergio@gmail.com',
            passwordLogin:'123456'
        });

        expect(response.statusCode).toBe(401)
    })
});