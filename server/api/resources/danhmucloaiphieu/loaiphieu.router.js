import express from 'express';
import passport from 'passport';
import loaiphieuController from './loaiphieu.controller';

export const loaiphieuRouter = express.Router();

loaiphieuRouter.post('/',passport.authenticate('jwt', { session: false }), loaiphieuController.create)
loaiphieuRouter.get('/',passport.authenticate('jwt', { session: false }), loaiphieuController.findAll);

loaiphieuRouter.get('/thong-ke', passport.authenticate('jwt', { session: false }), loaiphieuController.thongkeLoaiPhieu)

loaiphieuRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), loaiphieuController.findOne)
  .delete(passport.authenticate('jwt', { session: false }), loaiphieuController.delete)
  .put(passport.authenticate('jwt', { session: false }), loaiphieuController.update)

