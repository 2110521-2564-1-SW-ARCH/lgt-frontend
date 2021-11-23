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
    const [loading, setLoading] = useState<boolean>(true);
    let location = useLocation();
    let { locationList, planName } = location.state;

    const renderMyroute = () => {
        return (
            <div className="route-container">
                <h1>{`All Locations in ${planName}`}</h1>
                <PlanDetail locationList={locationList} />
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
        setTimeout(() => setLoading(false), 1000);
    }, []);

    return (
        <div className="plan-container">
            <div className="home-container">
                <div>
                    {renderResult()}
                </div>
            </div>
        </div>
    );
};
export default Plan;
