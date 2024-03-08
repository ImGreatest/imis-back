import { UserRole } from '@prisma/client';

export interface User {
  email: string;
  name: string;
  surname: string;
  role: UserRole;
}
