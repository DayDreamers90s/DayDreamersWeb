import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CardlevelsPage } from './cardlevels';

@NgModule({
  declarations: [
    CardlevelsPage,
  ],
  imports: [
    IonicPageModule.forChild(CardlevelsPage),
  ],
})
export class CardlevelsPageModule {}
