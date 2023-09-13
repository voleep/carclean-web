export interface RecoveryPasswordRequestModel {
  email: string;
  newPassword: string;
  passwordRecoveryCode: number;
}
