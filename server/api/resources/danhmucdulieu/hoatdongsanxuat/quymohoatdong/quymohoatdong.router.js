import express from 'express';
import passport from 'passport';
import quymohoatdongController from './quymohoatdong.controller';

export const quymohoatdongRouter = express.Router();

quymohoatdongRouter.post('/',passport.authenticate('jwt', { session: false }), quymohoatdongController.create)
quymohoatdongRouter.get('/',passport.authenticate('jwt', { session: false }), quymohoatdongController.findAll);

quymohoatdongRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), quymohoatdongController.findOne)
  .delete(passport.authenticate('jwt', { session: false }), quymohoatdongController.delete)
  .put(passport.authenticate('jwt', { session: false }), quymohoatdongController.update)
