import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '@carclean/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from './components/login.component';
import { LoginFormComponent } from './components/login-form/login-form-component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoginService } from './login.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BloggerStoriesComponent } from '@carclean/shared/components/blogger-stories/blogger-stories.component';

@NgModule({
  imports: [
    LoginRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    BloggerStoriesComponent,
  ],
  declarations: [LoginComponent, LoginFormComponent],
  providers: [LoginService],
})
export class LoginModule {}
