import "./myroutes.scss";
import { useState, useCallback, useEffect } from "react";
import { Spin } from "antd";
import { CardBox } from "../../components";
import { getUserPlanApi } from "../../service/travelCatalog";
import { IPlanDetail } from "../../helpers/interface/travelcatalog";

const MyRoutes: React.FC = () => {
    const [myRoute, setMyRoute] = useState<IPlanDetail[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchMyRoute = useCallback(async () => {
        let username: any = localStorage.getItem("username");
        const res = await getUserPlanApi(username);
        setMyRoute(res)
        setLoading(false);
    }, []);

    const renderMyroute = () => {
        return (
            <div className="route-container">
                <h1>My Routes</h1>
                {myRoute?.map((each: IPlanDetail, index: Number) => (
                    <CardBox key={`myroutes-${index}`} planDetail={each} />
                ))}
            </div>
        );
    };

    const renderResult = () => {
        if (loading) {
            return (
                <div className="loading-container">
                    <Spin />
                </div>
            );
        }
        return renderMyroute();
    };

    useEffect(() => {
        setLoading(true);
        fetchMyRoute();
    }, [fetchMyRoute]);

    return (
        <div className="my-routes-container">
            <div className="home-container">
                <div>
                    {renderResult()}
                </div>
            </div>
        </div>
    );
};
export default MyRoutes;
