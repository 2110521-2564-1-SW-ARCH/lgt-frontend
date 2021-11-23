import "./style.scss";
import { Button, message, Select } from "antd";
import { IoIosBus } from "react-icons/io";
import { FaMountain } from "react-icons/fa";
import { useState, Fragment, useEffect } from "react";
import { getAllOptionRouteApi } from "../../service/route";
import { getLocationAllApi } from "../../service/location";

const SearchComponent: React.FC<{ searchFunction: Function }> = ({
  searchFunction,
}) => {
  const [travel, setTravel] = useState<string | undefined>(undefined);
  const [source, setSource] = useState<string | undefined>(undefined);
  const [destination, setDestination] = useState<string | undefined>(undefined);
  const [currentSearch, setCurrentSearch] = useState("travel");

  // option select
  const [sourceOption, setSourceOption] = useState<{ value: string }[]>([]);
  const [destinationOption, setDestinationOption] = useState<
    { value: string }[]
  >([]);
  const [travelOption, setTravelOption] = useState<{ value: string }[]>([]);

  const isActive = (type: string) => {
    return currentSearch === type ? `active` : ``;
  };

  const handleOnChange = (key: string, value: string) => {
    if (key === "travel") setTravel(value);
    else if (key === "source") setSource(value);
    else if (key === "destination") setDestination(value);
  };

  const checkEmpty = () => {
    if (currentSearch === "transport") {
      if (!!source || !!destination) return true;
    } else if (!!travel) return true;
    return false;
  };

  const handleSearch = () => {
    if (checkEmpty()) {
      let params: any = {};
      if (currentSearch === "travel") {
        params["travel"] = travel;
        searchFunction("travel", params);
      } else {
        params["source"] = source;
        params["destination"] = destination;
        searchFunction("transport", params);
      }
    } else {
      if (currentSearch === "travel") {
        message.warning(
          "Please enter the name of a country, city, neighborhood, landmark or place to travel."
        );
      } else {
        message.warning("Please enter the source and the destinaton.");
      }
    }
  };

  const fetchTransportOption = async () => {
    await getAllOptionRouteApi().then((response) => {
      setSourceOption(
        response[0].map((item: string) => {
          return { value: item };
        })
      );
      setDestinationOption(
        response[1]?.map((item: string) => {
          return { value: item };
        })
      );
    });

    await getLocationAllApi().then((response) => {
      setTravelOption(
        response.map((item: { [key: string]: string }) => {
          return { value: item.name };
        })
      );
    })
  };

  useEffect(() => {
    fetchTransportOption();
  }, []);

  const renderForm = () => {
    if (currentSearch === "travel") {
      return (
        <div className="form-input">
          <Select
            allowClear
            showSearch
            size="large"
            placeholder="Going to"
            options={travelOption}
            filterOption={(input, option) => {
              return (
                option?.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
              );
            }}
            value={travel}
            onChange={(value: string) => handleOnChange("travel", value)}
          />
        </div>
      );
    }
    return (
      <Fragment>
        <div className="form-input">
          <Select
            allowClear
            showSearch
            size="large"
            placeholder="Search Source Location"
            options={sourceOption}
            filterOption={(input, option) => {
              return (
                option?.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
              );
            }}
            value={source}
            onChange={(value: string) => handleOnChange("source", value)}
          />
        </div>
        <div className="form-input">
          <Select
            placeholder="Search Destination Location"
            allowClear
            showSearch
            size="large"
            value={destination}
            options={destinationOption}
            optionFilterProp="children"
            filterOption={(input, option) => {
              return (
                option?.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
              );
            }}
            onChange={(value: string) => handleOnChange("destination", value)}
          />
        </div>
      </Fragment>
    );
  };

  return (
    <div className="search-container">
      <div className="search-section">
        <div className="type">
          <div>
            <div
              onClick={() => setCurrentSearch("travel")}
              className={`type-button ${isActive("travel")}`}
            >
              <FaMountain className="type-icon" />
              <div className="type-title">Travel</div>
            </div>
          </div>
          <div>
            <div
              onClick={() => setCurrentSearch("transport")}
              className={`type-button ${isActive("transport")}`}
            >
              <IoIosBus className="type-icon" />
              <div className="type-title">Transport</div>
            </div>
          </div>
        </div>
        <div className="form-container">{renderForm()}</div>
        <div className="search-button">
          <Button type="primary" size="large" onClick={() => handleSearch()}>
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
