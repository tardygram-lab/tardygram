const pool = require('../utils/pool');

module.exports = class Comment {
    id;
    userId;
    gramsId;
    comment;
  
    constructor(row){
      this.id = row.id;
      this.userId = row.user_id;
      this.gramsId = row.grams_id;
      this.comment = row.comment;
    }
    static async insert(comment) {
      const { rows } = await pool.query(
        'INSERT INTO comments (user_id, grams_id, comment) VALUES ($1, $2, $3) RETURNING *',
        [comment.userId, comment.gramsId, comment.comment]
      );
      return new Comment(rows[0]);
    }
    static async delete({ id, userId }) {
      const { rows } = await pool.query(
        'DELETE FROM comments WHERE id=$1 AND user_id=$2 RETURNING *',
        [id, userId]
      );
      return new Comment(rows[0]);
    }
  };