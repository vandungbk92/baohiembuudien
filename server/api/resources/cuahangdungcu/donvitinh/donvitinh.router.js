import express from 'express';
import passport from 'passport';
import donvitinhController from './donvitinh.controller';

export const donvitinhRouter = express.Router();

donvitinhRouter.post('/',passport.authenticate('jwt', { session: false }), donvitinhController.create)
donvitinhRouter.get('/',passport.authenticate('jwt', { session: false }), donvitinhController.findAll);



donvitinhRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), donvitinhController.findOne)
  .delete(passport.authenticate('jwt', { session: false }), donvitinhController.delete)
  .put(passport.authenticate('jwt', { session: false }), donvitinhController.update)

