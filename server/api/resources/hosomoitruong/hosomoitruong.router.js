import express from 'express';
import passport from 'passport';
import hosomoitruongController from './hosomoitruong.controller';

export const hosomoitruongRouter = express.Router();

hosomoitruongRouter.post('/',passport.authenticate('jwt', { session: false }), hosomoitruongController.create)

hosomoitruongRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), hosomoitruongController.findOne)
  .put(passport.authenticate('jwt', { session: false }), hosomoitruongController.update)
