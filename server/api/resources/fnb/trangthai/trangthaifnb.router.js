import express from 'express';
import passport from 'passport';
import trangthaiController from './trangthai.controller';

export const trangthaiRouter = express.Router();
trangthaiRouter
  .route('/')
  .get(trangthaiController.findAll)
  .post(passport.authenticate('jwt', { session: false }), trangthaiController.create)

trangthaiRouter
  .route('/:id')
  .get(trangthaiController.findOne)
  .put(passport.authenticate('jwt', { session: false }), trangthaiController.update)
  .delete(passport.authenticate('jwt', { session: false }), trangthaiController.delete);
