import express from 'express';
import passport from 'passport';
import trangthaifnbController from './trangthaifnb.controller';

export const trangthaifnbRouter = express.Router();
trangthaifnbRouter
  .route('/')
  .get(trangthaifnbController.findAll)
  .post(passport.authenticate('jwt', { session: false }), trangthaifnbController.create)

trangthaifnbRouter
  .route('/:id')
  .get(trangthaifnbController.findOne)
  .put(passport.authenticate('jwt', { session: false }), trangthaifnbController.update)
  .delete(passport.authenticate('jwt', { session: false }), trangthaifnbController.delete);
