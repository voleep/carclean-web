import { Component, HostListener } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-all-done',
  templateUrl: 'all-done.component.html',
  styleUrls: ['all-done.component.scss'],
  imports: [MatButton, MatIcon],
})
export default class AllDoneComponent {
  constructor(private router: Router) {}

  @HostListener('document:keydown.enter')
  handleFinish(): void {
    this.router.navigateByUrl('/app');
  }
}
