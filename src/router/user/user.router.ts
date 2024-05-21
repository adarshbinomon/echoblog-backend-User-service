import express, { request } from "express";
import { userController } from "../../libs/controller/";
import {
  uploadProfilePicture,
  uploadCoverPicture,
} from "../../helper/s3Multer";
import { verifyUser } from "../../utils/jwt/verify.user";
import { Dependencies } from "../../utils/interfaces/dependency.interface";
import { verifyAdmin } from "../../utils/jwt/verify.admin";
// import { verifyUser } from "@adarshbinomon/verify-user";
export default (dependencies: Dependencies) => {
  const router = express();

  const {
    saveUserDataController,
    getUserController,
    editUserProfileController,
    findAllUsersController,
    savePostController,
    followUserController,
    findAllUsersAdminController,
    getCommunityMembersController,
    searchUserController,
    getMonthlyUserCountController,
    createCheckoutSessionController,
    changePremiumStatusController,
  } = userController(dependencies);

  router.post("/user-details", saveUserDataController);
  router.get("/user-profile/:id", verifyUser, getUserController);
  router.put("/edit-profile", verifyUser, editUserProfileController);
  router.post(
    "/upload-profile-picture",
    uploadProfilePicture,
    editUserProfileController
  );
  router.post(
    "/upload-cover-picture",

    uploadCoverPicture,
    editUserProfileController
  );
  router.get("/find-users/:userId", verifyUser, findAllUsersController);
  router.put("/save-post", verifyUser, savePostController);
  router.post("/follow-user", verifyUser, followUserController);
  router.get(
    "/get-community-members/:communityId",
    verifyUser,
    getCommunityMembersController
  );
  router.get("/search-user/:regex", searchUserController);
  router.post("/create-checkout-session", createCheckoutSessionController);
  router.get("/premium-success", verifyUser, changePremiumStatusController);

  //admin routes

  router.get("/find-all-users", verifyAdmin, findAllUsersAdminController);
  router.get("/user-chart-data", verifyAdmin, getMonthlyUserCountController);
  router.get("/sample", (req, res) => {
    res.send({ hi: "hello" });
  });

  return router;
};
