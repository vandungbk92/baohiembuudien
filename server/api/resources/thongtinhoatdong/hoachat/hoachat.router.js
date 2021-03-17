import express from 'express';
import passport from 'passport';
import hoachatController from './hoachat.controller';

export const hoachatRouter = express.Router();

hoachatRouter.post('/',passport.authenticate('jwt', { session: false }), hoachatController.create)

hoachatRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), hoachatController.findOne)
  .delete(passport.authenticate('jwt', { session: false }), hoachatController.delete)
  .put(passport.authenticate('jwt', { session: false }), hoachatController.update)
