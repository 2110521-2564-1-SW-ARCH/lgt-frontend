import { ILocationDetail } from "./location";

export interface IPlanDetail {
  name: string;
  description?: string;
  plan: ILocationDetail[];
  userName: string;
}
