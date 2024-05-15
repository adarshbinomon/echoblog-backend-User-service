import { HttpStatus } from "../../../utils/enums/http.statuscodes";
import { Dependencies } from "../../../utils/interfaces/dependency.interface";
import { Request, Response } from "express";

export default (dependencies: Dependencies) => {
  const {
    useCase: { getMonthlyUserCountUseCase },
  } = dependencies;

  const getMonthlyUserCountController = async (req: Request, res: Response) => {
    try {
      const monthlyUserCount = await getMonthlyUserCountUseCase(
        dependencies
      ).executeFunction();

      if (monthlyUserCount) {
        res.status(HttpStatus.OK).json(monthlyUserCount);
      }
    } catch (error) {
      console.log("error in get getMonthlyUserCountController ", error);
      res
        .status(HttpStatus.NOT_FOUND)
        .json({ status: false, message: "error in finding posts" });
    }
  };
  return getMonthlyUserCountController;
};
