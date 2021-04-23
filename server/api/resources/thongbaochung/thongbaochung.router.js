import express from 'express';
import passport from 'passport';
import thongbaochungController from './thongbaochung.controller';

export const thongbaochungRouter = express.Router();
thongbaochungRouter
  .route('/')
  .get(thongbaochungController.getAll)
  .post(passport.authenticate('jwt', { session: false }), thongbaochungController.create);

thongbaochungRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), thongbaochungController.getById)
  .put(passport.authenticate('jwt', { session: false }), thongbaochungController.update)


