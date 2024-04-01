export class User {
  id: number;
  email: string;
  name: string;
  surname: string;
  roleId: number;
  pass: string;
  course?: number;
  direction?: string;
  group?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
