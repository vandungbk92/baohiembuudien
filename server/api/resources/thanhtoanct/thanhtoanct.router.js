import express from 'express';
import passport from 'passport';
import thanhtoanctController from './thanhtoanct.controller';

export const thanhtoanctctRouter = express.Router();


thanhtoanctctRouter.post('/',passport.authenticate('jwt', { session: false }),  thanhtoanctController.create)
thanhtoanctctRouter.get('/',passport.authenticate('jwt', { session: false }),  thanhtoanctController.findAll);

thanhtoanctctRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), thanhtoanctController.findOne)
  .delete(passport.authenticate('jwt', { session: false }), thanhtoanctController.delete)
  .put(passport.authenticate('jwt', { session: false }), thanhtoanctController.update)
