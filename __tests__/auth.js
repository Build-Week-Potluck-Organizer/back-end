const supertest = require('supertest')
const server = require('../api/server')
const db = require('../data/dbconfig')
require('dotenv').config();

// These instances of beforeEach and Afterall here in the auth.js file are sufficient to cover the testing database
// for all the test files in the __tests__ folder. Calling separate instances of beforeEach and Afterall in each file
// will result in duplicate data being seeded to the datatbase causing "unique-constraint-failed" and "foreign-key-
// constraint-failed" error messages, rendering the tests themselves unusable. 

beforeEach(async () => {
    await db.seed.run();
})
  
afterAll(async () => {
    await db.destroy();
})

describe('authorization integration tests', () => {
    const test_register = {
        username: 'fulanito',
        password: 'detaltambien'
    }

    const test_login = {
        username: 'fulano',
        password: 'password'
    }

    // register new user:
    it('POST /auth/register', async () => {
        const res = await supertest(server) 
        .post('/api/auth/register')
        .send(test_register)
        // console.log(res.body)
        expect(res.type).toBe('application/json')
        expect(res.statusCode).toBe(201)
        expect(res.body.saved.username).toBe('fulanito')
    })

    // login:
    it('POST /auth/login', async () => {
        const res = await supertest(server) 
        .post('/api/auth/login')
        .send(test_login)
        // console.log(res)
        expect(res.type).toBe('application/json')
        expect(res.statusCode).toBe(200)
        expect(res.body.username).toBe('fulano')
    })
})




