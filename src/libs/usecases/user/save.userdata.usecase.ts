import { Dependencies } from "../../../utils/interfaces/dependency.interface";
import { UserData } from "../../../utils/interfaces/interfaces";

export const saveUserData_useCase = (dependencies: Dependencies) => {
  const {
    repository: { userRepository },
  } = dependencies;

  const executeFunction = async (data: UserData) => {
    try {
      const userId = data._id;
      if (data.gender === "Male") {
        data.profilePicture = `https://avatar.iran.liara.run/public/boy?username=[${data?.userName}]`;
      } else if (data.gender === "Female") {
        data.profilePicture = `https://avatar.iran.liara.run/public/girl?username=[${data?.userName}]`;
      } else {
        data.profilePicture = `https://avatar.iran.liara.run/username?username=${data?.name}`;
      }

      const user = await userRepository?.findUser(userId);

      const updatedUser = await userRepository?.saveData(data);

      return {
        status: true,
        message: "user data saved successfully",
        user: updatedUser.response,
      };
    } catch (error) {
      console.log(error, "error in saveUserData_useCase");
      return { status: false, message: `Error in saveUserData_useCase` };
    }
  };
  return { executeFunction };
};
