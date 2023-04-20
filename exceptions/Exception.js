import { print, OutputType } from '../helpers/print.js';
export default class Exception extends Error {
    static WRONG_DB_USERNAME_PASSWORD = 'Wrong database username and password';
    static WRONG_SERVER_NAME = 'Wrong server name/connection string';
    static CANNOT_CONNECT_MONGODB = 'Cannot connect to MongoDB';
    static ERROR_EXIST = 'User already exists';
    static CANNOT_REGISTER_USER = 'Cannot register user';
    static WRONG_USERNAME_PASSWORD = 'Wrong username and password'

    constructor(message) {
        super(message);
        print(message, OutputType.ERROR);
    }
}
