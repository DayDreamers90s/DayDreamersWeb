import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CardcategoriesPage } from './cardcategories';

@NgModule({
  declarations: [
    CardcategoriesPage,
  ],
  imports: [
    IonicPageModule.forChild(CardcategoriesPage),
  ],
})
export class CardcategoriesPageModule {}
