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
        let tempUserId: any = localStorage.getItem("userId");
        let userId: Number = JSON.parse(tempUserId);
        // const res = await getUserPlanApi(userId);
        // console.log(res);
        // setMyRoute(res)
        const mock: IPlanDetail[] = [
            {
                userName: "pim",
                name: "plan1",
                description: "desc-plan1",
                plan: [
                    {
                        id: 1,
                        name: "Lido",
                        description: "test",
                        type: "test",
                        address: "test",
                        district: "test",
                        subDistrict: "test",
                        postCode: "test",
                        province: "test",
                        latitude: "1",
                        longitude: "1",
                        imgURL: "test",
                        closestStation: 1,
                    },
                    {
                        id: 2,
                        name: "Faculty of Political Science",
                        description: "test",
                        type: "test",
                        address: "test",
                        district: "test",
                        subDistrict: "test",
                        postCode: "test",
                        province: "test",
                        latitude: "1",
                        longitude: "1",
                        imgURL: "test",
                        closestStation: 1,
                    },
                ],
            },
            {
                userName: "pim3",
                name: "plan1",
                description: "desc-plan1",
                plan: [
                    {
                        id: 1,
                        name: "Lido",
                        description: "test",
                        type: "test",
                        address: "test",
                        district: "test",
                        subDistrict: "test",
                        postCode: "test",
                        province: "test",
                        latitude: "1",
                        longitude: "1",
                        imgURL: "test",
                        closestStation: 1,
                    },
                    {
                        id: 2,
                        name: "Faculty of Political Science",
                        description: "test",
                        type: "test",
                        address: "test",
                        district: "test",
                        subDistrict: "test",
                        postCode: "test",
                        province: "test",
                        latitude: "1",
                        longitude: "1",
                        imgURL: "test",
                        closestStation: 1,
                    },
                ],
            },
        ];
        console.log(userId)
        setMyRoute(mock);
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
        <div>
            <div className="home-container">
                <div>
                    {renderResult()}
                </div>
            </div>
        </div>
    );
};
export default MyRoutes;
