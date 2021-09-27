import { CardBox } from "../../components"
import Navbar from "../../components/common/navbar/navbar"
import './home.scss'
import React from "react";

const Home: React.FC = () => {
    return (
        <div>
            <Navbar/>
            <div className="home-container">
            home
                <h1>Recommended Routes</h1>
                <CardBox />
                <CardBox />
                <CardBox />
                <CardBox />
            </div>
        </div>
    )
}
export default Home