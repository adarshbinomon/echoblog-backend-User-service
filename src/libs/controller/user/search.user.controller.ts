import { Request, Response } from "express";
import { Dependencies } from "../../../utils/interfaces/dependency.interface";
import { HttpStatus } from "../../../utils/enums/http.statuscodes";

export default (dependencies: Dependencies) => {
  const {
    useCase: { searchUserUsecase },
  } = dependencies;

  const searchUserController = async (req: Request, res: Response) => {
    try {
      const { regex } = req.params;

      const response = await searchUserUsecase(dependencies).executeFunction(
        regex
      );

      if (response.status) {
        res.status(HttpStatus.OK).json({
          status: true,
          message: response.message,
          users: response.users,
        });
      } else {
        res.status(HttpStatus.NOT_FOUND).json({
          status: false,
          message: response.message,
        });
      }
    } catch (error) {
      console.log("error in search user controller:", error);
      res.status(HttpStatus.NOT_FOUND).json({
        status: false,
        message: "error in finding user",
      });
    }
  };
  return searchUserController;
};
