import { Request, Response } from "express";
import { Dependencies } from "../../../utils/interfaces/dependency.interface";
import { HttpStatus } from "../../../utils/enums/http.statuscodes";

export default (dependencies: Dependencies) => {
  
  const {
    useCase: { getUser_useCase },
  } = dependencies;

  const getUserController = async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
      const response = await getUser_useCase(dependencies).executeFunction(
        userId
      );

      if (response.status) {
        res
          .status(HttpStatus.OK)
          .json({ status: true, message: "user found", user: response.user });
      } else {
        res.status(HttpStatus.NOT_FOUND).json({ status: false, message: response.message });
      }
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).json({ status: false, message: "user not found" });
    }
  };
  return getUserController;
};
