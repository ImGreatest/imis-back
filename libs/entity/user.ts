import { UserRole } from 'libs/enums/role';
export class User {
  id: number;
  email: string;
  name: string;
  surname: string;
  role: UserRole;
  pass: string;
  course?: number;
  direction?: string;
  group?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
