import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CustomerListComponent } from './components/customer-list/customer-list.component';

const routes: Route[] = [
  {
    path: '',
    component: CustomerListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
