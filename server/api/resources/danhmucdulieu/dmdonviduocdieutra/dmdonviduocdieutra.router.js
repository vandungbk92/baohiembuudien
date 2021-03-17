import express from 'express';
import passport from 'passport';
import dmdonviduocdieutraController from './dmdonviduocdieutra.controller';

export const dmdonviduocdieutraRouter = express.Router();

dmdonviduocdieutraRouter.post('/',passport.authenticate('jwt', { session: false }), dmdonviduocdieutraController.create)
dmdonviduocdieutraRouter.get('/',passport.authenticate('jwt', { session: false }), dmdonviduocdieutraController.findAll);

dmdonviduocdieutraRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), dmdonviduocdieutraController.findOne)
  .delete(passport.authenticate('jwt', { session: false }), dmdonviduocdieutraController.delete)
  .put(passport.authenticate('jwt', { session: false }), dmdonviduocdieutraController.update)
