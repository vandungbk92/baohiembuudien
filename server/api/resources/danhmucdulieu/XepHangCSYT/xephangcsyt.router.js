import express from 'express';
import passport from 'passport';
import xephangcsytController from './xephangcsyt.controller';

export const xephangcsytRouter = express.Router();

xephangcsytRouter.post('/',passport.authenticate('jwt', { session: false }), xephangcsytController.create)
xephangcsytRouter.get('/',passport.authenticate('jwt', { session: false }), xephangcsytController.findAll);

xephangcsytRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), xephangcsytController.findOne)
  .delete(passport.authenticate('jwt', { session: false }), xephangcsytController.delete)
  .put(passport.authenticate('jwt', { session: false }), xephangcsytController.update)
