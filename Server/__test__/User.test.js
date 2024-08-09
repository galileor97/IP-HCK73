const app = require('../app')
const request = require('supertest')
const { test, expect, describe, beforeAll, beforeEach, afterAll, afterEach } = require('@jest/globals');
const { signToken } = require('../helper/jwt');
const { User } = require('../models')

let token

const newUser = {
    "username": "jane_smith",
    "email": "jane.smith@example.com",
    "password": "hashedpassword456"
}

beforeAll(async () => {
    let user = await User.create(newUser)
    token = signToken({ id: user.id })
})

afterAll(async () => {
    await User.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true
    });
});

describe('POST /login', () => {
    describe('Success', () => {
        test('When login success should return status 201 and send access_token', async () => {
            let login = {
                "email": "jane.smith@example.com",
                "password": "hashedpassword456"
            }
            let response = await request(app)
                .post('/login')
                .send(login);

            expect(response.status).toBe(201)
            expect(response.body).toBeInstanceOf(Object)
            expect(typeof response.body.access_token).toBe('string')
        });
    });

    describe('Failed', () => {
        test('When email is not provided should return status 400 and get message Email and Password is required', async () => {
            const loginData = {
                "password": "hashedpassword456"
            }

            const response = await request(app)
                .post('/login')
                .send(loginData);

            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty('message', 'Email and Password is required')
        });

        test('When password is not provided should return status 400 and get message Email and Password is required', async () => {
            const loginData = {
                "email": "jane.smith@example.com"
            }

            const response = await request(app)
                .post('/login')
                .send(loginData);

            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty('message', 'Email and Password is required')
        });
        
        test('When email is provided and not match should return status 401 and get message Email or Password is incorrect', async () => {
            const loginData = {
                "email": "janes.smith@example.com",
                "password": "hashedpassword456"
            }
            const response = await request(app)
                .post('/login')
                .send(loginData);

            expect(response.status).toBe(401)
            expect(response.body).toHaveProperty('message', 'Email or Password is incorrect')
        });

        test('When password is provided and not match should return status 401 and get message Email or Password is incorrect', async () => {
            const loginData = {
                "email": "jane.smith@example.com",
                "password": "hashedpassword4562"
            }
            const response = await request(app)
                .post('/login')
                .send(loginData);

            expect(response.status).toBe(401)
            expect(response.body).toHaveProperty('message', 'Email or Password is incorrect')
        });
    });
});

describe('POST /register', () => {
    test('POST /register success should return id, username, and email', async () => {
        let response = await request(app).post('/register').send({
            username: "hoshi",
            email: "hoshi@example.com",
            password: "horanghae"
        })
        expect(response.status).toBe(201)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("id", expect.any(Number))
    })

    test('POST /register failed should return error message if username is null', async () => {
        let response = await request(app).post('/register').send({
            username: "",
            email: "hoshi@example.com",
            password: "horanghae"
        })
        expect(response.status).toBe(400)

    })

    test('POST /register failed should return error message if email is null', async () => {
        let response = await request(app).post('/register').send({
            username: "hoshi",
            email: "",
            password: "horanghae"
        })
        expect(response.status).toBe(400)
    })

    test('POST /register failed should return error message if password is null', async () => {
        let response = await request(app).post('/register').send({
            username: "hoshi",
            email: "hoshi@example.com",
            password: ""
        })
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
    })
})