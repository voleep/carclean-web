import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-done',
  templateUrl: 'all-done.component.html',
  styleUrls: ['all-done.component.scss'],
})
export class AllDoneComponent {
  constructor(private router: Router) {}

  @HostListener('document:keydown.enter')
  handleFinish(): void {
    this.router.navigateByUrl('/app');
  }
}
