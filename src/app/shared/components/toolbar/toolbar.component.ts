import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { OAuthService } from '@carclean/core/oauth/oauth.service';

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
