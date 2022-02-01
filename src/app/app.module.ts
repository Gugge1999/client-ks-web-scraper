import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { ScraperCardComponent } from './components/scraper-card/scraper-card.component';
import { NewWatchDialogComponent } from './components/new-watch-dialog/new-watch-dialog.component';
import { DeleteWatchDialogComponent } from './components/delete-watch-dialog/delete-watch-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    ScraperCardComponent,
    NewWatchDialogComponent,
    DeleteWatchDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
