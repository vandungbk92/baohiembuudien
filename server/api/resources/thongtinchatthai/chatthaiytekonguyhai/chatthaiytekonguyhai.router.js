import express from 'express';
import passport from 'passport';
import chatthaiytekonguyhaiController from './chatthaiytekonguyhai.controller';

export const chatthaiytekonguyhaiRouter = express.Router();

chatthaiytekonguyhaiRouter.post('/',passport.authenticate('jwt', { session: false }), chatthaiytekonguyhaiController.create)
chatthaiytekonguyhaiRouter.get('/',passport.authenticate('jwt', { session: false }), chatthaiytekonguyhaiController.findAll);

chatthaiytekonguyhaiRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), chatthaiytekonguyhaiController.findOne)
  .delete(passport.authenticate('jwt', { session: false }), chatthaiytekonguyhaiController.delete)
  .put(passport.authenticate('jwt', { session: false }), chatthaiytekonguyhaiController.update)
