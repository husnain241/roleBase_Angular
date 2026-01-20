import { Role } from './role.enum';

export interface User {
  id: string;
  username: string;
  email: string;
  role: Role;
  password: string;
  token?: string; // We'll use this for authentication later
}