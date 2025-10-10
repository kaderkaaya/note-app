require('dotenv').config();
const { default: mongoose } = require('mongoose');
const TokenModel = require('../models/token');
const JWT_KEY = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

class TokenDataAccess {
    static async generateToken({ userId }) {
        console.log('JWT_KEY', JWT_KEY)
        const token = jwt.sign({ userId }, JWT_KEY, { expiresIn: '1h' });
        await TokenModel.create({
            token,
            userId,
        });
        return { token };
    }
    static async verifyToken({ token }) {
        try {
            const decode = jwt.verify(token, JWT_KEY);
            return { valid: true, decode, token }
        } catch (error) {
            error.name === 'TokenExpiredError'
            const payload = jwt.decode(token)
            if (!payload?.userId) {
                throw new Error('Gecersiz token payloadiiii');
            }
            const newToken = await this.generateToken({ userId: payload.userId });
            return { newToken };
        }
    };
    static async getUserToken({ userId }) {
        const userObjectId = new mongoose.Types.ObjectId(userId);
        const userToken = await TokenModel.findOne(
            { userId: userObjectId }
        ).sort({ createdAt: -1 })
        return userToken;
    }
}
module.exports = TokenDataAccess;