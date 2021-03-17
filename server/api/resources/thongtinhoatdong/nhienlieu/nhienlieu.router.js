import express from 'express';
import passport from 'passport';
import nhienlieuController from './nhienlieu.controller';

export const nhienlieuRouter = express.Router();

nhienlieuRouter.post('/',passport.authenticate('jwt', { session: false }), nhienlieuController.create)

nhienlieuRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), nhienlieuController.findOne)
  .delete(passport.authenticate('jwt', { session: false }), nhienlieuController.delete)
  .put(passport.authenticate('jwt', { session: false }), nhienlieuController.update)
