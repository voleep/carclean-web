import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ToolbarComponent } from '@carclean/shared/toolbar/toolbar.component';
import { AppComponent } from './app.component';

@NgModule({
  imports: [AppRoutingModule, ToolbarComponent],
  declarations: [AppComponent],
})
export class AppModule {}
