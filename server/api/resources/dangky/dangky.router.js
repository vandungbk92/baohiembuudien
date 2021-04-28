import express from 'express';
import passport from 'passport';
import dangkyController from './dangky.controller';
import dkkhambenhController from './dkkhambenh.controller';

export const dangkyRouter = express.Router();

dangkyRouter.post('/',passport.authenticate('jwt', { session: false }),  dangkyController.create)
dangkyRouter.get('/',passport.authenticate('jwt', { session: false }),  dangkyController.findAll);

dangkyRouter
    .route('/:id')
    .get(passport.authenticate('jwt', { session: false }), dangkyController.findOne)
    .delete(passport.authenticate('jwt', { session: false }), dangkyController.delete)
    .put(passport.authenticate('jwt', { session: false }), dangkyController.update)

dangkyRouter.get('/:id/chitiet', passport.authenticate('jwt', { session: false }), dkkhambenhController.chitietDangKy)
dangkyRouter.get('/:id/henkham', passport.authenticate('jwt', { session: false }), dkkhambenhController.chitietHenKham)
