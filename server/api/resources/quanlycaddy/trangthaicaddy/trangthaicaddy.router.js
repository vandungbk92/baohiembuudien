import express from 'express';
import passport from 'passport';
import trangthaicaddyController from './trangthaicaddy.controller';

export const trangthaicaddyRouter = express.Router();
trangthaicaddyRouter
  .route('/')
  .get(trangthaicaddyController.findAll)
  .post(passport.authenticate('jwt', { session: false }), trangthaicaddyController.create)

trangthaicaddyRouter
  .route('/:id')
  .get(trangthaicaddyController.findOne)
  .put(passport.authenticate('jwt', { session: false }), trangthaicaddyController.update)
  .delete(passport.authenticate('jwt', { session: false }), trangthaicaddyController.delete);
