import { Injectable } from '@angular/core';
import { OAuthService } from './oauth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class LoginGuardService {
  constructor(private oAuthService: OAuthService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.oAuthService.getOAuthData()) {
      this.router.navigateByUrl('/app');
      return false;
    }

    return true;
  }
}
