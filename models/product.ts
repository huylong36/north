class Product {
    _id: string;
    name: string;
    price: string;
    code: string;
    stt: number;
    description: string;
    constructor(args: Product) {
        if (!args) {
            args = { _id: '', name: '', price: '', code: '', stt: 0, description: '' };;
        }
        this._id = args._id ?? undefined;
        this.name = args.name ?? '';
        this.price = args.price ?? '';
        this.code = args.code ?? '';
        this.stt = args.stt ?? 0;
        this.description = args.description ?? '';

    }
}
export { Product }