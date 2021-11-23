import { Route, Redirect } from "react-router-dom";
import { getUserInfo } from '../service/auth.service'
import Navbar from './common/navbar/navbar'

const PrivateRoute = ({ component: Component, ...rest }: any) => {
    const  user = getUserInfo()

    return (
        <>
            <Navbar/>
            <div className="bg-container">
                <Route
                    {...rest}
                    render={(props) => (
                        user ?
                        <Component {...props} />
                        : <Redirect to={{
                            pathname: "/",
                            state: { from: props.location },
                        }}
                    />
                    )}
                />
            </div>
        </>
    );
};

export default PrivateRoute
