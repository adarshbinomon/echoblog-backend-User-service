import { Request, Response } from "express";
import { Dependencies } from "../../../utils/interfaces/dependency.interface";
import { HttpStatus } from "../../../utils/enums/http.statuscodes";

export default (dependencies: Dependencies) => {
  const {
    useCase: { findAllUsersAdmin_useCase },
  } = dependencies;

  const findAllUsersAdminController = async (req: Request, res: Response) => {
    try {
      const response = await findAllUsersAdmin_useCase(
        dependencies
      ).executeFunction();

      if (response.status) {
        res.status(HttpStatus.OK).json({
          status: true,
          message: "response.message",
          users: response.users,
        });
      } else {
        res.status(HttpStatus.NOT_FOUND).json({ status: true, message: "response.message" });
      }
    } catch (error) {
      console.log("error in find all user admin controller:", error);

      return { status: false, message: "users not found" };
    }
  };
  return findAllUsersAdminController;
};
