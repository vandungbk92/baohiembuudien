import express from 'express';
import passport from 'passport';
import nuocthaicosoxulyController from './nuocthaicosoxuly.controller';

export const nuocthaicosoxulyRouter = express.Router();

nuocthaicosoxulyRouter.post('/',passport.authenticate('jwt', { session: false }), nuocthaicosoxulyController.create)
nuocthaicosoxulyRouter.get('/',passport.authenticate('jwt', { session: false }), nuocthaicosoxulyController.findAll);

nuocthaicosoxulyRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), nuocthaicosoxulyController.findOne)
  .delete(passport.authenticate('jwt', { session: false }), nuocthaicosoxulyController.delete)
  .put(passport.authenticate('jwt', { session: false }), nuocthaicosoxulyController.update)
