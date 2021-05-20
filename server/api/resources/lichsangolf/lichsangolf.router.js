import express from 'express';
import passport from 'passport';
import lichsangolfController from './lichsangolf.controller';

export const lichsangolfRouter = express.Router();
lichsangolfRouter
  .route('/')
  .get(lichsangolfController.findAll)
  .post(passport.authenticate('jwt', { session: false }), lichsangolfController.create)

lichsangolfRouter
  .get('/khung-gio-theo-thu/',passport.authenticate('jwt', { session: false }),lichsangolfController.getKhungGioTheoThu)

lichsangolfRouter
  .route('/:id')
  .get(lichsangolfController.findOne)
  .put(passport.authenticate('jwt', { session: false }), lichsangolfController.update)
  .delete(passport.authenticate('jwt', { session: false }), lichsangolfController.delete);


