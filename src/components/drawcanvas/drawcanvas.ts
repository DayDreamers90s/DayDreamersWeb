import { Component, ViewChild, Renderer } from '@angular/core';
import { Platform, NavParams, NavController } from 'ionic-angular';
import { Auth } from '../../providers/auth/auth';
import 'fabric';
import { PreviewCanvasPage } from '../../pages/preview-canvas/preview-canvas';
import { PlayerModel } from '../../models/playermodel';
import { GameModel } from '../../models/gamemodel';

// declare let fabric: any;

@Component({
    selector: 'drawcanvas',
    templateUrl: 'drawcanvas.html'
})
export class DrawcanvasComponent {
    @ViewChild('myCanvas') canvas: any;
    @ViewChild('toptoolbar') toptoolbar: any;
    @ViewChild('bottomtoolbar') bottomtoolbar: any;

    // private canvs;
    // private boundBox;
    // private shape;


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

    constructor(public platform: Platform, public authService: Auth, public navCtrl: NavController, public params: NavParams, public renderer: Renderer) {

        this.availableColours = [
            '#1abc9c',
            '#3498db',
            '#9b59b6',
            '#e67e22',
            '#e74c3c'
        ];

        this.currentRound = 0;
        this.players = [];
        this.authService.getUserDetails().then((res) => {
            console.log(JSON.stringify(res));
            this.players.push(new PlayerModel(res));
            this.createPlayersForTheGame(params.get('Players'));
            this.startRoundForThePlayers();
            this.currentPlayer = this.getNextPlayer();

        });


    }

    // ionViewDidLoad() {
    //     this.canvs = new fabric.Canvas('cs', {
    //         isDrawingMode: true
    //       });

    //     this.boundBox = new fabric.Rect({
    //         width: 200,
    //         height: 200,
    //         fill: 'transparent',
    //         stroke: '#666',
    //         strokeDashArray: [5, 5]
    //     });

    //     this.shape = new fabric.Rect({
    //         width: 50,
    //         height: 50,
    //         left: 10,
    //         top: 10,
    //         fill: 'red'
    //     });

    //     this.canvs.add(this.boundBox);
    //     this.canvs.add(this.shape);
    //     this.canvs.centerObject(this.boundBox);

    // }

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
        for (var i = 0; i < this.players.length; i++) {
            if (this.players[i]._id == this.currentPlayer._id) {
                let img = this.canvasElement.toDataURL('img/jpeg', 1.0);
                this.players[i].game[this.currentRound].image = img;
                this.players[i].game[this.currentRound].hasPlayed = true;
                break;
            }
        }

    }

    addCanvasBackground(){
        let ctx = this.canvasElement.getContext('2d');

        var background = new Image();
        background.src = "assets/imgs/canvasbkg.jpg";
        
        // Make sure the image is loaded first otherwise nothing will draw.
        background.onload = function(){
            ctx.drawImage(background,0,0);   
        }
    }

    ngAfterViewInit() {

        this.canvasElement = this.canvas.nativeElement;
        this.renderer.setElementAttribute(this.canvasElement, 'width', this.platform.width() + '');
        this.renderer.setElementAttribute(this.canvasElement, 'height', this.platform.height() + '');
        // let ctx = this.canvasElement.getContext('2d');

        this.addCanvasBackground();

        // ctx.globalCompositeOperation = "destination-over";

        // // set background color
        // ctx.fillStyle = '#fff'; // <- background color

        // // draw background / rect on entire canvas
        // ctx.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height);
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
        this.addCanvasBackground();
    }

    Submit(event) {
        this.setCurrentPlayerAsPlayed();

        this.clearCanvas();

        this.currentPlayer = this.getNextPlayer();

        if (this.currentPlayer == null) {
            this.roundComplete = true;
            this.currentPlayer = null;
        } //round completed ask for next round
    }

    PlayNextRound(e) {
        this.currentRound++;
        this.startRoundForThePlayers();
        this.currentPlayer = this.getNextPlayer();
        this.roundComplete = false;
        console.log(JSON.stringify(this.players));
    }

    GotoScoreBoard(e) {
        this.navCtrl.push(PreviewCanvasPage, { 'Players': this.players });
    }


}






