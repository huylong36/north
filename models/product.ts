class Product {
    _id: string;
    name: string;
    price: number;
    code: number;
    stt: number;
    description: string;
    images: string[]
    constructor(args: Product) {
        if (!args) {
            args = { _id: '', name: '', price: 0, code: 0, stt: 0, description: '', images: [] };;
        }
        this._id = args._id ?? undefined;
        this.name = args.name ?? '';
        this.price = args.price ?? 0;
        this.code = args.code ?? 0;
        this.stt = args.stt ?? 0;
        this.description = args.description ?? '';
        this.images = args.images ?? [];

    }
}
export { Product }