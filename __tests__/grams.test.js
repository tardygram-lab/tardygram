const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/Userservice');
const User = require('../lib/models/User');

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
  });
  
  afterAll(() => {
    return pool.end();
  });

  //POST TEST
  it('Allows user to POST a gram', async() => {
    return agent 
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
  ////DELETE TEST    

  it('removes a post', async() => {
    const gram =
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
       });
      //  console.log(gram);
    const res = await agent
      .delete(`/api/v1/gram/${gram.body.id}`);
  
    expect(res.body).toEqual(gram.body);

  });

});
