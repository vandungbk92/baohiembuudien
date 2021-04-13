import express from 'express';
import passport from 'passport';
import voucherController from './voucher.controller';

export const voucherRouter = express.Router();
voucherRouter
  .route('/')
  .get(voucherController.findAll)
  .post(passport.authenticate('jwt', { session: false }), voucherController.create)

voucherRouter
  .route('/:id')
  .get(voucherController.findOne)
  .put(passport.authenticate('jwt', { session: false }), voucherController.update)
  .delete(passport.authenticate('jwt', { session: false }), voucherController.delete);
