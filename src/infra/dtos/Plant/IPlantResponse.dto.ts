export interface IPlantResponse {
  orderId: string;
  userId: string;
  treeId: string;
  name: string;
  message: string;
  biome: string;
  species: string;
  image: string;
  description: string;
  value: number;
  hastags: string[];
  id: string;
  createdAt: string;
  updatedAt: string;
}

export default interface IPlantResponseDTO {
  plants: IPlantResponse[];
  totalCount: number | null;
}
