import express from 'express';
import passport from 'passport';
import mucthanhvienController from './mucthanhvien.controller';

export const mucthanhvienRouter = express.Router();
mucthanhvienRouter
  .route('/')
  .get(mucthanhvienController.findAll)
  .post(passport.authenticate('jwt', { session: false }), mucthanhvienController.create)

mucthanhvienRouter
  .route('/:id')
  .get(mucthanhvienController.findOne)
  .put(passport.authenticate('jwt', { session: false }), mucthanhvienController.update)
  .delete(passport.authenticate('jwt', { session: false }), mucthanhvienController.delete);
