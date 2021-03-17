import express from 'express';
import passport from 'passport';
import dmnguyenvatlieuController from './dmnguyenvatlieu.controller';

export const dmnguyenvatlieuRouter = express.Router();

dmnguyenvatlieuRouter.post('/',passport.authenticate('jwt', { session: false }), dmnguyenvatlieuController.create)
dmnguyenvatlieuRouter.get('/',passport.authenticate('jwt', { session: false }), dmnguyenvatlieuController.findAll);

dmnguyenvatlieuRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), dmnguyenvatlieuController.findOne)
  .delete(passport.authenticate('jwt', { session: false }), dmnguyenvatlieuController.delete)
  .put(passport.authenticate('jwt', { session: false }), dmnguyenvatlieuController.update)
