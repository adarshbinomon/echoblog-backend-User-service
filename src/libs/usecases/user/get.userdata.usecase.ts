import { Dependencies } from "../../../utils/interfaces/dependency.interface";

export const getUser_useCase = (dependencies: Dependencies) => {
  const {
    repository: { userRepository },
  } = dependencies;

  const executeFunction = async (userId: string) => {
    try {
      const response = await userRepository?.findUser(userId);
      if (response.status) {
        return {
          status: true,
          message: "user found successfully",
          user: response.user,
        };
      } else {
        return { status: false, message: response.message };
      }
    } catch (error) {
      console.log(error, "error in getUser_useCase");
    }
  };
  return { executeFunction };
};
