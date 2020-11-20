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

const token1 = process.env.TOKEN_1

const token2 = process.env.TOKEN_2

describe('events integeration tests', () => {
    it('GET api/events', async () => {
        const res = await supertest(server)
            .get('/api/events')
            .set('Authorization', token1)
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe('application/json')
        expect(res.body).toHaveLength(4)
    })
})
