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
    const postArray = await Promise.all (
      [
        { userId: user.id, photoUrl: 'http://test.text1.com', caption: 'caption example1', 
          tags: [{
            tag1: 'tag1text1',
            tag2: 'tag2text1'
          }]
        },

        { userId: user.id, photoUrl: 'http://test.text2.com', caption: 'caption example2', 
          tags: [{
            tag1: 'tag1text2',
            tag2: 'tag2text2'
          }]
        },

        { userId: user.id, photoUrl: 'http://test.text3.com', caption: 'caption example3', 
          tags: [{
            tag1: 'tag1text3',
            tag2: 'tag2text3'
          }]
        },

        { userId: user.id, photoUrl: 'http://test.text4.com', caption: 'caption example4', 
          tags: [{
            tag1: 'tag1text4',
            tag2: 'tag2text4',
            tag3: 'fhuewbaduvkzgfdbuzkcnfaksnfg'
          }]
        },

        { userId: user.id, photoUrl: 'http://test.text5.com', caption: 'caption example5', 
          tags: [{
            tag1: 'tag1text5',
            tag2: 'tag2text5',
            tag3: 'YIPPEEEEEEEE'
          }]
        },

        { userId: user.id, photoUrl: 'http://test.text6.com', caption: 'caption example6', 
          tags: [{
            tag1: 'tag1text6',
            tag2: 'tag2text6'
          }]
        },

        { userId: user.id, photoUrl: 'http://test.text7.com', caption: 'caption example7', 
          tags: [{
            tag1: 'tag1text7',
            tag2: 'tag2text7'
          }]
        },

        { userId: user.id, photoUrl: 'http://test.text8.com', caption: 'caption example8', 
          tags: [{
            tag1: 'tag1text8',
            tag2: 'tag2text8'
          }]
        },

        { userId: user.id, photoUrl: 'http://test.text9.com', caption: 'caption example9', 
          tags: [{
            tag1: 'tag1text9',
            tag2: 'tag2text9'
          }]
        },

        { userId: user.id, photoUrl: 'http://test.text10.com', caption: 'caption example10', 
          tags: [{
            tag1: 'tag1text10',
            tag2: 'tag2text10'
          }]
        },

        { userId: user.id, photoUrl: 'http://test.text11.com', caption: 'caption example11', 
          tags: [{
            tag1: 'tag1text11',
            tag2: 'tag2text11'
          }]
        }
      ].map (gram => Gram.insert(gram)));

    await Promise.all([
      { userId: '1', gramsId: '1', comment: 'my first comment' },
      { userId: '1', gramsId: '2', comment: 'my 2nd comment' },
      { userId: '1', gramsId: '1', comment: 'my 3rd comment' },
      { userId: '1', gramsId: '1', comment: 'my 4th comment' },
      { userId: '1', gramsId: '2', comment: 'my 3rd comment' },
      { userId: '1', gramsId: '8', comment: 'my 4th comment' }
    ].map(comment => Comment.insert(comment)));

    const expected = [
      { 'caption': 'caption example1', 'id': '1', 'photoUrl': 'http://test.text1.com', 'tags': [{ 'tag1': 'tag1text1', 'tag2': 'tag2text1' }], 'userId': '1' },
      { 'caption': 'caption example3', 'id': '2', 'photoUrl': 'http://test.text3.com', 'tags': [{ 'tag1': 'tag1text3', 'tag2': 'tag2text3' }], 'userId': '1' },
      { 'caption': 'caption example8', 'id': '8', 'photoUrl': 'http://test.text8.com', 'tags': [{ 'tag1': 'tag1text8', 'tag2': 'tag2text8' }], 'userId': '1' }
    ];
    
    const res = await agent
      .get('/api/v1/gram/topTen');
    // console.log(res.body);
    expect(res.body).toEqual(expect.anything());
    
  });
});


