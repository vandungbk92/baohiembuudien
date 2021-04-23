import express from 'express';
import passport from 'passport';
import tintucController from './sangolf.controller';

export const tintucRouter = express.Router();
tintucRouter
  .route('/')
  .get(tintucController.getAll)
  .post(passport.authenticate('jwt', { session: false }), tintucController.create)

tintucRouter
  .route('/:id')
  .get(tintucController.findOne)
  .put(passport.authenticate('jwt', { session: false }), tintucController.update)
  .delete(passport.authenticate('jwt', { session: false }), tintucController.delete);
