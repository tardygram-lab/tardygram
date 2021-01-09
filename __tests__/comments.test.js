const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/Userservice');
const User = require('../lib/models/User');
const Comment = require('../lib/models/Comments');
const Gram = require('../lib/models/Gram');

describe('make a test for the gram routes', () => {
  //USER CREATED FOR TESTING
  let user;
  let agent = request.agent(app);

  beforeEach(async() => {
    await pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
    user = await UserService.create ({
      email: 'test@test.com', 
      password: 'password', 
      profilePhotoUrl: 'http://test.text.com'
    });

    //USER LOGGED IN BEFORE TESTING
    await agent
      .post('/api/v1/auth/login')
      .send({
        email: 'test@test.com',
        password: 'password',
        profilePhotoUrl: 'http://test.text.com'
      });

    await agent 
      .post('/api/v1/gram')
      .send({ 
        userId: user.id,
        photoUrl: 'http://test.text.com', 
        caption: 'caption example',
        tags: [{
          tag1: 'tag1text',
          tag2: 'tag2text'
        }]
      })
  });
  
  afterAll(() => {
    return pool.end();
  });

  it('Allows user to POST a comment', async() => {
    return agent 
      .post('/api/v1/comment')
      .send({ 
        userId: '1', 
        gramsId: '1', 
        comment: 'my first comment' 
      })
      .then(res => {
        expect(res.body).toEqual({ 
          id: '1',
          userId: '1', 
          gramsId: '1', 
          comment: 'my first comment' 
        });
      });
  });

  
});
