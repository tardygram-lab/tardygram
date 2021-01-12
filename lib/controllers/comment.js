const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const Comment = require('../models/Comments');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Comment 
      .insert({ ...req.body, userId: req.user.id })
      .then(comment => res.send(comment))
      .catch(next);
  })
  .delete('/:id', ensureAuth, (req, res, next) => {
    Comment
      .delete(req.params.id)
      .then(comment => res.send(comment))
      .catch(next);
  });




