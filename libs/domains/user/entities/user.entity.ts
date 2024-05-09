export class User {
  id: number;
  email: string;
  name: string;
  surname: string;
  roleId: number;
  pass: string;
  course?: number;
  direction?: number;
  groupId?: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  description?: string;
}
