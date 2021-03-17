import express from 'express';
import passport from 'passport';
import thongtinduanController from './thongtinduan.controller';

export const thongtinduanRouter = express.Router();

thongtinduanRouter.post('/',passport.authenticate('jwt', { session: false }), thongtinduanController.create)

thongtinduanRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), thongtinduanController.findOne)
  .delete(passport.authenticate('jwt', { session: false }), thongtinduanController.delete)
  .put(passport.authenticate('jwt', { session: false }), thongtinduanController.update)
