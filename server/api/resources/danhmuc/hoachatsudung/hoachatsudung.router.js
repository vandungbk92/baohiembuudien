import express from 'express';
import passport from 'passport';
import hoachatsudungController from './hoachatsudung.controller';

export const hoachatsudungRouter = express.Router();

hoachatsudungRouter.post('/',passport.authenticate('jwt', { session: false }), hoachatsudungController.create)
hoachatsudungRouter.get('/',passport.authenticate('jwt', { session: false }), hoachatsudungController.findAll);

hoachatsudungRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), hoachatsudungController.findOne)
  .delete(passport.authenticate('jwt', { session: false }), hoachatsudungController.delete)
  .put(passport.authenticate('jwt', { session: false }), hoachatsudungController.update)
