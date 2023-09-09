import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Route[] = [
  {
    path: '',
    component: AppComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
