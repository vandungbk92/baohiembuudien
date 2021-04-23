import express from 'express';
import passport from 'passport';
import cauhoithuonggapController from './cauhoithuonggap.controller';

export const cauhoithuonggapRouter = express.Router();
cauhoithuonggapRouter
  .route('/')
  .get(passport.authenticate('jwt', { session: false }), cauhoithuonggapController.getAll)
  .post(passport.authenticate('jwt', { session: false }), cauhoithuonggapController.create);

cauhoithuonggapRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), cauhoithuonggapController.findOne)
  .put(passport.authenticate('jwt', { session: false }), cauhoithuonggapController.update)
  .delete(passport.authenticate('jwt', { session: false }), cauhoithuonggapController.delete);
