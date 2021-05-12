import express from 'express';
import passport from 'passport';
import lichlamvieccaddyController from './lichlamvieccaddy.controller';

export const lichlamvieccaddyRouter = express.Router();
lichlamvieccaddyRouter
  .route('/')
  .get(lichlamvieccaddyController.findAll)
  .post(passport.authenticate('jwt', { session: false }), lichlamvieccaddyController.create)

lichlamvieccaddyRouter
  .route('/:id')
  .get(lichlamvieccaddyController.findOne)
  .put(passport.authenticate('jwt', { session: false }), lichlamvieccaddyController.update)
  .delete(passport.authenticate('jwt', { session: false }), lichlamvieccaddyController.delete);
