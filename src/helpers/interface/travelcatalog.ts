import { ILocationDetail } from "./location";

export interface IPlanDetail {
  _id: string;
  name: string;
  description?: string;
  locations: ILocationDetail[];
  userName: string;
}
