import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MessengerService } from './services/messenger/messenger.service';

@NgModule({
  imports: [CommonModule],
  exports: [CommonModule],
  providers: [MessengerService],
})
export class SharedModule {}
