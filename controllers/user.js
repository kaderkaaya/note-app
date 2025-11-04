const UserService = require('../services/user');
const ErrorHelper = require('../helpers/errorHelper');
const UserSchema = require('../schemas/userSchema');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
class UserController {
    static async signUp(req, res, next) {
        const { email, password } = req.body;
        const user = await UserService.signUp({ email, password });
        return ErrorHelper.sendSuccess({ code: 201, data: user, res })
    };
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await UserService.login({ email, password });
            return ErrorHelper.sendSuccess({ code: 200, data: {user}, res });
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
    };
    static async getselfUser(req, res) {
        try {
            const { userId } = req.query;
            const user = await UserService.getselfUser({ userId });
            return ErrorHelper.sendSuccess({ code: 200, data: user, res });
        } catch (error) {
            res.status(500).send({ error: `${error}` })
        }
    };
    static async uploadProfileImg(req, res) {
        try {
            const uploadDir = path.join(__dirname, '../utils/uploads');
            if (!fs.existsSync(uploadDir)) {//dosya var mı bunu kontrol ederiz.Eger yoksa
                fs.mkdir(async)(uploadDir, { recursive: true });//Dosya dizini yoksa dosya olusturur.
                //mkdirSync bunu da. kullanabiliriz.
            }
            const storage = multer.diskStorage({
                destination: (req, file, cb) => {
                    cb(null, uploadDir);
                },
                filename: function (req, file, cb) {
                    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
                }
            });
            const upload = multer({
                storage: storage,
                limits: { fileSize: 1000000 }
            });
            const singleUpload = upload.single('profileImg');
            singleUpload(req, res, async (err) => {
                if (err) return res.status(400).send({ error: err.message });

                const { userId } = req.body;
                const imagePath = req.file ? `../utils/uploads/${req.file.filename}` : null;
                const user = await UserService.uploadProfileImg({ userId, imagePath });
                return ErrorHelper.sendSuccess({ code: 200, data: user, res });
            });
        } catch (error) {
            res.status(500).send({ error: `${error}` })
        }
    };
    static async forgotPassword(req, res) {
        try {
            const { email } = req.body;
            const user = await UserService.forgotPassword({ email });
            return ErrorHelper.sendSuccess({ code: 200, data: user, res });
        } catch (error) {
            res.status(500).send({ error: `${error}` })
        }
    };
    static async resetPassword(req, res) {
        try {
            const { userId, token } = req.body;
            const { password } = req.body;
            const user = await UserService.resetPassword({ password, userId, token });
            return ErrorHelper.sendSuccess({ code: 200, data: user, res });
        } catch (error) {
            res.status(500).send({ error: `${error}` })
        }
    };
    static async getUserIP(req, res) {
        try {
            const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            return ErrorHelper.sendSuccess({ code: 200, data: { ip }, res });
        } catch (error) {
            res.status(500).send({ error: `${error}` })
        }
    };
}

module.exports = UserController;