const UserDataAccess = require('../data/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const TokenDataAccess = require('../data/token');
const jwt = require('jsonwebtoken');
const ApiError = require('../helpers/apiHelper');
const nodemailer = require('nodemailer');
const mailOptions = require('../utils/mail');
const { EMAIL_ERROR,
  PASSWORD_ERROR,
  EXISTING_USER,
  USER_ERROR,
  PASS_ERROR,
} = require('../utils/errors');
const SEND_EMAIL = process.env.SEND_EMAIL;
const JWT_SECRET = process.env.JWT_SECRET;
const SEND_PASSWORD = process.env.SEND_PASSWORD;
const {
  successfulLogin,
  failedLogins
} = require('../helpers/logginHelper');
class UserService {
  static async signUp({ email, password }) {
    let mailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,}$/;
    const existingUser = await UserDataAccess.getUser({ email });
    if (existingUser) {
      throw new ApiError(EXISTING_USER.message, EXISTING_USER.statusCode)
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
    console.log('user', user);

    if (!user) {
      throw new ApiError(USER_ERROR.message, USER_ERROR.statusCode);
      //burda logla fail
    }
    let isMatch;
    const hashedPassword = await UserDataAccess.getUserpass({ userId: user._id });
    isMatch = await bcrypt.compare(password, hashedPassword.password);
    if(email !== user.email){
      //burda logla fail
    }
    if (isMatch === false) {
      throw new ApiError(PASS_ERROR.message, PASS_ERROR.statusCode)
      //burda logla
      //fail
    }
    const userToken = await TokenDataAccess.getUserToken({ userId: user._id });
    let token;
    if (userToken) {
      token = await TokenDataAccess.verifyToken({ token: userToken.token })
    }
    else {
      token = await TokenDataAccess.generateToken({ userId: user._id });
    }
    const loggedIn = await UserDataAccess.IsLogged({ userId: user._id });
    if (loggedIn) {
      successfulLogin( email = user.email, message='basarili', ip='::1',level='info')
    }
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
  };
  static async getselfUser({ userId }) {
    return await UserDataAccess.getselfUser({ userId });
  };
  static async uploadProfileImg({ userId, imagePath }) {
    return await UserDataAccess.uploadProfileImg({ userId, imagePath });
  };
  static async forgotPassword({ email }) {
    const user = await UserDataAccess.getUser({ email });
    if (!user) {
      throw new ApiError(USER_ERROR.message, USER_ERROR.statusCode)
    }
    const secret = JWT_SECRET + user.password;
    const resetToken = jwt.sign({ id: user._id, email: user.email }, secret, { expiresIn: '1h' });
    const resetUrl = `http://localhost:3000/user/forgotPassword?id=${user._id}&resetToken=${resetToken}`;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: SEND_EMAIL,
        pass: SEND_PASSWORD,
      },
    });
    await transporter.sendMail(mailOptions(email = user.email, resetUrl));

  }
  static async resetPassword({ password, userId, token }) {
    const { user } = await UserDataAccess.getUserWithId({ ownerId: userId });
    if (!user) {
      throw new ApiError(USER_ERROR.message, USER_ERROR.statusCode)
    }
    const secret = JWT_SECRET + user.password;
    const verifyToken = jwt.verify(token, secret);
    if (verifyToken) {
      const hashedPassword = await UserDataAccess.hashedPass({ password });
      await UserDataAccess.updateUserPassword({ hashedPassword, userId });
    }
    return { user }
  }
}
module.exports = UserService;