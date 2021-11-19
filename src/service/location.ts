import { axiosStore, axiosTokenStore } from "./axiosStore";

interface IAddLocationApi {
    name: string
    description?: string
    type: string
    address: string
    district: string
    subDistrict: string
    postCode: string
    province: string
    lattitude?: string
    longitude?: string
    imgURL?: string
    closestStation?: number
}

export const getLocationAllApi = async () => {
    return await axiosStore
        .get('/location/all')
        .then((response) => (
            response.data
        ))
        .catch((error) => {
            throw Error(`[getLocationAllApi API] error: ${error}`)
        })
}

export const getLocationIdApi = async (id: number) => {
    return await axiosStore
        .get(`/location/${id}`)
        .then((response) => (
            response.data
        ))
        .catch((error) => {
            throw Error(`[getLocationIdApi API] error: ${error}`)
        })
}

export const deleteLocationApi = async (id: number) => {
    return await axiosStore
        .delete(`/location/${id}`)
        .then((response) => (
            response.data
        ))
        .catch((error) => {
            throw Error(`[deleteLocationApi API] error: ${error}`)
        })
}

export const getLocationKeywordApi = async (
    keyword: string)
    : Promise<IAddLocationApi> => {
    return await axiosStore
        .get(`/location/search/${keyword}`)
        .then((response) => (
            response.data
        ))
        .catch((error) => {
            throw Error(`[getLocationKeywordApi API] error: ${error}`)
        })
}

export const addLocationApi = async () => {

}