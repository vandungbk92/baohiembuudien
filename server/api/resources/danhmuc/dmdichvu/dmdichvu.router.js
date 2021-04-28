import express from 'express';
import passport from 'passport';
import dmdichvuController from './dmdichvu.controller';

export const dmdichvuRouter = express.Router();


dmdichvuRouter.post('/',passport.authenticate('jwt', { session: false }),  dmdichvuController.create)
dmdichvuRouter.get('/',passport.authenticate('jwt', { session: false }),  dmdichvuController.findAll);

dmdichvuRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), dmdichvuController.findOne)
  .delete(passport.authenticate('jwt', { session: false }), dmdichvuController.delete)
  .put(passport.authenticate('jwt', { session: false }), dmdichvuController.update)
