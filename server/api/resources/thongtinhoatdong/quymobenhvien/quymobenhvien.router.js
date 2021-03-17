import express from 'express';
import passport from 'passport';
import quymobenhvienController from './quymobenhvien.controller';

export const quymobenhvienRouter = express.Router();

quymobenhvienRouter.post('/',passport.authenticate('jwt', { session: false }), quymobenhvienController.create)

quymobenhvienRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), quymobenhvienController.findOne)
  .put(passport.authenticate('jwt', { session: false }), quymobenhvienController.update)
