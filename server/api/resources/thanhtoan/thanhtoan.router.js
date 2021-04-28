import express from 'express';
import passport from 'passport';
import thanhtoanController from './thanhtoan.controller';

export const thanhtoanRouter = express.Router();


thanhtoanRouter.post('/',passport.authenticate('jwt', { session: false }),  thanhtoanController.create)
thanhtoanRouter.get('/',passport.authenticate('jwt', { session: false }),  thanhtoanController.findAll);

thanhtoanRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), thanhtoanController.findOne)
  .delete(passport.authenticate('jwt', { session: false }), thanhtoanController.delete)
  .put(passport.authenticate('jwt', { session: false }), thanhtoanController.update)
