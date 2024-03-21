export interface IUpdatePermission {
  action: string;
  subject: string;
  inverted?: boolean;
  conditions?: {
    [key: string]: string;
  };
  reason?: string;
}
