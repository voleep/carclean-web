import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ToolbarComponent } from '@carclean/shared/components/toolbar/toolbar.component';
import { AppComponent } from './app.component';
import { CarCleanMenuComponent } from '@carclean/shared/components/carclean-menu/carclean-menu.component';

@NgModule({
  imports: [AppRoutingModule, ToolbarComponent, CarCleanMenuComponent],
  declarations: [AppComponent],
})
export class AppModule {}
