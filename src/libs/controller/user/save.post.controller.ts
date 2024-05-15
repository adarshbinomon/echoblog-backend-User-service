import { Request, Response } from "express";
import { Dependencies } from "../../../utils/interfaces/dependency.interface";
import { HttpStatus } from "../../../utils/enums/http.statuscodes";

export default (depedndencies: Dependencies) => {
  const {
    useCase: { savePost_useCase },
  } = depedndencies;

  const savePostController = async (req: Request, res: Response) => {
    try {
      const { userId, postId } = req.body;

      const resposne = await savePost_useCase(depedndencies).executeFunction(
        userId,
        postId
      );

      if (resposne.status) {
        res
          .status(HttpStatus.CREATED)
          .json({ status: true, message: "post saved", user: resposne.user });
      }
    } catch (error) {
      console.log("error in save post controller:", error);

      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ status: false, message: "post not saved" });
    }
  };
  return savePostController;
};
