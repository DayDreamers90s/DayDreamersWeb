import { Component,EventEmitter  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PlayerModel } from '../../models/playermodel';
import { ScoreBoardModel, RoundImageModel } from '../../models/scoreboardmodel';

@IonicPage()
@Component({
  selector: 'page-preview-canvas',
  templateUrl: 'preview-canvas.html',
})
export class PreviewCanvasPage {
  ready = true;
  cardDirection = "xy";
  cardOverlay: any = { 
      like: {
          backgroundColor: '#28e93b',
          img: 'url(assets/imgs/rolsroyse.jpg)'
      },
      dislike: {
          backgroundColor: '#e92828',
          img: 'url(assets/imgs/rolsroyse.jpg)'
      }
  };

  scoreboardmodels: ScoreBoardModel[];
  imagesonly : RoundImageModel[];

  constructor(public navCtrl: NavController, public params: NavParams) {
    this.imagesonly = [];
    this.CreatePlayersForScoreboard(params.get('Players'));
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PreviewCanvasPage');
  }

  CreatePlayersForScoreboard(paramplayers) {
    if (paramplayers != undefined) {
      this.scoreboardmodels = this.CreateScoreBoardModels(paramplayers);
    }
  }

  CreateScoreBoardModels(players: PlayerModel[]) {
    var returnlist = [];
    var rounds = players[0].game.length;
    for (var i = 0; i < rounds; i++) {
      let model = new ScoreBoardModel();
      returnlist.push(model);
    }

    for (var p in players) {
      for (var g in players[p].game) {
        returnlist[g].round = parseInt(g) +1;
        var roundimage = new RoundImageModel();
        roundimage.playername = players[p].username;
        for (var k in players) {
          if (k != p)
            roundimage.buddies.push(players[k].username);
        }
        roundimage.image = players[p].game[g].image;
        roundimage.likeEvent= new EventEmitter(),
        roundimage.destroyEvent= new EventEmitter(),
        returnlist[g].roundImages.push(roundimage);
        this.imagesonly.push(roundimage);
      }
    }

    return returnlist;
  }

  onCardInteract(event) {
    console.log(event);
  }

  LikeImage(event, image:RoundImageModel){
    if (event.target.localName === 'ion-icon') {
      event.target.className = event.target.className.replace('icon-md-primary', 'icon-md-danger');
      event.target.className = event.target.className.replace('icon-ios-primary', 'icon-ios-danger');
    } else if (event.target.parentElement.localName === 'ion-icon') {
      event.target.parentElement.className = event.target.parentElement.className.replace('icon-md-primary', 'icon-md-danger');
      event.target.parentElement.className = event.target.parentElement.className.replace('icon-ios-primary', 'icon-ios-danger');
    }
  }

}
