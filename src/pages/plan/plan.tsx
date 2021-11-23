import "./plan.scss";
import { useState, useCallback, useEffect } from "react";
import { Spin } from "antd";
import { CardBox, PlanDetail } from "../../components";
import { getUserPlanApi } from "../../service/travelCatalog";
import { IPlanDetail } from "../../helpers/interface/travelcatalog";
import {
    useLocation
} from "react-router-dom";

const Plan: React.FC = () => {
    const [myRoute, setMyRoute] = useState<IPlanDetail[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    let location = useLocation();
    const locationList = location.state.locationList;

    const renderMyroute = () => {
        return (
            <div className="route-container">
                <h1>All Locations</h1>
                <PlanDetail locationList={locationList} />
            </div>
        );
    };

    const renderResult = () => {
        console.log(location.state.locationList)
        if (loading) {
            return (
                <div className="loading-container">
                    <Spin />
                </div>
            );
        }
        return renderMyroute();
    };

    // useEffect(() => {
    //     setLoading(true);
    //     fetchMyRoute();
    // }, [fetchMyRoute]);

    return (
        <div>
            <div className="home-container">
                <div>
                    {renderResult()}
                </div>
            </div>
        </div>
    );
};
export default Plan;
