import express from 'express';
import passport from 'passport';
import loaihinhchannuoiController from './loaihinhchannuoi.controller';

export const loaihinhchannuoiRouter = express.Router();

loaihinhchannuoiRouter.post('/',passport.authenticate('jwt', { session: false }), loaihinhchannuoiController.create)
loaihinhchannuoiRouter.get('/',passport.authenticate('jwt', { session: false }), loaihinhchannuoiController.findAll);

loaihinhchannuoiRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), loaihinhchannuoiController.findOne)
  .delete(passport.authenticate('jwt', { session: false }), loaihinhchannuoiController.delete)
  .put(passport.authenticate('jwt', { session: false }), loaihinhchannuoiController.update)
