class Category {
    _id: string;
    name: string;
    status: number;
    constructor(args: Category) {
        if (!args) {
            args = { _id: '', name: '', status: 0 };
        }
        this._id = args._id ?? '';
        this.name = args.name ?? '';
        this.status = args.status ?? 0;

    }
}
export { Category };
