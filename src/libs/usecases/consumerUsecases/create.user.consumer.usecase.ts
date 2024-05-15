import { Dependencies } from "../../../utils/interfaces/dependency.interface";
import { UserData } from "../../../utils/interfaces/interfaces";

export const createUserUsecase = (dependencies: Dependencies) => {
  const {
    repository: { userRepository },
  } = dependencies;
  const executeFunction = async (data: UserData) => {
    const response = await userRepository.createUser(data);
    console.log("user created in user service", response);

    if (!response.status) {
      return { message: "Email invalid", status: false };
    } else {
      return { message: "User created", status: true };
    }
  };

  return { executeFunction };
};
