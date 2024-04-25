export interface IReqCreaterProject {
  id: number;
  name: string;
}

export interface IReqProjectSkills {
  id: number;
  name: string;
  level: number;
}

export interface IReqProjectUsers {
  id: number;
  name: string;
  role: string;
}

export interface IReqUsersWithFavorite {
  id: number;
  name: string;
}

export interface IReqGetProject {
  id: number;
  name: string;
  description?: string;
  status?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  creater: IReqCreaterProject;
  createrId: number;
  projectSkills: IReqProjectSkills[];
  users: IReqProjectUsers[];
  usersWithFavor: IReqUsersWithFavorite[];
}
