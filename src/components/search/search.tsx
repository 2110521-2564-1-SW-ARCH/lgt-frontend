import { Input, Button, message } from "antd";
import { IoIosPin, IoIosBus } from "react-icons/io";
import { FaMountain } from "react-icons/fa";
import { useState, Fragment } from "react";
import "./style.scss";

const SearchComponent: React.FC<{ searchFunction: Function }> = ({
  searchFunction,
}) => {
  const [travel, setTravel] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [currentSearch, setCurrentSearch] = useState("travel");

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
      if (source.length === 0 || destination.length === 0) return false;
      return true;
    } else if (travel.length === 0) return false;
    return true;
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

  const renderForm = () => {
    if (currentSearch === "travel") {
      return (
        <div className="form-input">
          <Input
            allowClear
            size="large"
            placeholder="Going to"
            prefix={<IoIosPin />}
            value={travel}
            onChange={(e) => handleOnChange("travel", e.target.value)}
          />
        </div>
      );
    }
    return (
      <Fragment>
        <div className="form-input">
          <Input
            allowClear
            size="large"
            placeholder="Source"
            prefix={<IoIosPin />}
            value={source}
            onChange={(e) => handleOnChange("source", e.target.value)}
          />
        </div>
        <div className="form-input">
          <Input
            allowClear
            size="large"
            placeholder="Destination"
            prefix={<IoIosPin />}
            value={destination}
            onChange={(e) => handleOnChange("destination", e.target.value)}
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
