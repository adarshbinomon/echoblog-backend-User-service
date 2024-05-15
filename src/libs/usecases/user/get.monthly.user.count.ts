export const getMonthlyUserCountUseCase = (dependencies: any) => {
  const {
    repository: { userRepository },
  } = dependencies;

  const executeFunction = async () => {
    try {
      const usersPerMonth = await userRepository.getMonthlyUserCount();

      if (usersPerMonth) {
        return usersPerMonth;
      }
    } catch (error) {
      console.log("error in getMonthlyuserscopuntusecase", error);
      return {
        status: false,
        message: "error in getMonthlyuserscopuntusecase",
      };
    }
  };
  return { executeFunction };
};
