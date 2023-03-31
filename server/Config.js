class Config {
    static LOGIN_FAILED = -1;
    static LOGIN_SUCCESS = 0;
    static LOGIN_WRONG_PASSWORD = 1;
    static LOGIN_ACCOUNT_NOT_EXIST = 2;

    static REGISTER_SUCCESS = 10;
    static REGISTER_PHONE_WRONG = 11;
    static REGISTER_EMAIL_WRONG = 12;
    static STATUS_PUBLIC = 0;
    static STATUS_PRIVATE = 1;
    static STATUS_DELETE = 2;
}
module.exports = Config