export interface IResUser {
  id: number;
  email: string;
  name: string;
  surname: string;
  roleId: number;
  pass: string;
  course?: number;
  direction?: number;
  group?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface IResSuccessUser {
  id: number;
  name: string;
  surname: string;
  direction: { name: string };
  group: { name: string };
}
