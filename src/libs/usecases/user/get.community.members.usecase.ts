import { Dependencies } from "../../../utils/interfaces/dependency.interface";

export const getCommunityMembers_useCase = (dependencies: Dependencies) => {
  const {
    repository: { userRepository },
  } = dependencies;

  const executeFunction = async (communityId: string) => {
    try {
      const response = await userRepository.getCommunityMembers(communityId);

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
      console.log("error in get community members usecase:", error);
      return { status: false, message: "error in finding members" };
    }
  };
  return { executeFunction };
};
