export interface ILocationDetail {
  id: number;
  name: string;
  description?: string;
  type: string;
  address: string;
  district: string;
  subDistrict: string;
  postCode: string;
  province: string;
  lattitude?: string;
  longitude?: string;
  imgURL?: string;
  closestStation?: number;
}
