import express from 'express';
import passport from 'passport';
import huongdanController from './huongdan.controller';

export const huongdanRouter = express.Router();
huongdanRouter
  .route('/')
  .get(huongdanController.getAll)
  .post(passport.authenticate('jwt', { session: false }), huongdanController.create)

huongdanRouter
  .route('/:id')
  .get(huongdanController.findOne)
  .put(passport.authenticate('jwt', { session: false }), huongdanController.update)
  .delete(passport.authenticate('jwt', { session: false }), huongdanController.delete);
