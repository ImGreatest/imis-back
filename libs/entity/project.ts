export class Project {
  id: number;
  name: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  status: string;
  description: string;
  techStack: string; // Добавить это свойство
  creatorId: number;
}