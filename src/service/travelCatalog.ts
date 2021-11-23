import { axiosTokenStore } from "./axiosStore"

export const getAllPlanApi = async () => {
    return await axiosTokenStore
        .get('/api/travel-catalog/get-plan')
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            throw Error(`[getAllPlanApi API] error: ${error}`)
        })
}

export const getUserPlanApi = async (id: number) => {
    return await axiosTokenStore
        .get(`/api/travel-catalog/get-user-plan/${id}`)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            throw Error(`[getUserPlanApi API] error: ${error}`)
        })
}

export const savePlanApi = async (body: any) => {
    return await axiosTokenStore
        .post('/api/travel-catalog/save-plan', body)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            throw Error(`[getUserPlanApi API] error: ${error}`)
        })
}