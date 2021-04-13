import express from 'express';
import passport from 'passport';
import trangthaivoucherController from './trangthaivoucher.controller';

export const trangthaivoucherRouter = express.Router();
trangthaivoucherRouter
  .route('/')
  .get(trangthaivoucherController.findAll)
  .post(passport.authenticate('jwt', { session: false }), trangthaivoucherController.create)

trangthaivoucherRouter
  .route('/:id')
  .get(trangthaivoucherController.findOne)
  .put(passport.authenticate('jwt', { session: false }), trangthaivoucherController.update)
  .delete(passport.authenticate('jwt', { session: false }), trangthaivoucherController.delete);
