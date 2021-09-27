import { CardBox, SearchComponent } from "../../components";
import Navbar from "../../components/common/navbar/navbar";
import "./home.scss";

const Home: React.FC = () => {
  const handleSearch = (type: string, params: any) => {
    console.log(type, params);
  };

  return (
    <div>
      <Navbar />
      <div className="home-container">
        <div className="bg-container">
            <SearchComponent
            searchFunction={(type: string, params: any) =>
                handleSearch(type, params)
            }
            />
            <div className="route-container">
                <h1>Recommended Routes</h1>
                <CardBox />
                <CardBox />
                <CardBox />
                <CardBox />
            </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
