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
  .get('/', (req, res, next) => {
    Gram
      .find()
      .then(gram => res.send(gram))
      .catch(next);
  })
  .delete('/:id', ensureAuth, (req, res, next) => {
    Gram
      .delete(req.params.id, req.user.id)
      .then(gram => res.send(gram))
      .catch(next);
  })
  .patch('/:id', ensureAuth, (req, res, next) => {
    Gram
      .patch(req.body, req.params.id, req.user.id)
      .then(gram => res.send(gram))
      .catch(next);
  })
  .get('/topTen', (req, res, next) => {
    Gram
      .findTopTen()
      .then(gram => res.send(gram))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Gram
      .findById(req.params.id)
      .then(gram => res.send(gram))
      .catch(next);
  });

  
