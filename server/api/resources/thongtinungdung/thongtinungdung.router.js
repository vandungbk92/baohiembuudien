import express from 'express';
import passport from 'passport';
import thongtinungdungController from './thongtinungdung.controller';

export const thongtinungdungRouter = express.Router();
thongtinungdungRouter.route('/')
  .post(passport.authenticate('jwt', { session: false }),thongtinungdungController.create)
  .get(passport.authenticate('jwt', { session: false }),thongtinungdungController.findOne)
  .put(passport.authenticate('jwt', { session: false }),thongtinungdungController.update)

thongtinungdungRouter
  .route('/:id').delete(passport.authenticate('jwt', { session: false }),thongtinungdungController.delete)