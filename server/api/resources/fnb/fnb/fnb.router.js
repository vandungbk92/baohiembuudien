import express from 'express';
import passport from 'passport';
import fnbController from './fnb.controller';

export const fnbRouter = express.Router();
fnbRouter
  .route('/')
  .get(fnbController.findAll)
  .post(passport.authenticate('jwt', { session: false }), fnbController.create)

fnbRouter
  .route('/:id')
  .get(fnbController.findOne)
  .put(passport.authenticate('jwt', { session: false }), fnbController.update)
  .delete(passport.authenticate('jwt', { session: false }), fnbController.delete);
