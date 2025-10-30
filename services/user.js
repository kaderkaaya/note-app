const UserDataAccess = require('../data/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const TokenDataAccess = require('../data/token');
const jwt = require('jsonwebtoken');
const ApiError = require('../helpers/apiHelper')
const { EMAIL_ERROR,
  PASSWORD_ERROR,
  EXISTING_USER,
  USER_ERROR,
} = require('../utils/errors');
class UserService {
  static async signUp({ email, password }) {
    let mailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,}$/;
    const existingUser = await UserDataAccess.getUser({ email });
    if (existingUser) {
      throw new ApiError(EXISTING_USER.message, EXISTING_USER, statusCode)
    }
    //RegEx kullanarak Email Kontrolu yapildi.
    const validateEmail = email.match(mailRegex);
    const validatePassword = passwordRegex.test(password);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    if (validateEmail && validatePassword) {
      return await UserDataAccess.signUp({ email, hashedPassword });
    } else {
      if (!validateEmail) {
        throw new ApiError(EMAIL_ERROR.message, EMAIL_ERROR.statusCode);
      }
      if (!validatePassword) {
        throw new ApiError(PASSWORD_ERROR.message, PASSWORD_ERROR.statusCode);
      }
    }
  };
  static async login({ email, password }) {
    const user = await UserDataAccess.getUser({ email });
    if (!user) {
      throw new ApiError(USER_ERROR.message, USER_ERROR.statusCode)
    }
    let isMatch;
    const hashedPassword = await UserDataAccess.getUserpass({ userId: user._id });
    isMatch = await bcrypt.compare(password, hashedPassword.password);
    if (isMatch === false) {
      throw new ApiError(PASS_ERROR.message, PASS_ERROR.statusCode)
    }
    const userToken = await TokenDataAccess.getUserToken({ userId: user._id });
    let token ;
    if (userToken) {
       token = await TokenDataAccess.verifyToken({ token: userToken.token })
    }
    else {
        token  = await TokenDataAccess.generateToken({ userId: user._id });
    }
    await UserDataAccess.IsLogged({ userId: user._id });
    return {
      ...user._doc,
      token
    };
  }
  static async updateUser({ email, password, name, userId }) {
    const updatedUser = await UserDataAccess.updateUser({ email, name, password, userId });
    return { updatedUser };
  };
  static async logOut({ userId }) {
    return await UserDataAccess.logOut({ userId });
  }
  static async getselfUser({ userId }) {
    return await UserDataAccess.getselfUser({ userId });
  }
}
module.exports = UserService;