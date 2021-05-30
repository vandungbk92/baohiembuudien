import express from "express";
import passport from "passport";
import danhgiaController from "./danhgia.controller";

export const danhgiaRouter = express.Router();
// danhgiaRouter
//   .route("/")
//   .get(danhgiaController.findAll)
//   .post(danhgiaController.create);
// // .post(passport.authenticate("jwt", { session: false }), danhgiaController.create);

// danhgiaRouter
//   .route("/:id")
//   .get(danhgiaController.findOne)
//   .put(danhgiaController.update)
//   .delete(danhgiaController.delete);

//xac thuc
danhgiaRouter
  .route("/")
  .get(passport.authenticate("jwt", { session: false }), danhgiaController.findAll)
  .post(passport.authenticate("jwt", { session: false }), danhgiaController.create);

danhgiaRouter
  .route("/:id")
  .get(passport.authenticate("jwt", { session: false }), danhgiaController.findOne)
  .put(passport.authenticate("jwt", { session: false }), danhgiaController.update)
  .delete(passport.authenticate("jwt", { session: false }), danhgiaController.delete);

danhgiaRouter.route("/lichhenid/:id").get(danhgiaController.findOneByLichHenId);
