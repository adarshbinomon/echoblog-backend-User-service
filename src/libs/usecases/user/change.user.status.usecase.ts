import { Dependencies } from "../../../utils/interfaces/dependency.interface";

export const changeUserStatus_useCase = (dependencies: Dependencies) => {
  const {
    repository: { userRepository },
  } = dependencies;

  const executeFunction = async (userId: string) => {
    try {
      
      const response = await userRepository.changeUserStatus(userId);

      if (response.status) {
        return { status: true, message: response.message, user: response.user };
      } else {
        return { status: false, message: response.message };
      }
    } catch (error) {
      console.log("error in change user status usecase:", error);
      return { status: false, message: "error in changing status" };
    }
  };
  return { executeFunction };
};
