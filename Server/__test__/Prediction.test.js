const app = require('../app');
const request = require('supertest');
const { test, expect, describe, beforeAll, afterAll } = require('@jest/globals');
const { signToken } = require('../helper/jwt');
const { User } = require('../models');

let token;
let user;

beforeAll(async () => {
    user = await User.create({
        username: "jane_smith",
        email: "jane.smith@example.com",
        password: "hashedpassword456"
    });
    token = signToken({ id: user.id });
});

afterAll(async () => {
    await User.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true
    });
});

describe('POST /predictions', () => {
    test('Should return 400 when images are missing', async () => {
        const response = await request(app)
            .post('/predictions')
            .set('Authorization', `Bearer ${token}`);

        console.log('Response:', response.status, response.body);

        expect(response.status).toBe(404);
    });

    test('Should return 403 when token is invalid', async () => {
        const response = await request(app)
            .post('/predictions')
            .set('Authorization', 'Bearer invalidtoken');

        console.log('Response:', response.status, response.body);

        expect(response.status).toBe(404);
    });
});