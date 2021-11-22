import axios from "axios"
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

export const getSourceRouteApi = async () => {
    return await axiosStore
        .get('/api/routes/source')
        .then((response) => (
            response.data
        ))
        .catch((error) => {
            throw Error(`[getSourceRouteApi API] error: ${error}`)
        })
}

export const getDestinationRouteApi = async () => {
    return await axiosStore
        .get('/api/routes/destination')
        .then((response) => (
            response.data
        ))
        .catch((error) => {
            throw Error(`[getDestinationRouteApi API] error: ${error}`)
        })
}

export const getAllOptionRouteApi = async () => {
    return await axios
        .all([
            axiosStore.get('/api/routes/source'),
            axiosStore.get('/api/routes/destination'),
        ])
        .then((response) => {
            return [response[0].data, response[1].data]
        })
        .catch((error) => {
            throw Error(`[getAllOptionRouteApi API] error: ${error}`)
        })
}