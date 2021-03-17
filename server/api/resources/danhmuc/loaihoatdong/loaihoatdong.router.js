import express from 'express';
import passport from 'passport';
import loaihoatdongController from './loaihoatdong.controller';

export const loaihoatdongRouter = express.Router();

loaihoatdongRouter.post('/',passport.authenticate('jwt', { session: false }), loaihoatdongController.create)
loaihoatdongRouter.get('/',passport.authenticate('jwt', { session: false }), loaihoatdongController.findAll);

loaihoatdongRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), loaihoatdongController.findOne)
  .delete(passport.authenticate('jwt', { session: false }), loaihoatdongController.delete)
  .put(passport.authenticate('jwt', { session: false }), loaihoatdongController.update)
