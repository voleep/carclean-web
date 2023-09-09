import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { OAuthService } from './oauth.service';
import { AppConfig } from '@carclean/app-config';
import { OAuthModel } from './models/oauth.model';

@Injectable()
export class AppGuardService {
  constructor(private oAuthService: OAuthService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (AppConfig.OAUTH_DATA) {
      return true;
    }

    const oAuthData: OAuthModel | null = this.oAuthService.getOAuthData();

    if (!oAuthData) {
      this.oAuthService.logout();
      this.router
        .navigateByUrl('/app')
        .then(() => this.router.navigateByUrl('/entrar'));
      return false;
    }

    AppConfig.OAUTH_DATA = oAuthData;

    return true;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.canActivate();
  }
}
