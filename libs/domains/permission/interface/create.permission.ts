export interface ICreatePermission {
  action: string;
  subject: string;
  inverted?: boolean;
  conditions?: {
    [key: string]: string;
  };
  reason?: string;
  roleId: number;
}
