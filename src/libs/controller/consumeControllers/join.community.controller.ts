import { Dependencies } from "../../../utils/interfaces/dependency.interface";
import { communityKafka } from "../../../utils/interfaces/interfaces";

export const joinCommunityController = async (
  dependencies: Dependencies,
  data: communityKafka
) => {
  const {
    consumeUsecase: { joinCommunity_useCase },
  } = dependencies;
  const response = await joinCommunity_useCase(dependencies).executeFunction(
    data?.userId,
    data?.communityId
  );
};
