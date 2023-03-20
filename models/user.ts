class UserInfo {
    _id: string;
    username: string;
    password: string;
    phone: string;
    email: string;
    userRole: number;
    loginCode: number;
    registerCode: number;
    constructor(args?: any) {
        if (!args) {
            args = {};
        }
        this._id = args._id ?? undefined;
        this.username = args.username ?? "";
        this.password = args.password ?? "";
        this.phone = args.phone ?? "";
        this.email = args.email ?? "";
        this.userRole = args.userRole ?? 1;
        this.loginCode = args.loginCode ?? -1;
        this.registerCode = args.registerCode ?? -1;
    }
}
export { UserInfo }