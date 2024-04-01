export interface ICreateUser {
  email: string;
  name: string;
  surname: string;
  roleId: number;
  pass: string;
  course?: number;
  directionId?: number;
  groupId?: number;
}
