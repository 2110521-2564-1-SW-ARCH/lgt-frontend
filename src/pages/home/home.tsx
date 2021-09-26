import { CardBox } from "../../components"
import './home.scss'

const Home: React.FC = () => {
    return (
        <div className="home-container">
        home
        <h1>Recommended Routes</h1>
        <CardBox />
        <CardBox />
        <CardBox />
        <CardBox />
        </div>
    )
}
export default Home