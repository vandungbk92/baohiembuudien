import express from 'express';
import passport from 'passport';
import danhgiadichvuController from './danhgiadichvu.controller';
import danhgiadichvubenhvienController from './danhgiadichvubenhvien.controller';

export const danhgiadichvuRouter = express.Router();
export const danhgiadichvubenhvienRouter = express.Router();


danhgiadichvuRouter.get('/',passport.authenticate('jwt', { session: false }),  danhgiadichvuController.findAll);
danhgiadichvuRouter.get('/thong-ke',passport.authenticate('jwt', { session: false }),  danhgiadichvuController.thongke);

danhgiadichvuRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), danhgiadichvuController.findOne)
  .delete(passport.authenticate('jwt', { session: false }), danhgiadichvuController.delete)
  .put(passport.authenticate('jwt', { session: false }), danhgiadichvuController.update)

danhgiadichvubenhvienRouter
  .get('/',passport.authenticate('jwt', { session: false }), danhgiadichvubenhvienController.findAll)
  .get('/thong-ke',passport.authenticate('jwt', { session: false }), danhgiadichvubenhvienController.thongke);
