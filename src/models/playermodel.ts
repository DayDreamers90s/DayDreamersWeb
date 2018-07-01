import { GameModel } from './gamemodel';

export class PlayerModel {
    _id: string;
    username: string;
    isHost: boolean;
    game: GameModel[];


    constructor(response: any) {
        this._id = response._id;
        if (response.name != undefined) {
            this.username = response.name;
            this.isHost = false;
        }
        else if (response.firstname != undefined) {
            this.username = response.firstname;
            this.isHost = true;
        }else if(response.username !=undefined){
            this.username = response.username;
        }
        this.game = response.game == null || response.game ==undefined  ? [] : response.game;
        if (response.isHost != undefined)
            this.isHost = response.isHost;
    }
}
