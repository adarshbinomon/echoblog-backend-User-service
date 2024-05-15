import { Dependencies } from "../../../utils/interfaces/dependency.interface";
import userRepository from "../../app/repository/user.repository";

export const followUser_useCase = (dependencies: Dependencies) => {
  const {
    repository: { userRepository },
  } = dependencies;

  const executeFunction = async (
    userId: string,
    userToBeFollowedId: string
  ) => {
    try {
      const user = await userRepository.findUser(userId);

      if (user?.user?.following.includes(userToBeFollowedId)) {
        const response = await userRepository.unFollowUser(
          userId,
          userToBeFollowedId
        );
        if (response.status) {
          return {
            status: true,
            message: response.message,
            user: response.user,
          };
        } else {
          return { status: false, message: response.message };
        }
      } else {
        const userToBeFollowed = await userRepository.findUser(
          userToBeFollowedId
        );
        if (userToBeFollowed?.user?.accountType === "Public") {
          const response = await userRepository.followUser(
            userId,
            userToBeFollowedId
          );

          if (response.status) {
            return {
              status: true,
              message: response.message,
              user: response.user,
            };
          } else {
            return { status: false, message: response.message };
          }
        } else {
          console.log("privateProfile");
        }
      }
    } catch (error) {
      console.log("error in follow user usecase:", error);

      return { status: false, message: "error in follow user usecase" };
    }
  };
  return { executeFunction };
};
