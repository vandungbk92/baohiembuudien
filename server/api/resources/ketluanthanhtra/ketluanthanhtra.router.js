import express from 'express';
import passport from 'passport';
import ketluanthanhtraController from './ketluanthanhtra.controller';

export const ketluanthanhtraRouter = express.Router();

ketluanthanhtraRouter.post('/',passport.authenticate('jwt', { session: false }), ketluanthanhtraController.create)
ketluanthanhtraRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), ketluanthanhtraController.findOne)
  .put(passport.authenticate('jwt', { session: false }), ketluanthanhtraController.update)
