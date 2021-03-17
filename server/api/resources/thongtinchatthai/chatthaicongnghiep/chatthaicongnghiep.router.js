import express from 'express';
import passport from 'passport';
import chatthaicongnghiepController from './chatthaicongnghiep.controller';

export const chatthaicongnghiepRouter = express.Router();

chatthaicongnghiepRouter.post('/',passport.authenticate('jwt', { session: false }), chatthaicongnghiepController.create)
chatthaicongnghiepRouter.get('/',passport.authenticate('jwt', { session: false }), chatthaicongnghiepController.findAll);

chatthaicongnghiepRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), chatthaicongnghiepController.findOne)
  .delete(passport.authenticate('jwt', { session: false }), chatthaicongnghiepController.delete)
  .put(passport.authenticate('jwt', { session: false }), chatthaicongnghiepController.update)
