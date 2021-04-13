import express from 'express';
import passport from 'passport';
import proshopController from './proshop.controller';

export const proshopRouter = express.Router();

proshopRouter.post('/',passport.authenticate('jwt', { session: false }), proshopController.create)
proshopRouter.get('/',passport.authenticate('jwt', { session: false }), proshopController.getAll);



proshopRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), proshopController.findOne)
  .delete(passport.authenticate('jwt', { session: false }), proshopController.delete)
  .put(passport.authenticate('jwt', { session: false }), proshopController.update)

