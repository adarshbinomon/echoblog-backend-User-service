import save_userData_controller from "./save.userdetails.controller";
import get_user_controller from "./get.user.controller";
import edit_userProfile_controller from "./edit.user.profile.controller";
import find_all_users_controller from "./find.all.user.controller";
import save_post_controller from "./save.post.controller";
import follow_user_controller from "./follow.user.controller";
import find_all_users_admin_controller from "./find.all.user.admin.controller";
import get_community_members_controller from "./get.community.members.controller";
import searchUserController from "./search.user.controller";
import { Dependencies } from "../../../utils/interfaces/dependency.interface";
import getMonthlyUserCountController from "./get.monthly.user.count.controller";
import createCheckoutSessionController from "./create.checkout.session";
import changePremiumStatusController from "./change.premium.status.controller";

export default (dependencies: Dependencies) => {
  return {
    saveUserDataController: save_userData_controller(dependencies),
    getUserController: get_user_controller(dependencies),
    editUserProfileController: edit_userProfile_controller(dependencies),
    findAllUsersController: find_all_users_controller(dependencies),
    savePostController: save_post_controller(dependencies),
    followUserController: follow_user_controller(dependencies),
    findAllUsersAdminController: find_all_users_admin_controller(dependencies),
    getCommunityMembersController:
      get_community_members_controller(dependencies),
    searchUserController: searchUserController(dependencies),
    getMonthlyUserCountController: getMonthlyUserCountController(dependencies),
    createCheckoutSessionController:
      createCheckoutSessionController(dependencies),
    changePremiumStatusController: changePremiumStatusController(dependencies),
  };
};
