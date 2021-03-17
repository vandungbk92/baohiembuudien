import express from 'express';
import passport from 'passport';
import thongtinnuocthaiController from './thongtinnuocthai.controller';

export const thongtinnuocthaiRouter = express.Router();

thongtinnuocthaiRouter.post('/',passport.authenticate('jwt', { session: false }), thongtinnuocthaiController.create)
thongtinnuocthaiRouter.get('/',passport.authenticate('jwt', { session: false }), thongtinnuocthaiController.findAll);

thongtinnuocthaiRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), thongtinnuocthaiController.findOne)
  .delete(passport.authenticate('jwt', { session: false }), thongtinnuocthaiController.delete)
  .put(passport.authenticate('jwt', { session: false }), thongtinnuocthaiController.update)
