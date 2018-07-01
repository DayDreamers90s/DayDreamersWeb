export class GameModel {
    round: number;
    image: string;
    hasPlayed: boolean;
    likes: number;
    hates: number;
    isScored: boolean;

    constructor(roundnumber: number) {
        this.round = roundnumber;
        this.image = '';
        this.hasPlayed = false;
        this.likes = 0;
        this.hates = 0;
        this.isScored = true;
    }

}