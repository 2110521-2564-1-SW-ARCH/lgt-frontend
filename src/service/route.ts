import { axiosTokenStore, axiosStore } from "./axiosStore"

interface IGetRouteApi {
    srcLocation: string
    destLocation: string
}

interface IAddRouteApi {
    source: string
    destination: string
    time: number
    type: string
    additional_type: string
}

export const getRouteApi = async (body: IGetRouteApi) => {
    return await axiosTokenStore
        .post(
            '/api/routes/search-route',
            body
        )
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            throw Error(`[getRouteApi API] error: ${error}`)
        })
}

export const addRouteApi = async (body: IAddRouteApi) => {
    return await axiosTokenStore
        .post(
            '/api/routes/save-route',
            body
        )
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            throw Error(`[addRouteApi API] error: ${error}`)
        })
}

export const deleteRouteApi = async (id: number) => {
    return await axiosTokenStore
        .delete(`/api/routes/${id}`)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            throw Error(`[deleteRouteApi API] error: ${error}`)
        })
}