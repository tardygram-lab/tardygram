DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS grams;
-- DROP TABLE IF EXISTS comments;

CREATE TABLE users(
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  profile_photo_url TEXT NOT NULL
);

CREATE TABLE grams(
   id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   user_id BIGINT REFERENCES users(id),
   photo_url TEXT NOT NULL,
   caption TEXT NOT NULL,
   tags jsonb[]
);

-- CREATE TABLE comments(
--   id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--   user_id BIGINT REFERENCES users(id),
--   grams_id BIGINT REFERENCES grams(id),
--   post TEXT NOT NULL,
--   comment TEXT NOT NULL
-- );
