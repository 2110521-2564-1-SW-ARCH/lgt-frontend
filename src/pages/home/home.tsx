import { CardBox, SearchComponent, TravelTimeline } from "../../components";
import Navbar from "../../components/common/navbar/navbar";
import "./home.scss";
import { useState, useCallback, useEffect } from 'react'
import { getRouteApi } from "../../service/route";
import { IRoute } from "../../helpers/interface/route";
import { Spin } from "antd";

const Home: React.FC = () => {
  const [mode, setMode] = useState<string>("travel")
  const [paramSearch, setParamSearch] = useState<string[]>([])
  const [resultRoute, setResultRoute] = useState<IRoute | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleSearch = (type: "travel" | "transport", params: any) => {
    console.log(type, params);
    setLoading(true)
    setMode(type)
    if (type === "travel") setParamSearch(params.travel)
    if (type === "transport" && params.source && params.destination) {
      console.log('search', type)
      fetchRoute([params.source, params.destination])
      setParamSearch([params.source, params.destination])
    }
  };

  const fetchRoute = async (param: string[]) => {
    if (param.length === 2) {
      const res = await getRouteApi({
        srcLocation: param[0],
        destLocation: param[1]
      })
      setResultRoute(res)
      setLoading(false)
    }
  }

  const renderTravel = () => {
    return (
      <div className="route-container"> 
        <h1>Recommended Routes</h1>
        <CardBox />
        <CardBox />
        <CardBox />
        <CardBox />
      </div>
    )
  }

  const renderTravelSearch = () => {
    return (
      <div className="route-container"> 
        <h1>Recommended Routes</h1>
        <CardBox />
        <CardBox />
        <CardBox />
        <CardBox />
      </div>
    )
  }

  console.log(paramSearch)

  const renderResult = () => {
    if (loading) {
      return <div className="loading-container"><Spin /></div>
    } else if (mode === 'travel' && paramSearch.length === 0) {
      return renderTravel()
    } else if (mode === 'travel' && paramSearch.length === 1) {
      return renderTravelSearch()
    } else if (mode === 'transport' && paramSearch.length === 2 && paramSearch[0] && paramSearch[1]) {
      return <TravelTimeline routeResult={resultRoute} paramSearch={paramSearch}/>
    }
  }

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
