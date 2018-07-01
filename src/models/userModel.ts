export class UserModel {

    user: string;
    firstname: string;
    lastname: string;
    phonenumber: string;


    constructor(res: any){
        this.user = res._id;
    }

}