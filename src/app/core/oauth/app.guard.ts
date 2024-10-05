import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { AppConfig } from '@carclean/app-config';

export const canActivateApp: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  if (AppConfig.OAUTH_DATA) {
    return true;
  }

  // const router = inject(Router);
  // const authService = inject(OAuthService);
  // const oAuthData: OAuthModel | null = authService.getOAuthData();

  // if (!oAuthData) {
  //   authService.logout();
  //   router.navigateByUrl('/app').then(() => router.navigateByUrl('/entrar'));
  //   return false;
  // }

  // AppConfig.OAUTH_DATA = oAuthData;

  return true;
};
