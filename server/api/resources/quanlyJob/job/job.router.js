import express from 'express';
import passport from 'passport';
import jobController from './job,controller';

export const jobRouter = express.Router();
jobRouter
  .route('/')
  .get(jobController.getAll)
  .post(passport.authenticate('jwt', { session: false }), jobController.create)

jobRouter
  .route('/:id')
  .get(jobController.findOne)
  .put(passport.authenticate('jwt', { session: false }), jobController.update)
  .delete(passport.authenticate('jwt', { session: false }), jobController.delete);
