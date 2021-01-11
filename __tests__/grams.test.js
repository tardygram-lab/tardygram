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
    const gramResponse =
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
      .delete(`/api/v1/gram/${gramResponse.body.id}`);
  
    expect(res.body).toEqual(gramResponse.body);

  });
  //////////////////UPDATES GRams
  it('updates via patch', async() => {
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

    const res = await agent
      .patch(`/api/v1/gram/${gram.body.id}`)
      .send({
   
        caption: 'caption update',
   
      
      });
      // console.log(...gram);
    expect(res.body).toEqual({ ...gram.body,

      id: '1',
      caption: 'caption update',
 
     
    });
  });
  // FindBYId test
  it('should find one gram by id, with comments', async() => {
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
      
    await Promise.all([
      { userId: '1', gramsId: '1', comment: 'my first comment' },
      { userId: '1', gramsId: '1', comment: 'my 2nd comment' },
      { userId: '1', gramsId: '1', comment: 'my 3rd comment' },
      { userId: '1', gramsId: '1', comment: 'my 4th comment' }
    ].map(comment => Comment.insert(comment)));
    const res = await agent
      .get(`/api/v1/gram/${gram.body.id}`);
    expect(res.body).toEqual({
      ...gram.body, comments: expect.arrayContaining([ 
        { 'comment': 'my first comment', },
        { 'comment': 'my 3rd comment', },
        { 'comment': 'my 2nd comment', },
        { 'comment': 'my 4th comment', }
      ])
    });      
  });
  //findTopTen test
  it('finds the top 10 popular grams by comments', async() => {
    await pool.query(fs.readFileSync('./sql/test.sql', 'utf-8'));

    const res = await request(app)
    .get('/api/v1/gram/topTen');

    expect(res.body).toEqual(require ('../data/expected.json'));
    


    
  });
});


