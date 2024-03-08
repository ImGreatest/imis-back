import { UserRole } from 'libs/enums/user.enum';

export interface IsignUp {
  email: string;
  name: string;
  surname: string;
  role: UserRole;
  pass: string;
}
