import express from 'express';
import passport from 'passport';
import dmdanhgiaController from './dmdanhgia.controller';

export const dmdanhgiaRouter = express.Router();


dmdanhgiaRouter.post('/',passport.authenticate('jwt', { session: false }),  dmdanhgiaController.create)
dmdanhgiaRouter.get('/', dmdanhgiaController.findAll);

dmdanhgiaRouter
  .route('/:id')
  .get(dmdanhgiaController.findOne)
  .delete(passport.authenticate('jwt', { session: false }), dmdanhgiaController.delete)
  .put(passport.authenticate('jwt', { session: false }), dmdanhgiaController.update)
