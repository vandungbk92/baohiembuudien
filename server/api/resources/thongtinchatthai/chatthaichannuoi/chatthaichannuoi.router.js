import express from 'express';
import passport from 'passport';
import chatthaichannuoiController from './chatthaichannuoi.controller';

export const chatthaichannuoiRouter = express.Router();

chatthaichannuoiRouter.post('/',passport.authenticate('jwt', { session: false }), chatthaichannuoiController.create)
chatthaichannuoiRouter.get('/',passport.authenticate('jwt', { session: false }), chatthaichannuoiController.findAll);

chatthaichannuoiRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), chatthaichannuoiController.findOne)
  .delete(passport.authenticate('jwt', { session: false }), chatthaichannuoiController.delete)
  .put(passport.authenticate('jwt', { session: false }), chatthaichannuoiController.update)
