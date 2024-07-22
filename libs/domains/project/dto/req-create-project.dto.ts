export interface IReqProjectSkills {
  skillId: number;
  level: number;
}

export interface IReqUsers {
  userId: number;
  role: string;
}

export interface IReqCreateProjectDto {
  name: string;
  description?: string;
  status?: string;
  projectSkills?: IReqProjectSkills[];
  users?: IReqUsers[];
}
