
import { Dependencies } from "../../../utils/interfaces/dependency.interface";
import { UserData } from "../../../utils/interfaces/interfaces";

export const changeUserStatusController = async (
  dependencies: Dependencies,
  data: UserData
) => {
  const {
    useCase: { changeUserStatus_useCase },
  } = dependencies;
  const { _id } = data;
  const response = await changeUserStatus_useCase(dependencies).executeFunction(
    _id
  );
};
