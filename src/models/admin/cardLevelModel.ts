export class CardLevelModel {
    _id: number;
    code: string;
    canHaveImages: boolean;
    canHaveCategories: boolean;

    constructor(level?: any) {
        this._id = level && level._id || undefined;
        this.code = level && level.code || '';
        this.canHaveImages = level && level.canHaveImages || false;
        this.canHaveCategories = level && level.canHaveCategories || false;
    }
}