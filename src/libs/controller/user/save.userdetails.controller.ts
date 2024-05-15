import { Request, Response } from "express";
import { userProducer } from "../../../events/userUpdateProducer";
import { Dependencies } from "../../../utils/interfaces/dependency.interface";
import { HttpStatus } from "../../../utils/enums/http.statuscodes";

export default (dependencies: Dependencies) => {
  const {
    useCase: { saveUserData_useCase },
  } = dependencies;

  const saveUserDataController = async (req: Request, res: Response) => {
    try {
      const data = req.body;

      const response = await saveUserData_useCase(dependencies).executeFunction(
        data
      );

      if (response.status) {
        await userProducer(response.user, "userTopic", "updateUser");
        res
          .status(HttpStatus.CREATED)
          .json({ status: true, message: "user-details saved successfully" });
      }
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: false, message: "failed to save user details" });
    }
  };
  return saveUserDataController;
};
