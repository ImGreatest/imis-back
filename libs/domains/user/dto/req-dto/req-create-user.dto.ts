export interface IReqCreateUser {
  email: string;
  name: string;
  surname: string;
  roleId: number;
  pass: string;
  course?: number;
  direction?: number;
  group?: number;
}
