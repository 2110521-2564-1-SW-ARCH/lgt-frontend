import { CardBox, SearchComponent, TravelTimeline } from "../../components";
import Navbar from "../../components/common/navbar/navbar";
import "./home.scss";
import { useState, useCallback, useEffect } from "react";
import { getRouteApi } from "../../service/route";
import { getLocationKeywordApi } from "../../service/location";
import { IRoute } from "../../helpers/interface/route";
import { ILocationDetail } from "../../helpers/interface/location";
import { Spin } from "antd";

const Home: React.FC = () => {
  const [mode, setMode] = useState<string>("travel");
  const [paramSearch, setParamSearch] = useState<string[]>([]);
  const [resultRoute, setResultRoute] = useState<IRoute | null>(null);
  const [resultLocation, setResultLocation] = useState<
    ILocationDetail[] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = (type: "travel" | "transport", params: any) => {
    setLoading(true);
    setMode(type);
    if (type === "travel") {
      setParamSearch(params.travel);
      fetchLocation(params.travel);
    }
    if (type === "transport") {
      console.log("search", type);
      fetchRoute([params.source, params.destination]);
      setParamSearch([params.source, params.destination]);
    }
  };

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

  const renderTravel = () => {
    return (
      <div className="route-container">
        <h1>Recommended Routes</h1>
        {/* {resultLocation?.map((each) => {
          console.log(each);
        })} */}
        {/* <CardBox />
        <CardBox />
        <CardBox />
        <CardBox /> */}
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
    );
  };

  const renderResult = () => {
    if (loading) {
      return (
        <div className="loading-container">
          <Spin />
        </div>
      );
    } else if (mode === "travel" && !paramSearch) {
      return renderTravel();
    } else if (mode === "travel" && paramSearch) {
      return renderTravelSearch();
    } else if (mode === "transport" && paramSearch.length === 2) {
      return (
        <TravelTimeline routeResult={resultRoute} paramSearch={paramSearch} />
      );
    } else {
      console.log("aa");
    }
  };

  return (
    <div>
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
    </div>
  );
};
export default Home;
