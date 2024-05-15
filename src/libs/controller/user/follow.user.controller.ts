import { Request, Response } from "express";
import { Dependencies } from "../../../utils/interfaces/dependency.interface";
import { HttpStatus } from "../../../utils/enums/http.statuscodes";

export default (dependencies: Dependencies) => {
  const {
    useCase: { followUser_useCase },
  } = dependencies;

  const followUserController = async (req: Request, res: Response) => {
    try {
      const { userId, userToBeFollowedId } = req.body;
      const response = await followUser_useCase(dependencies).executeFunction(
        userId,
        userToBeFollowedId
      );

      if (response.status) {
        res
          .status(HttpStatus.OK)
          .json({
            status: true,
            message: response.message,
            user: response.user,
          });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ status: false, message: response.message });
      }
    } catch (error) {
      console.log("error in folow user controller");

      return { status: false, message: "user follow failed" };
    }
  };
  return followUserController;
};
