import { Request, Response } from "express";
import { Dependencies } from "../../../utils/interfaces/dependency.interface";
import { HttpStatus } from "../../../utils/enums/http.statuscodes";

export default (dependencies: Dependencies) => {
  const {
    useCase: { findAllUsers_useCase },
  } = dependencies;

  const findAllUsersController = async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;
      const response = await findAllUsers_useCase(
        dependencies
      ).executeFunction(userId);

      if (response.status) {
        res.status(HttpStatus.OK).json({
          status: true,
          message: response.message,
          users: response.users,
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ status: false, message: response.message });
      }
    } catch (error) {
      console.log("error in find all user controller:", error);
      res.status(500).json({ status: false, message: "cannot find users" });
    }
  };
  return findAllUsersController;
};
