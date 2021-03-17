import express from 'express';
import passport from 'passport';
import quymobenhvienController from './quymobenhvien.controller';

export const quymobenhvienRouter = express.Router();

quymobenhvienRouter.post('/',passport.authenticate('jwt', { session: false }), quymobenhvienController.create)
quymobenhvienRouter.get('/',passport.authenticate('jwt', { session: false }), quymobenhvienController.findAll);

quymobenhvienRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), quymobenhvienController.findOne)
  .delete(passport.authenticate('jwt', { session: false }), quymobenhvienController.delete)
  .put(passport.authenticate('jwt', { session: false }), quymobenhvienController.update)
