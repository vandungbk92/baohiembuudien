import express from 'express';
import passport from 'passport';
import hoatdongdonviController from './hoatdongdonvi.controller';

export const hoatdongdonviRouter = express.Router();

hoatdongdonviRouter.post('/',passport.authenticate('jwt', { session: false }), hoatdongdonviController.create)
hoatdongdonviRouter.get('/',passport.authenticate('jwt', { session: false }), hoatdongdonviController.findAll);

hoatdongdonviRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), hoatdongdonviController.findOne)
  .delete(passport.authenticate('jwt', { session: false }), hoatdongdonviController.delete)
  .put(passport.authenticate('jwt', { session: false }), hoatdongdonviController.update)
