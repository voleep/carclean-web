import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'car-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.scss'],
  imports: [MatToolbarModule, MatIconModule, MatButtonModule],
})
export class ToolbarComponent {}
