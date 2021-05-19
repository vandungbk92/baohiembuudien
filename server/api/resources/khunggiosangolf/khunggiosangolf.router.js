import express from 'express';
import passport from 'passport';
import khunggiosangolfController from './khunggiosangolf.controller';

export const khunggiosangolfRouter = express.Router();
khunggiosangolfRouter
  .route('/')
  .get(khunggiosangolfController.findAll)
  .post(passport.authenticate('jwt', { session: false }), khunggiosangolfController.create)

khunggiosangolfRouter
  .route('/:id')
  .get(khunggiosangolfController.findOne)
  .put(passport.authenticate('jwt', { session: false }), khunggiosangolfController.update)
  .delete(passport.authenticate('jwt', { session: false }), khunggiosangolfController.delete);
