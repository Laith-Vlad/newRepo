"use strict"

// require('dotenv').config();
const base64 = require('base-64')
const bcrypt = require('bcrypt')
const {app} = require('../src/server');
const supertest = require('supertest');
const req = supertest(app);
const { db } = require('../src/models/index');
const { exportAllDeclaration } = require('@babel/types');

beforeAll(async () => {
    await db.sync();
  })

afterAll(async () => {
    
    await db.drop();
  })

  describe('testing the server', () => {

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkxhaXRoIiwiaWF0IjoxNjg4NTQ1MjU2fQ.L30zjq1eBGScE5-kDoVZskkf7_oRM3VlfPQZ_0gkrvE';
    it('POST to /signup to create a new user.', async () => {
        const res = await req.post('/signup').send({
            username: "Laith",
            password: "123123",
            role: "admin"
        })
        expect(res.status).toBe(201);
        expect(res.body.user.username).toEqual('Laith')
    });
    it('POST to /signin to create a new user.', async () => {
        const res = await req.post('/signin')
        .set('Authorization',`Basic ${await base64.encode('Laith:123123')}`)
        expect(res.status).toBe(200);
    });
    it('GET to /secret to create a new user.', async () => {
        const res = await req.get('/secret')
        .set('Authorization',`Bearer ${token}`)
        expect(res.status).toBe(200);
    });
    it('should fail to access an authenticated route without a token', async () => {
        const res = await req
          .get('/secret');
    
        // Assert the expected behavior based on the authentication status
        expect(res.status).toBe(500);
        // ...
      });

    it('404 on a bad route', async () => {
        const res = await req.get('/pagenotFound')
        expect(res.status).toBe(404);
      });
      
      it('404 on a bad method', async () => {
        const res = await req.post('/furniture/rags/1')
        expect(res.status).toBe(404);
      });
      it('500 on a invalid model', async () => {
        const res = await req.get('/furniture/raasd')
        expect(res.status).toBe(500);
      });

      it('POST to /rags to create a new rag.', async () => {
        const res = await req.post('/furniture/rags').send({
            name: "test",
            brand: "test",
            type: "test",
            url: "test"
        }).set('Authorization',`Bearer ${token}`)
        expect(res.status).toBe(201);
        
    });
      it('GET By Id to /rags to create a new rag.', async () => {
        const res = await req.get('/furniture/rags/1')
        expect(res.status).toBe(200);
        // expect(res.body.type).toBe('test');
        
    });
      it('GET ALL to /rags to create a new rag.', async () => {
        const res = await req.get('/furniture/rags')
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
    it('Update to /rags to create a new rag.', async () => {
        const res = await req.put('/furniture/rags/1').send({
            name: "utest",
            brand: "test",
            type: "test",
            url: "test"
        }).set('Authorization',`Bearer ${token}`)
        expect(res.status).toBe(202);
        expect(res.body.name).toBe("utest");
        
    });
    it('Delete to /rags to create a new rag.', async () => {
        const res = await req.delete('/furniture/rags/1').set('Authorization',`Bearer ${token}`)
        expect(res.status).toBe(200);
        expect(res.body).toBe(1);
        
    });
  })