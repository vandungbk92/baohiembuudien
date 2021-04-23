import express from 'express';
import passport from 'passport';
import danhmuchuongdanController from './danhmuchuongdan.controller';

export const danhmuchuongdanRouter = express.Router();
danhmuchuongdanRouter
  .route('/')
  .get(danhmuchuongdanController.getAll)
  .post(passport.authenticate('jwt', { session: false }), danhmuchuongdanController.create)

danhmuchuongdanRouter
  .route('/:id')
  .get(danhmuchuongdanController.findOne)
  .put(passport.authenticate('jwt', { session: false }), danhmuchuongdanController.update)
  .delete(passport.authenticate('jwt', { session: false }), danhmuchuongdanController.delete);
