import { Request, Response } from "express";
import { UserData } from "../../../utils/interfaces/interfaces";
import { userProducer } from "../../../events/userUpdateProducer";
import { Dependencies } from "../../../utils/interfaces/dependency.interface";
import { HttpStatus } from "../../../utils/enums/http.statuscodes";

export default (dependencies: Dependencies) => {
  const {
    useCase: { editUserProfile_useCase },
  } = dependencies;

  const editUserProfileController = async (req: Request, res: Response) => {
    try {
      const data: UserData = req.file
        ? { ...req.body, [req.file.fieldname]: req.file.location }
        : { ...req.body };

      const response = await editUserProfile_useCase(
        dependencies
      ).executeFunction(data);

      if (response.status) {
        await userProducer(data, "userTopic", "updateUser");
        res.status(HttpStatus.OK).json({
          status: true,
          user: response.user,
          message: "user data edited successfuly",
        });
      }
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: false, message: "failed to edit user data" });
    }
  };
  return editUserProfileController;
};
