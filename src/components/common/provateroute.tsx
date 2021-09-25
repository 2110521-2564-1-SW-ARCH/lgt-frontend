import React from 'react'
import { Route, Redirect, RouteProps } from "react-router-dom";

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
    const user = true
    return (
        <>
        {/* <Navbar/> */}
            <Route
                {...rest}
                render={({ location }) => (
                    user ? 
                    children
                    : <Redirect to={{
                        pathname: "/login",
                        state: { from: location },
                    }}
                />
                )}
            />
        </>
    )
}

export default PrivateRoute