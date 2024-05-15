import { UserData } from "../../../utils/interfaces/interfaces";
import { schema } from "../database";

const { User } = schema;

export default {
  userEmailExist: async (email: string) => {
    try {
      const response = await User.findOne({ email: email });
      return response;
    } catch (error) {
      console.log("error in authentication.repository.userEmailExist", error);
    }
  },
  createUser: async (data: UserData) => {
    try {
      const userData = { ...data, createdOn: Date.now() };

      const response = await schema.User.create(userData);

      if (response) {
        return { status: true, message: "user created sucessfully", response };
      } else {
        return { status: false, message: "user creation failed" };
      }
    } catch (error) {
      console.log(
        "Error in the creating user in the auth service / repository ",
        error
      );
    }
  },

  saveData: async (data: UserData) => {
    try {
      const userData = { ...data, editedOn: Date.now() };

      const response = await User.findOneAndUpdate(
        { _id: data._id },
        { $set: userData },
        { new: true, upsert: true }
      );

      return {
        status: true,
        response,
        message: "User details saved successfully",
      };
    } catch (error) {
      return {
        status: false,
        message: "user data failed to save",
        error: error,
      };
    }
  },

  findUser: async (userId: string) => {
    try {
      const user = await User.findById(userId);
      if (user) {
        return { status: true, user: user };
      } else {
        return { status: false, message: "user not found" };
      }
    } catch (error) {
      console.log(error, "error while finding user");
    }
  },

  findAllUsersExcept: async (userId: string) => {
    try {
      const users = await User.find({ _id: { $ne: userId } });
      if (users) {
        return { status: true, users: users, message: "Users found" };
      }
    } catch (error) {
      console.log("Error in find all user repository:", error);
      return { status: false, message: "Users not found" };
    }
  },

  addPostToSave: async (userId: string, postId: string) => {
    try {
      const user = await User.findById(userId);
      if (!user) {
        return { status: false, message: "User not found" };
      }

      const response = user.savedPosts.includes(postId)
        ? await User.findByIdAndUpdate(
            userId,
            { $pull: { savedPosts: postId } },
            { new: true, useFindAndModify: false }
          )
        : await User.findByIdAndUpdate(
            userId,
            { $push: { savedPosts: postId } },
            { new: true, useFindAndModify: false }
          );

      console.log("response", response);

      if (response) {
        return {
          status: true,
          message: "Post saved successfully",
          response: response,
        };
      } else {
        return { status: false, message: "Post save failed" };
      }
    } catch (error) {
      console.log("Error in post save repository:", error);
      return { status: false, message: "Error in post save repository" };
    }
  },

  followUser: async (userId: string, userToBeFollowed: string) => {
    try {
      const addFollowingInUser = await User.findByIdAndUpdate(
        userId,
        { $push: { following: userToBeFollowed } },
        { new: true, useFindAndModify: false }
      );

      const addFollowerInFollowedUSer = await User.findByIdAndUpdate(
        userToBeFollowed,
        { $push: { followers: userId } },
        { new: true, useFindAndModify: false }
      );
      if (addFollowerInFollowedUSer && addFollowingInUser) {
        return {
          status: true,
          message: `Followed ${addFollowerInFollowedUSer.name}`,
          user: addFollowingInUser,
        };
      } else {
        return { status: false, message: "follow failed" };
      }
    } catch (error) {
      console.log("error in folloUser repository:", error);
      return { status: false, message: "follow failed" };
    }
  },
  unFollowUser: async (userId: string, userToBeFollowed: string) => {
    try {
      const removeFollowingInUser = await User.findByIdAndUpdate(
        userId,
        { $pull: { following: userToBeFollowed } },
        { new: true, useFindAndModify: false }
      );

      const removeFollowerInFollowedUSer = await User.findByIdAndUpdate(
        userToBeFollowed,
        { $pull: { followers: userId } },
        { new: true, useFindAndModify: false }
      );
      if (removeFollowingInUser && removeFollowerInFollowedUSer) {
        return {
          status: true,
          message: `Unfollowed ${removeFollowerInFollowedUSer.name}`,
          user: removeFollowingInUser,
        };
      } else {
        return { status: false, message: "unfollow failed" };
      }
    } catch (error) {
      console.log("error in followUser repository:", error);
      return { status: false, message: " unfollow failed" };
    }
  },

  findAllUsers: async () => {
    try {
      const users = await User.find();

      if (users) {
        return { status: true, message: "users found", users: users };
      } else {
        return { status: false, message: "users not found" };
      }
    } catch (error) {
      console.log("error in findAllUsers repository:", error);
      return { status: false, message: "users not found" };
    }
  },

  changeUserStatus: async (userId: string) => {
    try {
      const user = await User.findById(userId);

      if (!user) {
        console.log("User not found");
        return;
      }

      user.isActive = !user.isActive;
      await user.save();
      if (user) {
        return { status: true, message: "userstatus changed", user: user };
      } else {
        return { status: false, message: "userstatus change failed" };
      }
    } catch (error) {
      console.error("Error toggling isActive:", error);
    }
  },

  joinCommunity: async (userId: string, communityId: string) => {
    try {
      const response = await User.findByIdAndUpdate(userId, {
        $push: { community: communityId },
      });
      if (response) {
        return { status: true, message: "communityId added to user" };
      } else {
        return { status: false, message: "communityId not added to user" };
      }
    } catch (error) {
      console.log("error in join community reopsitory:", error);

      return { status: false, message: "communityId not added to user" };
    }
  },

  getCommunityMembers: async (communityId: string) => {
    try {
      const users = await User.find({ community: { $in: [communityId] } });

      if (users) {
        return { status: true, message: "users found", users: users };
      } else {
        return { status: false, message: "users not found" };
      }
    } catch (error) {
      console.log("error in find community members repository:", error);
      return { status: false, message: "users not found" };
    }
  },

  searchUser: async (regex: string) => {
    try {
      const users = await User.find({
        name: { $regex: new RegExp(`^${regex}`, "i") },
      });

      if (users) {
        return { status: true, message: "users found", users: users };
      } else {
        return { status: false, message: "users not found" };
      }
    } catch (error) {
      console.log("error in search user repository:", error);
      return { status: false, mesesage: "error in finding user" };
    }
  },

  getMonthlyUserCount: async () => {
    try {
      const usersPerMonth = await User.aggregate([
        {
          $group: {
            _id: { $month: "$createdOn" },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ]);

      const resultArray = usersPerMonth.map((item) => ({
        x: item._id,
        y: item.count,
      }));

      if (usersPerMonth) {
        return {
          status: true,
          message: "count successful",
          usersPerMonth: resultArray,
        };
      }
    } catch (error) {
      console.log("error in get monthlyPostCount repo", error);
      return { status: false, message: "count unsuccessful" };
    }
  },

  changePremiumStatus: async (userId: string) => {
    try {
      const response = await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            isPremium: true,
            premiumFrom: Date.now(),
          },
        },
        { upsert: true }
      );

      if (response) {
        return { status: true, message: "premium subscription successfull" };
      }
    } catch (error) {
      return { status: false, message: "premium subscription unsuccessfull" };
    }
  },
};
