import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserBuddiesPage } from './user-buddies';

@NgModule({
  declarations: [
    UserBuddiesPage,
  ],
  imports: [
    IonicPageModule.forChild(UserBuddiesPage),
  ],
})
export class UserBuddiesPageModule {}
