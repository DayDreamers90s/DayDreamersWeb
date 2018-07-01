import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PreviewCanvasPage } from './preview-canvas';

@NgModule({
  declarations: [
    PreviewCanvasPage,
  ],
  imports: [
    IonicPageModule.forChild(PreviewCanvasPage),
  ],
})
export class PreviewCanvasPageModule {}
