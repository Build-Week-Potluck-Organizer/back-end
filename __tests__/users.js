const supertest = require('supertest')
const server = require('../api/server')
const db = require('../data/dbconfig')
require('dotenv').config();

beforeEach(async () => {
    await db.seed.run();
  });
  
  afterAll(async () => {
    await db.destroy();
  });  

describe('users integeration tests', () => {
    it('GET /users', async () => {
        const res = await supertest(server).get('/api/users')
        // console.log(res)
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe('application/json')
        expect(res.body).toHaveLength(2)
        expect(res.body[0].username).toBe('fulano')
        expect(res.body[1].username).toBe('fulana')
    })
})

// needs test for get user by id & get user's events by user id