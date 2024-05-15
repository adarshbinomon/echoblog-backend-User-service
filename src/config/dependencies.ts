import { userRepository } from "../libs/app/repository";
import {
  saveUserData_useCase,
  editUserProfile_useCase,
  getUser_useCase,
  findAllUsers_useCase,
  savePost_useCase,
  followUser_useCase,
  findAllUsersAdmin_useCase,
  changeUserStatus_useCase,
  getCommunityMembers_useCase,
  searchUserUsecase,
  getMonthlyUserCountUseCase,chagePremiumStatusUseCase
} from "../libs/usecases";
import {
  createUserUsecase,
  joinCommunity_useCase,
} from "../libs/usecases/consumerUsecases";
import {
  ConsumeUsecase,
  Repository,
  UseCase,
} from "../utils/interfaces/dependency.interface";

const useCase: UseCase = {
  saveUserData_useCase,
  getUser_useCase,
  editUserProfile_useCase,
  findAllUsers_useCase,
  savePost_useCase,
  followUser_useCase,
  findAllUsersAdmin_useCase,
  changeUserStatus_useCase,
  getCommunityMembers_useCase,
  searchUserUsecase,
  getMonthlyUserCountUseCase,chagePremiumStatusUseCase
};

const repository: Repository = {
  userRepository,
};

const consumeUsecase: ConsumeUsecase = {
  createUserUsecase,
  joinCommunity_useCase,
};

export default {
  repository,
  useCase,
  consumeUsecase,
};
