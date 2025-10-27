const UserService = require('../services/user');
const ErrorHelper = require('../helpers/errorHelper');
const UserSchema = require('../schemas/userSchema');
const { validateSchemaBody } = require('../helpers/schemaHelper');

class UserController {
    static async signUp(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await UserService.signUp({ email, password });
            return ErrorHelper.sendSuccess({ code: 201, data: user, res })
        } catch (error) {    
            return ErrorHelper.sendError({ res, error, code: 502 });
        }

    };
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await UserService.login({ email, password });
            return ErrorHelper.sendSuccess({ code: 200, data: user, res });
        } catch (error) {
            res.status(500).send({ error: `error:${error}` })
        }
    };
    static async updateUser(req, res) {
        try {
            const { email, password, name, userId } = req.body;
            const updatedUser = await UserService.updateUser({ email, password, name, userId });
            return ErrorHelper.sendSuccess({ code: 200, data: updatedUser, res });
        } catch (error) {
            res.status(500).send({ error: `${error}` })
        }
    }
    static async logOut(req, res) {
        try {
            const { userId } = req.body;
            const user = await UserService.logOut({ userId });
            return ErrorHelper.sendSuccess({ code: 200, data: user, res });
        } catch (error) {
            res.status(500).send({ error: `${error}` })
        }
    }
    static async getselfUser(req, res) {
        try {
            const { userId } = req.query;
            const user = await UserService.getselfUser({ userId });
            return ErrorHelper.sendSuccess({ code: 200, data: user, res });
        } catch (error) {
            res.status(500).send({ error: `${error}` })
        }
    }
}

module.exports = UserController;