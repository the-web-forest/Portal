export interface ITreeResponse {
  biome: string;
  description: string;
  id: string;
  image: string;
  name: string;
  value: number;
}

export default interface ITreesResponseDTO {
  trees: ITreeResponse[];
  totalCount: number | null;
}
