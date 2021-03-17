import express from 'express';
import passport from 'passport';
import loaihinhkinhteController from './loaihinhkinhte.controller';

export const loaihinhkinhteRouter = express.Router();

loaihinhkinhteRouter.post('/',passport.authenticate('jwt', { session: false }), loaihinhkinhteController.create)
loaihinhkinhteRouter.get('/',passport.authenticate('jwt', { session: false }), loaihinhkinhteController.findAll);

loaihinhkinhteRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), loaihinhkinhteController.findOne)
  .delete(passport.authenticate('jwt', { session: false }), loaihinhkinhteController.delete)
  .put(passport.authenticate('jwt', { session: false }), loaihinhkinhteController.update)
