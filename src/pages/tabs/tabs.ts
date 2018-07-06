import { Component } from '@angular/core';
import {FeedPage} from '../feed/feed';
import {GamePage} from '../game/game';
import {BookmarksPage} from '../bookmarks/bookmarks';
import {SettingsPage} from '../settings/settings';
import {ProfilePage} from '../profile/profile';
import { NavParams } from 'ionic-angular';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  homepage = FeedPage;
  gamespage = GamePage;
  bookmarkspage = BookmarksPage;
  settingspage = SettingsPage;
  profilepage = ProfilePage;
  myIndex: number;
  constructor(navParams: NavParams) {
    this.myIndex = navParams.data.tabIndex || 0;
  }
}
