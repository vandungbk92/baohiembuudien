import express from 'express';
import passport from 'passport';
import nhienlieutieuthuController from './nhienlieutieuthu.controller';

export const nhienlieutieuthuRouter = express.Router();

nhienlieutieuthuRouter.post('/',passport.authenticate('jwt', { session: false }), nhienlieutieuthuController.create)
nhienlieutieuthuRouter.get('/',passport.authenticate('jwt', { session: false }), nhienlieutieuthuController.findAll);

nhienlieutieuthuRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), nhienlieutieuthuController.findOne)
  .delete(passport.authenticate('jwt', { session: false }), nhienlieutieuthuController.delete)
  .put(passport.authenticate('jwt', { session: false }), nhienlieutieuthuController.update)
