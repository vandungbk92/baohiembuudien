import express from 'express';
import passport from 'passport';
import ketquaclsController from './ketquacls.controller';

export const ketquaclsRouter = express.Router();


ketquaclsRouter.post('/',passport.authenticate('jwt', { session: false }),  ketquaclsController.create)
ketquaclsRouter.get('/',passport.authenticate('jwt', { session: false }),  ketquaclsController.findAll);

ketquaclsRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), ketquaclsController.findOne)
  .delete(passport.authenticate('jwt', { session: false }), ketquaclsController.delete)
  .put(passport.authenticate('jwt', { session: false }), ketquaclsController.update)
