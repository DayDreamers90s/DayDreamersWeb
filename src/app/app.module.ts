import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { SwipeCardsModule } from 'ng2-swipe-cards';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import {SideMenuPage} from '../pages/side-menu/side-menu';
import { TabsPage } from '../pages/tabs/tabs';
import {FeedPage} from '../pages/feed/feed';
import {TutorialPage} from '../pages/tutorial/tutorial';
import { LoginPage } from '../pages/login/login';
import {ImagepickerPage} from '../pages/imagepicker/imagepicker'

import {GamePage} from '../pages/game/game';
import {BookmarksPage} from '../pages/bookmarks/bookmarks';
import {SettingsPage} from '../pages/settings/settings';
import {ProfilePage} from '../pages/profile/profile';
import {UserBuddiesPage} from '../pages/user-buddies/user-buddies';
import {PreviewCanvasPage} from '../pages/preview-canvas/preview-canvas';

import {CardcategoriesPage} from '../pages/admin/cardcategories/cardcategories';
import {CardlevelsPage} from '../pages/admin/cardlevels/cardlevels';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Camera} from '@ionic-native/camera';
import {SignupPage} from '../pages/signup/signup';
import {DrawcanvasComponent} from '../components/drawcanvas/drawcanvas'
import { Auth } from '../providers/auth/auth';
import {IonicStorageModule} from '@ionic/storage';

import { UserBuddiesProvider } from '../providers/user-buddies/user-buddies';
import { CardCategoriesProvider } from '../providers/admin/cardcategories';
import { CardLevelsProvider } from '../providers/admin/cardlevels';
import { CardcategoriesPageModule } from '../pages/admin/cardcategories/cardcategories.module';
import { CardlevelsPageModule } from '../pages/admin/cardlevels/cardlevels.module';
import { GamePageModule } from '../pages/game/game.module';
import { FeedPageModule } from '../pages/feed/feed.module';
@NgModule({
  declarations: [
    MyApp,
    SideMenuPage,
    TabsPage,
    // FeedPage,
    LoginPage,
    SignupPage,
    TutorialPage,
    // GamePage,
    UserBuddiesPage,
    BookmarksPage,
    SettingsPage,
    ProfilePage,
    ImagepickerPage,
    DrawcanvasComponent,
    PreviewCanvasPage,
    //CardcategoriesPage,
    //CardlevelsPage
  ],
  imports: [
    BrowserModule,
    HttpModule ,
    SwipeCardsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    GamePageModule,
    FeedPageModule,
    CardcategoriesPageModule,
    CardlevelsPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SideMenuPage,
    TabsPage,
    FeedPage,
    LoginPage,
    SignupPage,
    TutorialPage,
    GamePage,
    UserBuddiesPage,
    BookmarksPage,
    SettingsPage,
    ProfilePage,
    ImagepickerPage,
    DrawcanvasComponent,
    PreviewCanvasPage,
    CardcategoriesPage,
    CardlevelsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Auth,
    UserBuddiesProvider,
    CardCategoriesProvider,
    CardLevelsProvider
  ]
})
export class AppModule {}
