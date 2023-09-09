import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { OAuthService } from '@carclean/core/oauth/oauth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'car-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.scss'],
  imports: [MatToolbarModule, MatIconModule, MatButtonModule],
})
export class ToolbarComponent {
  constructor(private oAuthService: OAuthService, private router: Router) {}

  handleSignOut(): void {
    this.oAuthService.logout();
    this.router.navigateByUrl('/entrar');
  }
}
