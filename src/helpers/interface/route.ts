export interface IRoute {
    time: number
    route: IRouteDetail[]
}

export interface IRouteDetail {
    id: number
    source: string
    destination: string
    time: number
    type: string
    additional_type: string
    updated_at: string
}