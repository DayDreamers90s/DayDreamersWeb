import { Component, ViewChild, Renderer } from '@angular/core';
import { Platform, NavParams } from 'ionic-angular';
import { Auth } from '../../providers/auth/auth';
@Component({
    selector: 'drawcanvas',
    templateUrl: 'drawcanvas.html'
})
export class DrawcanvasComponent {
    @ViewChild('myCanvas') canvas: any;
    @ViewChild('toptoolbar') toptoolbar: any;
    @ViewChild('bottomtoolbar') bottomtoolbar: any;


    multiplayer: boolean;
    currentPlayer: PlayerModel;
    players: PlayerModel[];
    submittedplayers: PlayerModel[];
    currentRound: number;
    roundComplete: boolean;
    canvasElement: any;
    bottomToolbarElement: any;
    topToolbarElement: any;
    lastX: number;
    lastY: number;

    currentColour: string = '#1abc9c';
    availableColours: any;
    brushSize: number = 10;

    constructor(public platform: Platform, public authService: Auth, public params: NavParams, public renderer: Renderer) {

        this.availableColours = [
            '#1abc9c',
            '#3498db',
            '#9b59b6',
            '#e67e22',
            '#e74c3c'
        ];

        this.currentRound = 0;
        this.players =[];
        this.createPlayersForTheGame(params.get('Players'));  
        this.startRoundForThePlayers();
        this.currentPlayer = this.getNextPlayer();
        // this.authService.getUserDetails().then((res) => {
        //     console.log(JSON.stringify(res));
        //     this.players.push(new PlayerModel(res));
           
        //   });
        
    
    }

    createPlayersForTheGame(players) {
        if (players != undefined) {
            this.multiplayer = true;
            for (let player of players) {
                this.players.push(new PlayerModel(player));
            }
        }        
    }

    startRoundForThePlayers() {
        for (let player of this.players) {
            let game = new GameModel(this.currentRound);
            player.game.push(game);
        }
        this.roundComplete = false;
    }

    getNextPlayer() {
        for (let player of this.players) {
            if (!player.game[this.currentRound].hasPlayed)
                return player;
        }
        return null;
    }

    setCurrentPlayerAsPlayed() {
        for(var i =0; i< this.players.length; i++){
            if(this.players[i]._id == this.currentPlayer._id){
                let img = this.canvasElement.toDataURL('img/jpeg', 1.0);
                //let player = this.players[i];
                this.players[i].game[this.currentRound].image= img;
                this.players[i].game[this.currentRound].hasPlayed= true;
                break;
            }
        }

    }

    ngAfterViewInit() {

        this.canvasElement = this.canvas.nativeElement;
        this.renderer.setElementAttribute(this.canvasElement, 'width', this.platform.width() + '');
        this.renderer.setElementAttribute(this.canvasElement, 'height', this.platform.height() + '');

    }

    changeColour(colour) {
        this.currentColour = colour;
    }

    changeSize(size) {
        this.brushSize = size;
    }

    handleStart(ev) {

        this.lastX = ev.touches[0].pageX;
        this.lastY = ev.touches[0].pageY;
    }

    handleMove(ev) {

        let ctx = this.canvasElement.getContext('2d');
        let currentX = ev.touches[0].pageX;
        let currentY = ev.touches[0].pageY;

        ctx.beginPath();
        ctx.lineJoin = "round";
        ctx.moveTo(this.lastX, this.lastY);
        ctx.lineTo(currentX, currentY);
        ctx.closePath();
        ctx.strokeStyle = this.currentColour;
        ctx.lineWidth = this.brushSize;
        ctx.stroke();

        this.lastX = currentX;
        this.lastY = currentY;

    }

    clearCanvas() {
        let ctx = this.canvasElement.getContext('2d');
        ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    }

    Submit(event) {
        
        // this.currentPlayer.game[this.currentRound].image = img;
        // this.currentPlayer.game[this.currentRound].hasPlayed = true;
        this.setCurrentPlayerAsPlayed();

        this.clearCanvas();

        this.currentPlayer = this.getNextPlayer();

        if (this.currentPlayer == null) {
            this.roundComplete = true;
            this.currentPlayer=null;
        } //round completed ask for next round

        console.log(JSON.stringify(this.submittedplayers));
    }

    PlayNextRound(e) {
        this.currentRound++;
        this.startRoundForThePlayers();
        this.currentPlayer = this.getNextPlayer();
        this.roundComplete = false;
    }

    GotoScoreBoard(e) {
        //this.navctrl.push(,this.players);
    }


}


export class GameModel {
    round: number;
    image: string;
    hasPlayed: boolean;
    likes: number;
    hates: number;

    constructor(roundnumber: number) {
        this.round = roundnumber;
        this.image = '';
        this.hasPlayed = false;
        this.likes = 0;
        this.hates = 0;
    }

}



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
        }
        this.game = [];
    }
}
