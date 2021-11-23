import "./home.scss";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Button, Col, Row, Spin } from "antd";

import { CardBox, CardImage, CardVerticalBox, SearchComponent, TravelTimeline } from "../../components";
import { getRouteApi } from "../../service/route";
import { getLocationKeywordApi } from "../../service/location";
import { IRoute } from "../../helpers/interface/route";
import { ILocationDetail } from "../../helpers/interface/location";
import { IPlanDetail } from "../../helpers/interface/travelcatalog";
import PlaceToVisitProvider, { PlaceToVisitContext } from "../../utils/placeToVisitStore";
import { useHistory } from "react-router-dom";


const Home: React.FC = () => {
  const history = useHistory()
  const [mode, setMode] = useState<string>("recommend");
  const [paramSearch, setParamSearch] = useState<string[]>([]);
  const [resultRoute, setResultRoute] = useState<IRoute | null>(null);
  const [resultLocation, setResultLocation] = useState<ILocationDetail[] | null>(null);
  const [recommendPlan, setRecommendPlan] = useState<IPlanDetail[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [generate, setGenerate] = useState<ILocationDetail[]>([])

  const [disableGenerate, setDisableGenerate] = useState<boolean>(true)

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
        _id: "012345",
        userName: "pim",
        name: "plan1",
        description: "desc-plan1",
        locations: [
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
        _id: "rekogwokbork",
        userName: "pim3",
        name: "plan1",
        description: "desc-plan1",
        locations: [
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


  const RenderTravelSearch = () => {
    const store = useContext(PlaceToVisitContext)
    const handleClick = () => {
      setGenerate(store?.placeToVisitSelect.placeToVisitSelect)
      history.push(
        '/plan/generated',
        { detail: store?.placeToVisitSelect.placeToVisitSelect },
      )
    }

    return (
      <div className="route-container">
        <Row>
          <Col flex={3}>
            <h1>{`Place to visit in ${paramSearch}`}</h1>
            <Row gutter={[4, 16]}>
              {resultLocation?.map((each) => {
                return <CardVerticalBox locationDetail={each} key={each.name} />
              })}
            </Row>
          </Col>
          <Col flex={2}>
            <h1>Your travel list</h1>
            {store?.placeToVisitSelect.placeToVisitSelect.map((each: ILocationDetail) => {
              return <CardImage locationDetail={each} key={each.name} />
            })}
            <Button
              type="primary"
              size="large"
              disabled={store?.placeToVisitSelect.placeToVisitSelect.length === 0}
              onClick={() => {
                handleClick()
              }}>
              Generate
            </Button>
          </Col>

        </Row>

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
    if (mode === "recommend") {
      return renderRecommend();
    }
    if (mode === "travel" && paramSearch) {
      return <RenderTravelSearch />;
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
    <div>
      <PlaceToVisitProvider>
        <div className="home-container">
          <div className="bg-container">
            <SearchComponent
              searchFunction={(type: "travel" | "transport", params: any) =>
                handleSearch(type, params)
              }
            />
            {renderResult()}
          </div>
        </div>
      </PlaceToVisitProvider>
    </div>
  );
};
export default Home;