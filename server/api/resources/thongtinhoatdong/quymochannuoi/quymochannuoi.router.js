import express from 'express';
import passport from 'passport';
import quymochannuoiController from './quymochannuoi.controller';

export const quymochannuoiRouter = express.Router();

quymochannuoiRouter.post('/',passport.authenticate('jwt', { session: false }), quymochannuoiController.create)

quymochannuoiRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), quymochannuoiController.findOne)
  .put(passport.authenticate('jwt', { session: false }), quymochannuoiController.update)
