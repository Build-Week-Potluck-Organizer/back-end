const supertest = require('supertest')
const server = require('../api/server')
const db = require('../data/dbconfig')
require('dotenv').config();

const token1 = process.env.TOKEN_1

const token2 = process.env.TOKEN_2

describe('users integeration tests', () => {
  it('GET /users', async () => {
    const res = await supertest(server)
      .get('/api/users')
      .set('Authorization', token1)
      // console.log(res)
      expect(res.statusCode).toBe(200)
      expect(res.type).toBe('application/json')
      expect(res.body).toHaveLength(2)
      expect(res.body[0].username).toBe('fulano')
      expect(res.body[1].username).toBe('fulana')
      // expect(res.body[2].username).toBe('fulanito')
  })

  it('GET /users/:id', async () => {
    const res = await supertest(server)
      .get('/api/users/1')
      .set('Authorization', token1)
      expect(res.statusCode).toBe(200)
      expect(res.type).toBe('application/json')
      expect(res.body.username).toBe('fulano')
  })

  it('GET /users/:id/events', async () => {
    const res = await supertest(server)
    .get('/api/users/1/events')
    .set('Authorization', token1)
    // console.log(res)
    expect(res.statusCode).toBe(200)
    expect(res.type).toBe('application/json')
    expect(res.body).toHaveLength(2)
    expect(res.body[0].event_name).toBe('4th of July BBQ')
  })
})
