export default interface IPlantDetailResponse {
  plantId: string;
  biome: string;
  canEdit: boolean;
  description: string;
  hastags: string[];
  image: string;
  message?: string;
  name?: string;
  orderId: string;
  species: string;
  treeId: string;
  value: number;
  createdAt: string;
  updatedAt: string;
}
