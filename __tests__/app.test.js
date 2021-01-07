//equire('dotenv').config();

//const { execSync } = require('child_process');
const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');

//const client = require('../lib/client');

describe('makes a test for a demo route', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('it allows the user to signup via POST', async() => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({ email: 'test@test.com', password: 'password' })
      .then(res => {
        expect(res.body).toEqual({ 
          id: expect.any(String),
          email: 'test@test.com'
        });
      });
  });
  

});
