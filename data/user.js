const UserModel = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class UserDataAccess {
  static async signUp({ email, hashedPassword }) {
    const user = await UserModel.create({ email, password: hashedPassword });
    return { user };
  };

  static async getUser({ email }) {
    const user = await UserModel.findOne({ email });
    return user;
  };

  static async getUserById({ userId }) {
    return await UserModel.findById({
      _id: userId
    });
  };

  static async IsLogged({ userId }) {
    return await UserModel.findByIdAndUpdate(
      { _id: userId },
      {
        isLoggedIn: true,
        userStatus: 1
      })
  };

  static async updateUser({ email, name, password, userId }) {
    const updateData = {};
    if (name) {
      updateData.name = name
    }
    if (email) {
      updateData.email = email
    }
    if (password) {
      const hashedPass = await this.hashPassword({ userId, password });
      updateData.hashedPass = hashedPass;
    }

    return await UserModel.findByIdAndUpdate({ _id: userId }, updateData)
  };

  static async hashPassword({ password }) {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  };

  static async logOut({ userId }) {
    const user = await UserModel.findByIdAndUpdate(
      { _id: userId },
      { userStatus: 0 }
    );
    return { user }
  };

  static async uploadProfileImg({ imagePath, userId }) {
    const user = await UserModel.findOneAndUpdate(
      { _id: userId },
      { $set: { profileImg: imagePath } },
      { new: true }
    )
    return { user }
  };

  static async updateUserPassword({ hashedPassword, userId }) {
    const user = await UserModel.findOneAndUpdate(
      { _id: userId },
      { $set: { password: hashedPassword } },
      { new: true }
    )
    return { user }
  };
}
module.exports = UserDataAccess;