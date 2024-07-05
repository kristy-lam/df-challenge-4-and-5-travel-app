import User from "../models/User.model.js";

export default class UserService {
  // User registration
  async registerUser(userInput) {
    let newUser;
    try {
      if (await User.findOne({ email: userInput.email }))
        throw new Error("Email has already been registered.");
      newUser = new User(userInput);
    } catch (e) {
      throw new Error(e.message || "Invalid user.");
    }
    return await newUser.save();
  }

  // Simple user authentication
  async authenticateUser(userInput) {
    try {
      const authenticatedUser = await User.findOne({
        email: userInput.email,
        password: userInput.password,
      });
      if (!authenticatedUser) {
        throw new Error("User authentication failed.");
      }
      return authenticatedUser;
    } catch (e) {
      throw new Error("User authentication failed.");
    }
  }

  // Update password
  async updatePassword(userInput) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { email: userInput.email },
        { password: userInput.password },
        { new: true }
      );
      if (!updatedUser) throw new Error("User was not found.");
      return updatedUser;
    } catch (e) {
      throw new Error("Password update failed.");
    }
  }

  // Get all favs
  async getAllFavs(userInput) {
    try {
      const authenticatedUser = await User.findOne({
        email: userInput.email,
        password: userInput.password,
      });
      if (!authenticatedUser) {
        throw new Error("User authentication failed.");
      } else {
        return authenticatedUser.favs || [];
      }
    } catch (e) {
      throw new Error(e.message || "Could not get favourites.");
    }
  }

  // Add a favourite
  async addFav(userInput) {
    try {
      const updateResult = await User.findOneAndUpdate(
        {
          email: userInput.email,
          password: userInput.password,
          "favs.city": { $ne: userInput.city },
        },
        {
          $push: { favs: { city: userInput.city } },
        },
        {
          new: true,
        }
      );

      if (!updateResult) {
        throw new Error(
          "User authentication failed or favourite already exists."
        );
      } else if (!userInput.city) {
        throw new Error("Invalid favourite.");
      }
    } catch (e) {
      throw new Error(e.message || "Could not add favourite.");
    }
  }

  // Delete a favourite
  async deleteFav(userInput) {
    try {
      const updateResult = await User.findOneAndUpdate(
        {
          email: userInput.email,
          password: userInput.password,
          "favs.city": userInput.city,
        },
        {
          $pull: { favs: { city: userInput.city } },
        },
        {
          new: true,
        }
      );

      if (!updateResult) {
        throw new Error("User authentication failed or favorite not found.");
      } else if (!userInput.city) {
        throw new Error("Invalid favourite.");
      }
    } catch (e) {
      throw new Error(e.message || "Could not delete favourite.");
    }
  }
}
