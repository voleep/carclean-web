import { transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { slideTo } from '@carclean/shared/animations/slide-to.animation';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('LoginForm => ForgotPassword', slideTo('right')),
      transition('ForgotPassword => LoginForm', slideTo('left')),
      transition('ForgotPassword => RecoveryCode', slideTo('right')),
      transition('RecoveryCode => ForgotPassword', slideTo('left')),
      transition('RecoveryCode => LoginForm', slideTo('left')),
      transition('RecoveryCode => ResetPassword', slideTo('right')),
      transition('ResetPassword => LoginForm', slideTo('left')),
      transition('ResetPassword => AllDone', slideTo('right')),
    ]),
  ],
})
export class LoginComponent {
  constructor(private contexts: ChildrenOutletContexts) {}

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }
}
