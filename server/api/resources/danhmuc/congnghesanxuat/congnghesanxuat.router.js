import express from 'express';
import passport from 'passport';
import congnghesanxuatController from './congnghesanxuat.controller';

export const congnghesanxuatRouter = express.Router();

congnghesanxuatRouter.post('/',passport.authenticate('jwt', { session: false }), congnghesanxuatController.create)
congnghesanxuatRouter.get('/',passport.authenticate('jwt', { session: false }), congnghesanxuatController.findAll);

congnghesanxuatRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), congnghesanxuatController.findOne)
  .delete(passport.authenticate('jwt', { session: false }), congnghesanxuatController.delete)
  .put(passport.authenticate('jwt', { session: false }), congnghesanxuatController.update)
