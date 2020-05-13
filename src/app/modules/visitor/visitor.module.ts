import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitorComponent } from './components/visitor/visitor.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { TeamDialogOverviewComponent } from './components/team-dialog-overview/team-dialog-overview.component';
import { YoutubeDialogComponent } from './components/youtube-dialog/youtube-dialog.component';

@NgModule({
  declarations: [VisitorComponent, TeamDialogOverviewComponent, YoutubeDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule,
    MatTableModule,
  ],
  exports: [VisitorComponent],
})
export class VisitorModule {}
