import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PlayerModel } from '../../models/playermodel';
import { GameModel } from '../../models/gamemodel';
import { ScoreBoardModel, RoundImageModel } from '../../models/scoreboardmodel';

@IonicPage()
@Component({
  selector: 'page-preview-canvas',
  templateUrl: 'preview-canvas.html',
})
export class PreviewCanvasPage {

  scoreboardmodels: ScoreBoardModel[];

  constructor(public navCtrl: NavController, public params: NavParams) {
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
        returnlist[g].roundImages.push(roundimage);
      }
    }

    return returnlist;
  }

}
