import express from 'express';
import passport from 'passport';
import loaihinhthuchienController from './loaihinhthuchien.controller';

export const loaihinhthuchienRouter = express.Router();

loaihinhthuchienRouter.post('/',passport.authenticate('jwt', { session: false }), loaihinhthuchienController.create)
loaihinhthuchienRouter.get('/',passport.authenticate('jwt', { session: false }), loaihinhthuchienController.findAll);

loaihinhthuchienRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), loaihinhthuchienController.findOne)
  .delete(passport.authenticate('jwt', { session: false }), loaihinhthuchienController.delete)
  .put(passport.authenticate('jwt', { session: false }), loaihinhthuchienController.update)
