import { UserRole } from 'libs/enums/role';

export interface IsignUp {
  email: string;
  name: string;
  surname: string;
  role: UserRole;
  pass: string;
}
