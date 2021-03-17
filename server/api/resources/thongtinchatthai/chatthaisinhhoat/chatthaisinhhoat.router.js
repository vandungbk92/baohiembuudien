import express from 'express';
import passport from 'passport';
import chatthaisinhhoatController from './chatthaisinhhoat.controller';

export const chatthaisinhhoatRouter = express.Router();

chatthaisinhhoatRouter.post('/',passport.authenticate('jwt', { session: false }), chatthaisinhhoatController.create)
chatthaisinhhoatRouter.get('/',passport.authenticate('jwt', { session: false }), chatthaisinhhoatController.findAll);

chatthaisinhhoatRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), chatthaisinhhoatController.findOne)
  .delete(passport.authenticate('jwt', { session: false }), chatthaisinhhoatController.delete)
  .put(passport.authenticate('jwt', { session: false }), chatthaisinhhoatController.update)
