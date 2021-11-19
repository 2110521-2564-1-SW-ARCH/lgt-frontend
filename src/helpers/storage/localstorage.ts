export const LocalStorageService = (function () {
    enum localStorageEnum {
        accessToken = "access_token"
    }

    const getLocalStorage = (key: localStorageEnum) => {
        return localStorage.getItem(key)
    }

    const setLocalStorage = (key: localStorageEnum, value: string) => {
        localStorage.setItem(key, value)
    }

    const removeLocalStorage = (key: localStorageEnum) => {
        localStorage.removeItem(key)
    }

    return {
        localStorageEnum,
        getLocalStorage,
        setLocalStorage,
        removeLocalStorage,
    }
})()
