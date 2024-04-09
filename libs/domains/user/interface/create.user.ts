export interface ICreateUser {
  email: string;
  name: string;
  surname: string;
  roleId: number;
  pass: string;
  course?: number;
  direction?: string;
  group?: string;
}
