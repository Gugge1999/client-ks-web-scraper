import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiStatusDialogComponent } from './components/api-status-dialog/api-status-dialog.component';
import { DeleteWatchDialogComponent } from './components/delete-watch-dialog/delete-watch-dialog.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { NewWatchDialogComponent } from './components/new-watch-dialog/new-watch-dialog.component';
import { ScraperCardComponent } from './components/scraper-card/scraper-card.component';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './components/layout/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    ScraperCardComponent,
    NewWatchDialogComponent,
    DeleteWatchDialogComponent,
    ApiStatusDialogComponent,
    FooterComponent,
    HeaderComponent,
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
