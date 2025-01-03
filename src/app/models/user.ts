export interface User {
  /** Guid */
  id: string;
  email: string;
  password: string;
  jwtToken: string;
  added: Date;
}
