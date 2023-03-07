class UserInfo {
    _id: string;
    username: string;
    password: string;
    phone: string;
    email: string;
    constructor(args?: any) {
        if (!args) {
            args = {};
        }
        this._id = args._id ?? undefined;
        this.username = args.username ?? "";
        this.password = args.password ?? "";
        this.phone = args.phone ?? "";
        this.email = args.email ?? "";
    }
}
export { UserInfo }