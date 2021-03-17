import express from 'express';
import passport from 'passport';
import donviduocdieutraController from './donviduocdieutra.controller';

export const donviduocdieutraRouter = express.Router();
donviduocdieutraRouter
  .route('/')
  .get(passport.authenticate('jwt', { session: false }), donviduocdieutraController.getAll)
  .post(passport.authenticate('jwt', { session: false }), donviduocdieutraController.create)

donviduocdieutraRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), donviduocdieutraController.findOne)
  .delete(passport.authenticate('jwt', { session: false }), donviduocdieutraController.delete)
  .put(passport.authenticate('jwt', { session: false }), donviduocdieutraController.update);
