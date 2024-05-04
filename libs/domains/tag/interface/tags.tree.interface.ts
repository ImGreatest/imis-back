interface ITag {
  id: number;
  name: string;
  description: string;
}
interface ITreeTagElement extends ITag {
  childTags: ITreeTagElement[];
  ratingScope: number;
}
export interface ITreeTag {
  ratingName: string;
  hourlyUpdate: number;
  scoringType: string;
  tag: ITreeTagElement[];
  default: boolean;
}
