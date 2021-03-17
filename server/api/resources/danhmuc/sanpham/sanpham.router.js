import express from 'express';
import passport from 'passport';
import sanphamController from './sanpham.controller';

export const sanphamRouter = express.Router();

sanphamRouter.post('/',passport.authenticate('jwt', { session: false }), sanphamController.create)
sanphamRouter.get('/',passport.authenticate('jwt', { session: false }), sanphamController.findAll);

sanphamRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), sanphamController.findOne)
  .delete(passport.authenticate('jwt', { session: false }), sanphamController.delete)
  .put(passport.authenticate('jwt', { session: false }), sanphamController.update)
