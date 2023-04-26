import { print, OutputType } from '../helpers/print.js';
export default class Exception extends Error {
    static WRONG_DB_USERNAME_PASSWORD = 'Wrong database username and password';
    static WRONG_SERVER_NAME = 'Wrong server name/connection string';
    static CANNOT_CONNECT_MONGODB = 'Cannot connect to MongoDB';
    static ERROR_EXIST = 'User already exists';
    static ERROR_EXIST_ROOM = 'Room does not exist';
    static ERROR_EXIST_ROOM_ID = 'Room Id does not exist';
    static CANNOT_REGISTER_USER = 'Cannot register user';
    static CANNOT_ROOM = 'Cannot get id Room';
    static CANNOT_UPDATE_ROOM = 'Cannot update room';
    static CANNOT_PRICE = 'Cannot room Price';
    static CANNOT_NOT_ID = 'Cannot not Id';
    static WRONG_USERNAME_PASSWORD = 'Wrong username and password';
    static TOKEN_NOT_CORRECT = 'Token is not correct';
    static WRONG_TOKEN = 'Wrong token';

    constructor(message, validationError = {}) {
        super(message);
        print(message, OutputType.ERROR);
        this.validationError = validationError;
    }
}
