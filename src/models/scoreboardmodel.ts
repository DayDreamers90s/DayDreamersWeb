

export class ScoreBoardModel {
    round: number;
    roundImages: RoundImageModel[];    
    constructor(){
        this.roundImages=[];
    }
}

export class RoundImageModel{
    playername: string;
    buddies: string[];
    image: string;
    likeEvent: any;
    destroyEvent:any
    constructor(){
        this.buddies =[];
    }
}