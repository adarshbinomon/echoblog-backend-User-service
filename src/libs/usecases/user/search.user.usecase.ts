import { Dependencies } from "../../../utils/interfaces/dependency.interface";

export const searchUserUsecase = (dependencies: Dependencies) => {
  const {
    repository: { userRepository },
  } = dependencies;

  const executeFunction = async (regex: string) => {
    try {
      const response = await userRepository.searchUser(regex);

      if (response.status) {
        return {
          status: true,
          message: response.status,
          users: response.users,
        };
      } else {
        return { status: false, message: response.status };
      }
    } catch (error) {
      console.log("error in searchuser usecase:", error);
      return { status: false, message: "error in finding user" };
    }
  };
  return { executeFunction };
};
