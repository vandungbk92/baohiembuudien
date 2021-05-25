import express from 'express';
import passport from 'passport';
import caddyController from './caddy.controller';

export const caddyRouter = express.Router();
caddyRouter
  .route('/')
  .get(caddyController.getAll)
  .post(passport.authenticate('jwt', { session: false }), caddyController.create)
caddyRouter
  .route('/:id')
  .get(caddyController.findOne)
  .put(passport.authenticate('jwt', { session: false }), caddyController.update)
  .delete(passport.authenticate('jwt', { session: false }), caddyController.delete);

caddyRouter.get('/:id/lich-lam-viec-caddy', passport.authenticate('jwt', { session: false }), caddyController.getAllDslichlamviec);
