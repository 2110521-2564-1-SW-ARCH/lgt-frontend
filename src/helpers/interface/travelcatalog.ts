import { ILocationDetail } from "./location";

export interface IPlanDetail {
  name: string;
  description?: string;
  plan: ILocationDetail[];
  userName: string;
}

export interface ISavePlan {
  userName: string
  planName: string
  locations: number[]
  description: string
  isPublic: boolean
}