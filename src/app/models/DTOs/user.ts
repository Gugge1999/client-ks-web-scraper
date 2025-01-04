export interface UserFormDto {
  username: string;
  email?: string;
  password: string;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface ResetPasswordDto {
  email: string;
}
