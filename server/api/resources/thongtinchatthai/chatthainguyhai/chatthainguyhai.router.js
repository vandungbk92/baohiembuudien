import express from 'express';
import passport from 'passport';
import chatthainguyhaiController from './chatthainguyhai.controller';

export const chatthainguyhaiRouter = express.Router();

chatthainguyhaiRouter.post('/',passport.authenticate('jwt', { session: false }), chatthainguyhaiController.create)
chatthainguyhaiRouter.get('/',passport.authenticate('jwt', { session: false }), chatthainguyhaiController.findAll);

chatthainguyhaiRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), chatthainguyhaiController.findOne)
  .delete(passport.authenticate('jwt', { session: false }), chatthainguyhaiController.delete)
  .put(passport.authenticate('jwt', { session: false }), chatthainguyhaiController.update)
