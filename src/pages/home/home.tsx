import "./home.scss";
import { useState, useCallback, useEffect } from "react";
import { Spin } from "antd";

import { CardBox, SearchComponent, TravelTimeline } from "../../components";
import { getRouteApi } from "../../service/route";
import { getLocationKeywordApi } from "../../service/location";
import { getAllPlanApi } from "../../service/travelCatalog";
import { IRoute } from "../../helpers/interface/route";
import { ILocationDetail } from "../../helpers/interface/location";
import { IPlanDetail } from "../../helpers/interface/travelcatalog";

const Home: React.FC = () => {
  const [mode, setMode] = useState<string>("recommend");
  const [paramSearch, setParamSearch] = useState<string[]>([]);
  const [resultRoute, setResultRoute] = useState<IRoute | null>(null);
  const [resultLocation, setResultLocation] = useState<ILocationDetail[] | null>(null);
  const [recommendPlan, setRecommendPlan] = useState<IPlanDetail[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = (type: "travel" | "transport", params: any) => {
    setLoading(true);
    setMode(type);
    if (type === "travel") {
      setParamSearch(params.travel);
      fetchLocation(params.travel);
    }
    if (type === "transport" && params.source && params.destination) {
      console.log("search", type);
      fetchRoute([params.source, params.destination]);
      setParamSearch([params.source, params.destination]);
    }
  };

  const fetchRecommendRoute = useCallback(async () => {
    // const res = await getAllPlanApi();
    // console.log(res);
    // setRecommendPlan(res)
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
    setRecommendPlan(mock);
    setLoading(false);
  }, []);

  const fetchLocation = async (param: string) => {
    const res = await getLocationKeywordApi(param);
    setResultLocation(res);
    setLoading(false);
  };

  const fetchRoute = async (param: string[]) => {
    if (param.length === 2) {
      const res = await getRouteApi({
        srcLocation: param[0],
        destLocation: param[1],
      });
      setResultRoute(res);
      setLoading(false);
    }
  };

  const renderRecommend = () => {
    return (
      <div className="route-container">
        <h1>Recommended Routes</h1>
        {recommendPlan?.map((each: IPlanDetail, index: Number) => (
          <CardBox key={`recommend-${index}`} planDetail={each} />
        ))}
      </div>
    );
  };

  const renderTravelSearch = () => {
    console.log(resultLocation);
    return (
      <div className="route-container">
        <h1>{`Place to visit in ${paramSearch}`}</h1>
        {resultLocation?.map((each) => console.log(each))}
      </div>
    )
  }

  console.log(paramSearch)

  const renderResult = () => {
    if (loading) {
      return (
        <div className="loading-container">
          <Spin />
        </div>
      )
    } 
    if (mode === "recommend") {
      return renderRecommend();
    }
    if (mode === "travel" && paramSearch) {
      return renderTravelSearch();
    }
    if (mode === "transport" && paramSearch.length === 2 && paramSearch[0] && paramSearch[1]) {
      return (
        <TravelTimeline routeResult={resultRoute} paramSearch={paramSearch} />
      );
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchRecommendRoute();
  }, [fetchRecommendRoute]);

  return (
    <div className="home-container">
        <SearchComponent
        searchFunction={(type: "travel" | "transport", params: any) =>
            handleSearch(type, params)
        }
        />
        {renderResult()}
    </div>
  );
};
export default Home;
