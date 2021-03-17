import express from 'express';
import passport from 'passport';
import thongtinkhithaiController from './thongtinkhithai.controller';

export const thongtinkhithaiRouter = express.Router();

thongtinkhithaiRouter.post('/',passport.authenticate('jwt', { session: false }), thongtinkhithaiController.create)
thongtinkhithaiRouter.get('/',passport.authenticate('jwt', { session: false }), thongtinkhithaiController.findAll);

thongtinkhithaiRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), thongtinkhithaiController.findOne)
  .delete(passport.authenticate('jwt', { session: false }), thongtinkhithaiController.delete)
  .put(passport.authenticate('jwt', { session: false }), thongtinkhithaiController.update)
