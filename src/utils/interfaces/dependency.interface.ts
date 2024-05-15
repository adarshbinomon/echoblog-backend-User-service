export interface Dependencies {
  repository: Repository;
  useCase: UseCase;
  consumeUsecase: ConsumeUsecase;
}

export interface ConsumeUsecase {
  createUserUsecase: Function;
  joinCommunity_useCase: Function;
}

export interface Repository {
  userRepository: UserRepository;
}

export interface UserRepository {
  userEmailExist: Function;
  createUser: Function;
  saveData: Function;
  findUser: Function;
  findAllUsersExcept: Function;
  addPostToSave: Function;
  followUser: Function;
  unFollowUser: Function;
  findAllUsers: Function;
  changeUserStatus: Function;
  joinCommunity: Function;
  getCommunityMembers: Function;
  searchUser: Function;
  getMonthlyUserCount: Function;
  changePremiumStatus: Function;
}

export interface UseCase {
  saveUserData_useCase: Function;
  getUser_useCase: Function;
  editUserProfile_useCase: Function;
  findAllUsers_useCase: Function;
  savePost_useCase: Function;
  followUser_useCase: Function;
  findAllUsersAdmin_useCase: Function;
  changeUserStatus_useCase: Function;
  getCommunityMembers_useCase: Function;
  searchUserUsecase: Function;
  getMonthlyUserCountUseCase: Function;
  chagePremiumStatusUseCase: Function;
}
