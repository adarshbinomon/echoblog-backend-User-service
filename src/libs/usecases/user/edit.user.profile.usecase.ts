import { Dependencies } from "../../../utils/interfaces/dependency.interface";
import { UserData } from "../../../utils/interfaces/interfaces";

export const editUserProfile_useCase = (dependencies: Dependencies) => {
  const {
    repository: { userRepository },
  } = dependencies;

  const executeFunction = async (data: UserData) => {
    try {
      const updatedUser = await userRepository?.saveData(data);

      return {
        status: true,
        message: "User data Updated successfully",
        user: updatedUser.response,
      };
    } catch (error) {
      console.log(error, "error in editUserProfile_useCase");
    }
  };
  return { executeFunction };
};
