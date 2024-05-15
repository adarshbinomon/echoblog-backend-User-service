import { Request, Response } from "express";
import { Dependencies } from "../../../utils/interfaces/dependency.interface";
import { HttpStatus } from "../../../utils/enums/http.statuscodes";
export default (dependencies: Dependencies) => {
  const {
    useCase: { getCommunityMembers_useCase },
  } = dependencies;

  const getCommunityMembersController = async (req: Request, res: Response) => {
    try {
      const communityId = req.params.communityId;
      const response = await getCommunityMembers_useCase(
        dependencies
      ).executeFunction(communityId);

      if (response.status) {
        res.status(HttpStatus.OK).json({
          status: true,
          message: response.message,
          users: response.users,
        });
      } else {
        res.status(HttpStatus.NOT_FOUND).json({ status: false, message: response.message });
      }
    } catch (error) {
      console.log("error in get community members controller: ", error);
      res
        .status(HttpStatus.NOT_FOUND)
        .json({ status: false, message: "error in finding members" });
    }
  };
  return getCommunityMembersController;
};
