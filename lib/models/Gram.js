const pool = require('../utils/pool');
const Comment = require('./Comments');

module.exports = class Gram {
  id;
  userId;
  photoUrl;
  caption;
  tags;

  constructor(row) {
    this.id = String(row.id);
    this.userId = String(row.user_id);
    this.photoUrl = row.photo_url;
    this.caption = row.caption;
    this.tags = row.tags;
  }

  static async insert(gram) {
    const { rows } = await pool.query(
      'INSERT INTO grams (user_id, photo_url, caption, tags) VALUES ($1, $2, $3, $4) RETURNING *',
      [gram.userId, gram.photoUrl, gram.caption, gram.tags]
    );
    return new Gram(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM grams WHERE id=$1 RETURNING *',
      [id]
    );
    if(!rows[0]) throw new Error(`No gram with ${id}`);
      return new Gram(rows[0]);
  }


  static async update(id, { caption }) {
  const { rows } = await pool.query(
    `UPDATE grams
    SET caption=$1
          WHERE id=$2
          RETURNING * 
    `,
    [caption, id]
  );
  if(!rows[0]) throw new Error(`No gram with ${id}`);
  return new Gram(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(
      'SELECT * from grams'
    );
    return rows.map(row => new Gram(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `SELECT grams.*, email, 
      json_agg(json_build_object('commenter_email', users.email, 'comment', comments.comment)) AS comments
    FROM grams
    JOIN users
    ON users.id = grams.user_id
    JOIN comments
    ON comments.user_id = users.id
    WHERE grams.id=$1
    GROUP BY grams.id, users.id`,
    [id]
    );
    if(!rows[0]) throw new Error(`No grams with id ${id}`)
    return {
      ...new Gram(rows[0]),
      comments: rows[0].comments.map(comment => new Comment(comment))
      };
  }
  

  static async findTopTen() {
    const { rows } = await pool.query(
    `SELECT grams.*, 
    COUNT(comments.comment)
    FROM grams
    JOIN comments
    ON comments.grams_id = grams.id
    GROUP BY grams.id
    ORDER BY count DESC
    LIMIT 10`
    );
    if(!rows) throw new Error(`Ain't no grams here!`)
    return rows.map(row => new Gram(row))
  }

};


