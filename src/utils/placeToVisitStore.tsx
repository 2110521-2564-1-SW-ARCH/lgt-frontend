import React, {ReactChild, ReactChildren} from 'react'
import {ILocationDetail} from "../helpers/interface/location";

export const PlaceToVisitContext = React.createContext<IStore | null>(null)


interface IPlaceToVisitState {
    placeToVisitSelect: ILocationDetail[] | any // bug
    setPlaceToVisitSelect: (c: ILocationDetail[]) => void
}

export interface IStore {
    placeToVisitSelect: IPlaceToVisitState
}

interface AuxProps {
    children: ReactChild | ReactChildren;
}

export default ({children}: AuxProps) => {

    const [placeToVisitSelect, setPlaceToVisitSelect] = React.useState<ILocationDetail[] >([])

    const store = {
        placeToVisitSelect: {placeToVisitSelect, setPlaceToVisitSelect},
    }

    return <PlaceToVisitContext.Provider value={store}>{children}</PlaceToVisitContext.Provider>
}