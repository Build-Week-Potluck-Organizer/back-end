const supertest = require('supertest')
const server = require('../api/server')
const db = require('../data/dbconfig')
require('dotenv').config();

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
        password: 'detal'
    }

    const test_sans_password = {
        username: 'fulano'
    }

    const test_empty_string_password = {
        username: 'fulano',
        password: ''
    }

    const test_sans_username = {
        password: 'detal'    
    }

    const test_empty_string_username = {
        username: '',
        password: 'detal'
    }

    // register new user:

    it('POST /auth/register', async () => {
        const res = await supertest(server) 
        .post('/api/auth/register')
        .send(test_register)
        // console.log(res)
        expect(res.type).toBe('application/json')
        expect(res.statusCode).toBe(201)
        expect(res.body.saved.username).toBe('fulanito')
    })

})




