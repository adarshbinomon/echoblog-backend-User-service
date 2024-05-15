import { Dependencies } from "../../../utils/interfaces/dependency.interface";

export const findAllUsers_useCase = (dependencies: Dependencies) => {
  const {
    repository: { userRepository },
  } = dependencies;

  const executeFunction = async (userId: string) => {
    try {
      const response = await userRepository.findAllUsersExcept(userId);
      if (response.status) {
        return {
          status: true,
          message: response.message,
          users: response.users,
        };
      } else {
        return { status: false, message: response.message };
      }
    } catch (error) {
      console.log("error in find all users usecase:", error);
      return { status: false, message: "error in find all user usecase" };
    }
  };

  return { executeFunction };
};
