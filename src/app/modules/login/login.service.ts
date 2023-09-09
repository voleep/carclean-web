import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '@carclean/app-config';
import { OAuthModel } from '@carclean/core/oauth/models/oauth.model';
import { RequestResponse } from '@carclean/shared/models/rest/request-response.model';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {
  private readonly endpoint = `${AppConfig.OAUTH_API_URL}/user`;

  constructor(private http: HttpClient) {}

  signIn(
    email: string,
    password: string
  ): Observable<RequestResponse<OAuthModel>> {
    return this.http.post<RequestResponse<OAuthModel>>(
      `${this.endpoint}/login`,
      {
        dsEmail: email,
        dsPassword: password,
      }
    );
  }
}
