import express from 'express';
import passport from 'passport';
import nguyenvatlieuController from './nguyenvatlieu.controller';

export const nguyenvatlieuRouter = express.Router();

nguyenvatlieuRouter.post('/',passport.authenticate('jwt', { session: false }), nguyenvatlieuController.create)

nguyenvatlieuRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), nguyenvatlieuController.findOne)
  .delete(passport.authenticate('jwt', { session: false }), nguyenvatlieuController.delete)
  .put(passport.authenticate('jwt', { session: false }), nguyenvatlieuController.update)
