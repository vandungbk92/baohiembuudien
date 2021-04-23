import express from 'express';
import passport from 'passport';
import danhmuctintucController from './danhmucsangolf.controller';

export const danhmuctintucRouter = express.Router();
danhmuctintucRouter
  .route('/')
  .get(danhmuctintucController.getAll)
  .post(passport.authenticate('jwt', { session: false }), danhmuctintucController.create)

danhmuctintucRouter
  .route('/:id')
  .get(danhmuctintucController.findOne)
  .put(passport.authenticate('jwt', { session: false }), danhmuctintucController.update)
  .delete(passport.authenticate('jwt', { session: false }), danhmuctintucController.delete);
