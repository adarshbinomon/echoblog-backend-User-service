import { Dependencies } from "../../../utils/interfaces/dependency.interface";

export const chagePremiumStatusUseCase = (dependencies: Dependencies) => {
  const {
    repository: { userRepository },
  } = dependencies;

  const executeFunction = async (userId: string) => {
    try {
      const response = await userRepository.changePremiumStatus(userId);
      if (response.status) {
        return response;
      } else {
        return {
          status: false,
          message: "error in change premium Status usecase",
        };
      }
    } catch (error) {
      console.log("error in change premuim status usecase", error);
      return {
        status: false,
        message: "error in change premium Status usecase",
      };
    }
  };
  return { executeFunction };
};
