import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ScraperCardComponent } from './components/scraper-card/scraper-card.component';

const routes: Routes = [{ path: '', component: ScraperCardComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
