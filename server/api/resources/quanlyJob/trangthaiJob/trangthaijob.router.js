import express from 'express';
import passport from 'passport';
import trangthaijobController from './trangthaijob.controller';

export const trangthaijobRouter = express.Router();
trangthaijobRouter
  .route('/')
  .get(trangthaijobController.findAll)
  .post(passport.authenticate('jwt', { session: false }), trangthaijobController.create)

trangthaijobRouter
  .route('/:id')
  .get(trangthaijobController.findOne)
  .put(passport.authenticate('jwt', { session: false }), trangthaijobController.update)
  .delete(passport.authenticate('jwt', { session: false }), trangthaijobController.delete);
