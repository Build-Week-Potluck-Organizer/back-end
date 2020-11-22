const supertest = require('supertest')
const server = require('../api/server')
const db = require('../data/dbconfig')
require('dotenv').config();

const token1 = process.env.TOKEN_1

const token2 = process.env.TOKEN_2

describe('events integeration tests', () => {
    const new_event_data = {
        event_name: 'Block Party',
        description: 'neighborhood get-together',
        date: 'September 15th, 2021',
        time: '12:00 pm'
    }

    const new_event_location = {
        address: '1942 Midway Place, Fortuna, CA 67890'
    }

    it('GET /api/events', async () => {
        const res = await supertest(server)
            .get('/api/events')
            .set('Authorization', token1)
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe('application/json')
        expect(res.body).toHaveLength(4)
    })

    it('GET /api/events/:id', async () => {
        const res = await supertest(server)
          .get('/api/events/1')
          .set('Authorization', token1)
          expect(res.statusCode).toBe(200)
          expect(res.type).toBe('application/json')
          expect(res.body.event.event_name).toBe('4th of July BBQ')
    })

    it('GET /api/events/:id/guestlist', async () => {
        const res = await supertest(server)
          .get('/api/events/1/guestlist')
          .set('Authorization', token1)
          expect(res.statusCode).toBe(200)
          expect(res.type).toBe('application/json')
          expect(res.body[0].username).toBe('fulana')
    })

    it('GET /api/events/:id/location', async () => {
        const res = await supertest(server)
          .get('/api/events/1/location')
          .set('Authorization', token1)
          expect(res.statusCode).toBe(200)
          expect(res.type).toBe('application/json')
          expect(res.body[0].address).toBe('1066 Hastings Street, Anytown, ME 12345')
    })

    it('GET /api/events/:id/menu', async () => {
        const res = await supertest(server)
          .get('/api/events/1/menu')
          .set('Authorization', token1)
          expect(res.statusCode).toBe(200)
          expect(res.type).toBe('application/json')
          expect(res.body[0].dish).toBe('apple pie')
    })

    it('DELETE /api/events/4', async () => {
        const res = await supertest(server)
          .delete('/api/events/4')
          .set('Authorization', token1)
          expect(res.statusCode).toBe(204)
    })

    // delete non-existent event 
    it('DELETE /api/events/100', async () => {
        const res = await supertest(server)
          .delete('/api/events/100')
          .set('Authorization', token1)
          expect(res.statusCode).toBe(404)
          expect(res.body.message).toBe('event not found')
    })

    it('POST /api/events', async () => {
        const res = await supertest(server)
            .post('/api/events')
            .send(new_event_data)
            .set('Authorization', token1)
        expect(res.statusCode).toBe(201)
        expect(res.type).toBe('application/json')
        // console.log(res.body)
        expect(res.body.event_name).toBe('Block Party')
    })

    it('POST /api/events/:id/location', async () => {
        const res = await supertest(server)
            .post('/api/events/5/location')
            .send(new_event_location)
            .set('Authorization', token1)
        expect(res.statusCode).toBe(201)
        expect(res.type).toBe('application/json')
        // console.log(res.body)
        // expect(res.body.address).toBe('1942 Midway Place, Fortuna, CA 67890')
    })
})
