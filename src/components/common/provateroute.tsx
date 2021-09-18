import React from 'react'
import { Route, Redirect, RouteProps } from "react-router-dom";

interface PrivateRouteProps extends RouteProps {
    component: any;
}

const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
    const user = true
    return (
        <>
        {/* <Navbar/> */}
            <Route
                {...rest}
                render={(props) => (
                    user ? 
                    <Component {...props} />
                    : <Redirect to={{
                        pathname: "/login",
                        state: { from: props.location },
                    }}
                />
                )}
            />
        </>
    )
}

export default PrivateRoute