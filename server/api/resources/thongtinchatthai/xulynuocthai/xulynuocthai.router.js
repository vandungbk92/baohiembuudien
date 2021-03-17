import express from 'express';
import passport from 'passport';
import xulynuocthaiController from './xulynuocthai.controller';

export const xulynuocthaiRouter = express.Router();

xulynuocthaiRouter.post('/',passport.authenticate('jwt', { session: false }), xulynuocthaiController.create)
xulynuocthaiRouter.get('/',passport.authenticate('jwt', { session: false }), xulynuocthaiController.findAll);

xulynuocthaiRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), xulynuocthaiController.findOne)
  .delete(passport.authenticate('jwt', { session: false }), xulynuocthaiController.delete)
  .put(passport.authenticate('jwt', { session: false }), xulynuocthaiController.update)
