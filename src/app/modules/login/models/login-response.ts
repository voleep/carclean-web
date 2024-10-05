export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: LoginResponse.User;
  company: LoginResponse.Company;
}

export namespace LoginResponse {
  export interface User {
    id: string;
    name: string;
    role?: string;
  }

  export interface Company {
    id: string;
    tradeName: string;
  }
}
