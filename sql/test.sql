
INSERT INTO users( email, password_hash, profile_photo_url) 
VALUES ('test@test.com', 'password', 'http://gohere.com');
INSERT INTO users( email, password_hash, profile_photo_url) 
VALUES ('test@test.com', 'password', 'http://gohere.com');
INSERT INTO users( email, password_hash, profile_photo_url) 
VALUES ('test@test.com', 'password', 'http://gohere.com');


INSERT INTO grams( user_id, photo_url, caption, tags)
VALUES ('1', 'http://photo.com', 'here is my sweet pic', array['{"tag1": "tag1", "tag2": "tag2"}']::jsonb[] );
INSERT INTO grams( user_id, photo_url, caption, tags)
VALUES ('2', 'http://photo.com', 'here is my sweet pic', array['{"tag1": "tag1", "tag2": "tag2"}']::jsonb[] );
INSERT INTO grams( user_id, photo_url, caption, tags)
VALUES ('3', 'http://photo.com', 'here is my sweet pic', array['{"tag1": "tag1", "tag2": "tag2"}']::jsonb[] );
INSERT INTO grams( user_id, photo_url, caption, tags)
VALUES ('1', 'http://photo.com', 'here is my sweet pic', array['{"tag1": "tag1", "tag2": "tag2"}']::jsonb[] );
INSERT INTO grams( user_id, photo_url, caption, tags)
VALUES ('1', 'http://photo.com', 'here is my sweet pic', array['{"tag1": "tag1", "tag2": "tag2"}']::jsonb[] );
INSERT INTO grams( user_id, photo_url, caption, tags)
VALUES ('2', 'http://photo.com', 'here is my sweet pic', array['{"tag1": "tag1", "tag2": "tag2"}']::jsonb[] );
INSERT INTO grams( user_id, photo_url, caption, tags)
VALUES ('1', 'http://photo.com', 'here is my sweet pic', array['{"tag1": "tag1", "tag2": "tag2"}']::jsonb[] );
INSERT INTO grams( user_id, photo_url, caption, tags)
VALUES ('1', 'http://photo.com', 'here is my sweet pic', array['{"tag1": "tag1", "tag2": "tag2"}']::jsonb[] );
INSERT INTO grams( user_id, photo_url, caption, tags)
VALUES ('3', 'http://photo.com', 'here is my sweet pic', array['{"tag1": "tag1", "tag2": "tag2"}']::jsonb[] );
INSERT INTO grams( user_id, photo_url, caption, tags)
VALUES ('1', 'http://photo.com', 'here is my sweet pic', array['{"tag1": "tag1", "tag2": "tag2"}']::jsonb[] );

INSERT INTO comments( user_id, grams_id, comment )
VALUES ('1', '1', 'here is my comment');
INSERT INTO comments( user_id, grams_id, comment )
VALUES ('1', '1', 'here is my comment');
INSERT INTO comments( user_id, grams_id, comment )
VALUES ('2', '1', 'here is my comment');
INSERT INTO comments( user_id, grams_id, comment )
VALUES ('3', '3', 'here is my comment');
INSERT INTO comments( user_id, grams_id, comment )
VALUES ('1', '2', 'here is my comment');
INSERT INTO comments( user_id, grams_id, comment )
VALUES ('1', '2', 'here is my comment');
INSERT INTO comments( user_id, grams_id, comment )
VALUES ('2', '4', 'here is my comment');
INSERT INTO comments( user_id, grams_id, comment )
VALUES ('2', '5', 'here is my comment');
INSERT INTO comments( user_id, grams_id, comment )
VALUES ('1', '6', 'here is my comment');
INSERT INTO comments( user_id, grams_id, comment )
VALUES ('3', '7', 'here is my comment');
INSERT INTO comments( user_id, grams_id, comment )
VALUES ('1', '8', 'here is my comment');
INSERT INTO comments( user_id, grams_id, comment )
VALUES ('3', '9', 'here is my comment');
INSERT INTO comments( user_id, grams_id, comment )
VALUES ('1', '10', 'here is my comment');
INSERT INTO comments( user_id, grams_id, comment )
VALUES ('3', '2', 'here is my comment');
INSERT INTO comments( user_id, grams_id, comment )
VALUES ('1', '3', 'here is my comment');

