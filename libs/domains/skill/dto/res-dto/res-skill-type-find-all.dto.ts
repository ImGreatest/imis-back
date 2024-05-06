export interface IResSkillTypeFindAllDto {
  id: number;
  name: string;
  skills: {
    id: number;
    name: string;
  }[];
}
