export class CardCategoryModel {
    _id: number;
    name: string;
    description: string;

    constructor(category?: any) {
        this._id = category && category._id || undefined;
        this.name =  category && category.name || '';
        this.description =  category && category.description|| '';
    }
}