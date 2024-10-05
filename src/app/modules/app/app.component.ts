import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarCleanMenuComponent } from '@carclean/shared/components/carclean-menu/carclean-menu.component';
import { ToolbarComponent } from '@carclean/shared/components/toolbar/toolbar.component';

@Component({
  standalone: true,
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [CarCleanMenuComponent, ToolbarComponent, RouterOutlet],
})
export default class AppComponent {}
