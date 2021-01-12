//equire('dotenv').config();

//const { execSync } = require('child_process');
const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/Userservice');

describe.only('makes a test for a demo route', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });
  ////////SIGN UP
  it('it allows the user to signup via POST', async() => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({ email: 'test@test.com', password: 'password',   profilePhotoUrl: 'http://test.text.com' })
      .then(res => {
        expect(res.body).toEqual({ 
          id: expect.any(String),
          email: 'test@test.com',
          profilePhotoUrl: 'http://test.text.com',
        });
      });
  });
  ///////SIGN IN
  it('allows a user to login via POST', async() => {
    const user = await UserService.create({
      email: 'test@test.com',
      password: 'password',
      profilePhotoUrl: 'http://test.text.com'
    });
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test@test.com',
        password: 'password',
        profilePhotoUrl: 'http://test.text.com'
      });
    expect(res.body).toEqual({
      id: user.id,
      email: 'test@test.com',
      profilePhotoUrl: 'http://test.text.com'
    });
  });
  /////////VERIFY'S
  it('verifies a user is logged in', async() => {
    const agent = request.agent(app);
    const user = await UserService.create({
      email: 'test@test.com',
      password: 'password',
      profilePhotoUrl:'http://test.text.com'
    });
    await agent
      .post('/api/v1/auth/login')
      .send({
        email: 'test@test.com',
        password: 'password',
        profilePhotoUrl: 'http://test.text.com'
      });
    const res = await agent
      .get('/api/v1/auth/verify');
    expect(res.body).toEqual({
      id: user.id,
      email: 'test@test.com',
      profilePhotoUrl: 'http://test.text.com'
    });
  });
});
