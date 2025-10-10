const TokenDataAccess = require('../data/token');
const jwt = require('jsonwebtoken');
class TokenService {
  static async generateToken({ userId }) {
    return await TokenDataAccess.generateToken({ userId });
  }
  static async verifyAndRefreshToken({ token }) {
    return await TokenDataAccess.verifyToken({ token });
  }
}
module.exports = TokenService;