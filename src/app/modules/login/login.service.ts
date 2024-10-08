import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '@carclean/app-config';
import { OAuthModel } from '@carclean/core/oauth/models/oauth.model';
import { RequestResponse } from '@carclean/shared/models/rest/request-response.model';
import { Observable } from 'rxjs';
import { LoginRequest } from './models/login-request';
import { LoginResponse } from './models/login-response';
import { RecoveryPasswordRequestModel } from './models/recovery-password-request.model';
import { VerifyRecoveryCodeRequestModel } from './models/verify-recovery-code-request.model';

@Injectable()
export class LoginService {
  private readonly endpoint = `${AppConfig.OAUTH_API_URL}`;

  constructor(private http: HttpClient) {}

  signIn(request: LoginRequest): Observable<RequestResponse<LoginResponse>> {
    return this.http.post<RequestResponse<LoginResponse>>(
      `${this.endpoint}/login`,
      request
    );
  }

  resetPassword(email: string): Observable<RequestResponse<void>> {
    return this.http.post<RequestResponse<void>>(
      `${this.endpoint}/recovery-password`,
      email
    );
  }

  resetNewPassword(
    request: RecoveryPasswordRequestModel
  ): Observable<RequestResponse<OAuthModel>> {
    return this.http.put<RequestResponse<OAuthModel>>(
      `${this.endpoint}/recovery-password`,
      request
    );
  }

  verifyRecoveryCode(
    request: VerifyRecoveryCodeRequestModel
  ): Observable<RequestResponse<boolean>> {
    return this.http.post<RequestResponse<boolean>>(
      `${this.endpoint}/recovery-password/verify-code`,
      request
    );
  }
}
