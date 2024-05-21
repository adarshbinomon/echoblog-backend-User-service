import { Dependencies } from "../../../utils/interfaces/dependency.interface";
import { Request, Response } from "express";
import { UserData } from "../../../utils/interfaces/interfaces";
import { HttpStatus } from "../../../utils/enums/http.statuscodes";

interface AuthenticatedRequest extends Request {
  user?: UserData;
}

export default (dependencies: Dependencies) => {
  const {
    useCase: { chagePremiumStatusUseCase },
  } = dependencies;
  const changePremiumStatusController = async (
    req: AuthenticatedRequest,
    res: Response
  ) => {
    const user = req.user;

    try {
      const response = await chagePremiumStatusUseCase(
        dependencies
      ).executeFunction(user?._id);

      if (response.status) {
        res.redirect("https://echoblog.live/edit-profile/premium/success");
      } else {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ status: false, message: "Failed to change premium status" });
      }
    } catch (error) {
      console.error("Error changing premium status:", error);
      res.status(500).json({ status: false, message: "Internal server error" });
    }
  };

  return changePremiumStatusController;
};
