import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, HostListener, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { NavigationRailComponent } from '../navigation-rail/navigation-rail.component';
import { Menu } from './menu.type';

@Component({
  standalone: true,
  selector: 'car-menu',
  templateUrl: 'carclean-menu.component.html',
  styleUrls: ['carclean-menu.component.scss'],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    NavigationRailComponent,
    RouterModule,
  ],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translate3d(-100%, 0px, 0px)' }),
        animate('0.3s ease', style({ transform: 'translate3d(0%, 0px, 0px)' })),
      ]),
      transition(':leave', [
        style({ transform: 'translate3d(0%, 0px, 0px)' }),
        animate(
          '0.3s ease',
          style({ transform: 'translate3d(-100%, 0px, 0px)' })
        ),
      ]),
    ]),
  ],
})
export class CarCleanMenuComponent {
  readonly homeMenu: Menu = {
    title: 'Início',
    path: '/app',
  };

  readonly menuSchema: Menu[] = [
    {
      title: 'Cadastro',
      path: '/app/cadastro',
      icon: 'library_add',
      childrem: [
        {
          title: 'Clientes',
          path: '/app/cadastro/clientes',
        },
        {
          title: 'Colaboradores',
          path: '/app/cadastro/colaboradores',
        },
      ],
    },
    {
      title: 'Financeiro',
      path: '/app/financeiro',
      icon: 'monetization_on',
      childrem: [
        {
          title: 'Recebimentos',
          path: '/app/financeiro/recebimentos',
        },
      ],
    },
  ];

  menuNavDrawer = signal<Menu | null>(null);
  showNavDrawer = computed(() => Boolean(this.menuNavDrawer()));

  private isMouseOverRail = signal(false);

  constructor(private router: Router) {}

  handleMouseOverRail(menu: Menu): void {
    this.isMouseOverRail.set(true);
    setTimeout(() => {
      if (!this.isMouseOverRail()) return;
      const shouldSetMenu = Boolean(menu.childrem?.length);
      this.menuNavDrawer.set(shouldSetMenu ? menu : null);
    }, 700);
  }

  handleMouseLeaveRail(): void {
    this.isMouseOverRail.set(false);
  }

  @HostListener('mouseleave')
  handleMouseLeave(): void {
    this.menuNavDrawer.set(null);
  }

  handleNavigate(menu: Menu): void {
    if (!menu.path) return;
    this.menuNavDrawer.set(null);
    this.router.navigateByUrl(menu.path);
  }
}
