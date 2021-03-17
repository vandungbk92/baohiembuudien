import express from 'express';
import passport from 'passport';
import thongtinhoatdongController from './thongtinhoatdong.controller';

export const thongtinhoatdongRouter = express.Router();

thongtinhoatdongRouter.get('/',passport.authenticate('jwt', { session: false }), thongtinhoatdongController.getThongTinHoatDong)

