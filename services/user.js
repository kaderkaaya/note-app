const UserDataAccess = require('../data/user');
const ERRORS = require('../utils/errors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const minPasswordLen = 8;
const TokenDataAccess = require('../data/token');
const jwt = require('jsonwebtoken');
const { EMAIL_ERROR } = require('../utils/constant');
class UserService {
  static async signUp({ email, password }) {
    console.log('email:', email);
    console.log('password:', password);
    const existingUser = await UserDataAccess.getUser({ email });
    if (existingUser) {
      throw new Error(ERRORS.EXISTING_USER)
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return await UserDataAccess.signUp({ email, hashedPassword });
  };
  static async login({ email, password }) {
    const now = Math.floor(Date.now() / 1000);
    const user = await UserDataAccess.getUser({ email });
    if (user) {
      const userToken = await TokenDataAccess.getUserToken({ userId: user._id });
      if (userToken) {
        const payload = jwt.decode(userToken.token);
        if (userToken && payload.exp < now) {
          const token = await TokenDataAccess.verifyToken({ token: userToken.token });
          return {
            ...user._doc,
            token
          };
        }
      }
      else {
        const { token } = await TokenDataAccess.generateToken({ userId: user._id });
        return {
          ...user._doc,
          token
        };
      }
      if (user && password) {
        let isMatch;
        const hashedPassword = await UserDataAccess.getUserpass({ userId: user._id });
        isMatch = await bcrypt.compare(password, hashedPassword.password);
        if (isMatch === false) {
          throw new Error('Sifreniz Yanlis')
        }
      }
    }
    else {
      throw new Error('Kullanici Bulunamadı')
    }
    await UserDataAccess.IsLogged({ userId: user._id });
    return { user }
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