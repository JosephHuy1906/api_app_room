import Exception from '../exceptions/Exception.js';
import { Usermodel } from '../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const getDetail = async (id) => {
    const detail = await Usermodel.findById(id);
    return detail ?? {};
};

const login = async ({ username, password }) => {
    const isUser = await Usermodel.findOne({ username }).exec();
    if (isUser) {
        const isPass = await bcrypt.compare(password, isUser.password);
        if (!!isPass) {
            let token = jwt.sign(
                {
                    data: isUser,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '7 days',
                },
            );
            return {
                ...isUser.toObject(),
                password: 'not show',
                token: token,
            };
        } else {
            throw new Exception(Exception.WRONG_USERNAME_PASSWORD);
        }
    } else {
        throw new Exception(Exception.WRONG_USERNAME_PASSWORD);
    }
};

const register = async ({ username, fullName, password, nameBank, numberBank }) => {
    try {
        const existingUser = await Usermodel.findOne({ username }).exec();
        if (!!existingUser) {
            throw new Exception(Exception.ERROR_EXIST);
        }

        const hashPass = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
        const newUser = await Usermodel.create({
            username: username,
            fullName: fullName,
            nameBank: nameBank,
            numberBank: numberBank,
            password: hashPass,
        });
        return newUser;
    } catch (err) {
        throw new Exception(Exception.CANNOT_REGISTER_USER);
    }
};
const partToken = async (token) => {
    try {
        let kq = jwt.verify(token, process.env.JWT_SECRET);
        if (!kq) {
            throw new Exception(Exception.TOKEN_NOT_CORRECT);
        } else {
            return kq;
        }
    } catch (err) {
        throw new Exception(Exception.WRONG_TOKEN);
    }
};
const updateUser = async ({ username, fullName, nameBank, numberBank }) => {
    try {
        const existingUser = await Usermodel.findOne({ username }).exec();
        if (!existingUser) {
            throw new Exception(Exception.ERROR_EXIST);
        } else {
            const newUser = await Usermodel.create({
                fullName: fullName,
                nameBank: nameBank,
                numberBank: numberBank,
            });
            return newUser;
        }
    } catch (err) {
        throw new Exception(Exception.CANNOT_REGISTER_USER);
    }
};

export default {
    register,
    login,
    getDetail,
    updateUser,
    partToken,
};
