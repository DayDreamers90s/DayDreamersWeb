import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Auth } from '../../../providers/auth/auth';
import { CardLevelsProvider } from '../../../providers/admin/cardlevels';
import { CardLevelModel } from '../../../models/admin/cardLevelModel';

@IonicPage()
@Component({
  selector: 'page-cardlevels',
  templateUrl: 'cardlevels.html',
})
export class CardlevelsPage {
  private level: FormGroup;
  private editLevel: CardLevelModel;
  private levels: CardLevelModel[];

  constructor(private formBuilder: FormBuilder, public auth: Auth, public cardLevelsProvider: CardLevelsProvider) {
    this.level = this.formBuilder.group({
      code: ['', Validators.required],
      canHaveImages: [false],
      canHaveCategories: [false]
    });
    this.levels = [];
    this.editLevel =new CardLevelModel();
    this.getExistingLevels();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardLevelsPage');
  }

  addLevel() {
    console.log(this.level.value);
    if (this.auth.checkAuthentication()) {
      this.cardLevelsProvider.addCardLevel(this.level.value).then((res) => {
        this.levels.push(new CardLevelModel(res));
        this.level.reset();
      });
    }
  }

  getExistingLevels() {
    this.levels = [];
    if (this.auth.checkAuthentication()) {
      this.cardLevelsProvider.getCardLevels().then((res) => {
        for (var key in res) {
          if (res.hasOwnProperty(key)) {
            this.levels.push(new CardLevelModel(res[key]));
          }
        }
      });

    }
  }


  EditLevel(level: CardLevelModel) {
    this.editLevel = level;
  }

  updateLevel(){
    if (this.editLevel != undefined && this.editLevel._id != undefined) {
      this.cardLevelsProvider.updateCardLevel(this.editLevel).then((res)=>{
        this.getExistingLevels();
        this.editLevel = new CardLevelModel();
      });
    }
  }

  CancelUpdate(){
    this.editLevel = new CardLevelModel();
    this.getExistingLevels();
  }

  DeleteLevel(level: CardLevelModel) {
    if (level != undefined && level._id != undefined) {
      this.cardLevelsProvider.deleteCardLevel(level._id).then((res) => {
        this.getExistingLevels();
      });
    }
  }

}
