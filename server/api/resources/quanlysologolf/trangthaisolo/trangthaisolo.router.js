import express from 'express';
import passport from 'passport';
import trangthaisoloController from './trangthaisolo.controller';

export const trangthaisoloRouter = express.Router();
trangthaisoloRouter
  .route('/')
  .get(trangthaisoloController.findAll)
  .post(passport.authenticate('jwt', { session: false }), trangthaisoloController.create)

trangthaisoloRouter
  .route('/:id')
  .get(trangthaisoloController.findOne)
  .put(passport.authenticate('jwt', { session: false }), trangthaisoloController.update)
  .delete(passport.authenticate('jwt', { session: false }), trangthaisoloController.delete);
