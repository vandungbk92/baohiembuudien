import express from 'express';
import passport from 'passport';
import luongnuocsudungController from './luongnuocsudung.controller';

export const luongnuocsudungRouter = express.Router();

luongnuocsudungRouter.post('/',passport.authenticate('jwt', { session: false }), luongnuocsudungController.create)

luongnuocsudungRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), luongnuocsudungController.findOne)
  .delete(passport.authenticate('jwt', { session: false }), luongnuocsudungController.delete)
  .put(passport.authenticate('jwt', { session: false }), luongnuocsudungController.update)
