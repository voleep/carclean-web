import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';

export const canActivateLogin: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  // const router = inject(Router);
  // const authService = inject(OAuthService);

  // if (authService.getOAuthData()) {
  //   router.navigateByUrl('/app');
  //   return false;
  // }

  return true;
};
