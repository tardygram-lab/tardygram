const pool = require('../utils/pool');

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

}