const supertest = require('supertest')
const server = require('../api/server')

describe('users integeration test', () => {
    it('GET /users', async () => {
        const res = await supertest(server).get('/api/users')
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe('application/json')
        expect(res.body).toHaveLength(2)
        expect(res.body[0].username).toBe('fulano')
        expect(res.body[1].username).toBe('fulana')
    })
})

// needs test for get user by id & get user's events by user id