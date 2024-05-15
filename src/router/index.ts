import { Dependencies } from "../utils/interfaces/dependency.interface";
import userRouter from "./user/user.router";
import express from "express";

export const routes = (dependencies: Dependencies) => {
  const routes = express.Router();

  routes.use("/user", userRouter(dependencies));
  return routes
};
