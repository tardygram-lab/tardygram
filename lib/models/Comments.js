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
    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM comments WHERE id=$1 RETURNING *',
        [id]
      );
      if(!rows[0]) throw new Error(`No comments with that ${id}`);
      return new Comment(rows[0]);
    }

};
