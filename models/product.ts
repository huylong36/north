
class Product {
    _id: string;
    name: string;
    price: number;
    code: string;
    stt: number;
    description: string;
    image: string;
    imagesPreview: string[];
    category: string;
    constructor(args: Product) {
        if (!args) {
            args = { _id: '', name: '', price: 0, code: '', stt: 0, description: '', image: '', imagesPreview: [], category: '' };
        }
        this._id = args._id ?? undefined;
        this.name = args.name ?? '';
        this.price = args.price ?? 0;
        this.code = args.code ?? '';
        this.stt = args.stt ?? 0;
        this.description = args.description ?? '';
        this.image = args.image ?? '';
        this.imagesPreview = args.imagesPreview ?? [];
        this.category = args.category ?? '';


    }
}
export { Product };
