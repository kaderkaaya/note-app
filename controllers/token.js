const { sendSuccess, sendError } = require('../helpers/errorHelper');
const TokenService = require('../services/token');
class TokenController {
  static async generateToken(req, res, next) {
    try {
      const { userId } = req.body;
      const token = await TokenService.generateToken({ userId });
      return sendSuccess({ res, data: token, code: 201 });
    } catch (error) {
      return sendError({ error, res });
    }
  };
  static async verifyAndRefreshToken(req, res, next) {
    try {
      const { token } = req.body;
      const { newToken } = await TokenService.verifyAndRefreshToken({ token });
      return sendSuccess({ res, data: newToken, code: 200 });
    } catch (error) {
      return sendError({ error, res });
    }
  };
}
module.exports = TokenController;
