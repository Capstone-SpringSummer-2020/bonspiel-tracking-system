import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { YouTubePlayer, YouTubePlayerModule } from '@angular/youtube-player';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';

import { VisitorComponent } from './components/visitor/visitor.component';
import { TeamDialogOverviewComponent } from './components/team-dialog-overview/team-dialog-overview.component';
import { YoutubeDialogComponent } from './components/youtube-dialog/youtube-dialog.component';
import { DesktopViewComponent } from './components/desktop-view/desktop-view.component';

@NgModule({
  declarations: [
    VisitorComponent,
    TeamDialogOverviewComponent,
    YoutubeDialogComponent,
    DesktopViewComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule,
    MatTableModule,
    YouTubePlayerModule,
    MatCardModule,
    MatTooltipModule,
    MatTabsModule,
    MatSortModule,
  ],
  exports: [VisitorComponent, YoutubeDialogComponent],
})
export class VisitorModule {}
