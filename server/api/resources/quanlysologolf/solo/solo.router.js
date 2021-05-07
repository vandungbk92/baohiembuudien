import express from 'express';
import passport from 'passport';
import soloController from './solo.controller';

export const soloRouter = express.Router();
soloRouter
  .route('/')
  .get(soloController.findAll)
  .post(passport.authenticate('jwt', { session: false }), soloController.create)

soloRouter
  .route('/:id')
  .get(soloController.findOne)
  .put(passport.authenticate('jwt', { session: false }), soloController.update)
  .delete(passport.authenticate('jwt', { session: false }), soloController.delete);
