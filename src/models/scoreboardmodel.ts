

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

    constructor(){
        this.buddies =[];
    }
}