import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainNavComponent } from './components/main-nav/main-nav.component';

const routes: Routes = [{ path: '', component: MainNavComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
