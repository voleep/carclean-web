import { Injectable } from '@angular/core';
import { OAuthModel } from './models/oauth.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class OAuthService {
  private readonly OAUTH_KEY = 'oauth';

  constructor(private router: Router) {}

  setOAuthData(oAuthModel: OAuthModel): void {
    localStorage.setItem(this.OAUTH_KEY, JSON.stringify(oAuthModel));
  }

  getOAuthData(): OAuthModel | null {
    const oAuthItem = localStorage.getItem(this.OAUTH_KEY);
    if (!oAuthItem) return null;
    return JSON.parse(oAuthItem) satisfies OAuthModel;
  }

  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('/entrar');
  }
}
