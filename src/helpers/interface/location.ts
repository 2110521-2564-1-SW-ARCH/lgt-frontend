import { IRoute } from "./route";

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
  latitude?: string;
  longitude?: string;
  imgURL?: string;
  closestStation?: number;
}


export interface ILocationRouteDetail {
  id: number;
  name: string;
  description?: string;
  type: string;
  address: string;
  district: string;
  subDistrict: string;
  postCode: string;
  province: string;
  latitude?: string;
  longitude?: string;
  imgURL?: string;
  closestStation?: number;
  route: IRoute[]
}
