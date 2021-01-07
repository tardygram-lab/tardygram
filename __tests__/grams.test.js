const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/Userservice');
const User = require('../lib/models/User');

describe('make a test for the gram routes', () => {
  //USER CREATED FOR TESTING
  let user;

  beforeEach(async() => {
    await pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
    user = await User.insert ({
      email: 'test@test.com', password: 'password',   profilePhotoUrl: 'http://test.text.com'
    });
  });
  afterAll(() => {
    return pool.end();
  });

  //POST TEST
  it('Allows user to POST a gram', async() => {
    return request(app) 
      .post('/api/vi/gram')
      .send({ 

        userId: user.id,
        photoUrl: 'http://test.text.com', 
        caption: 'caption example',
        tags: [{
          tag1: 'tag1text',
          tag2: 'tag2text'
        }] 
      })
      .then(res => {
        expect(res.body).toEqual({ 
          id: expect.any(String),
          userId: user.id,
          photoUrl: 'http://test.text.com', 
          caption: 'caption example',
          tags: [{
            tag1: 'tag1text',
            tag2: 'tag2text'
          }] 
        });
      });
      
  });


});
