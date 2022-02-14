import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeleteWatchDialogComponent } from './components/delete-watch-dialog/delete-watch-dialog.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { NewWatchDialogComponent } from './components/new-watch-dialog/new-watch-dialog.component';
import { ScraperCardComponent } from './components/scraper-card/scraper-card.component';
import { MaterialModule } from './material.module';

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
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
