const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const Gram = require('../models/Gram');


module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Gram
      .insert({ ...req.body, userId: req.user.id })
      .then(gram => res.send(gram))
      .catch(next);
  })

  .delete('/:id', ensureAuth, (req, res, next) => {
    Gram
      .delete(req.params.id)
      .then(gram => res.send(gram))
      .catch(next);
  })
  .patch('/:id', ensureAuth, (req, res, next) => {
    Gram
      .update(req.params.id, req.body)
      .then(gram => res.send(gram))
      .catch(next);

  });
