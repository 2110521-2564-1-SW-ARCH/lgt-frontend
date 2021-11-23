import { Card, Divider, Empty, Image, Timeline } from "antd"
import { IRoute, IRouteDetail } from '../../helpers/interface/route'
import './style.scss'

// image 
import busImg from '../../images/bus_icon.png'
import carImg from '../../images/car_icon.png'
import trainImg from '../../images/train_icon.png'
import bicycleImg from '../../images/bicycle.png'
import motorcycleImg from '../../images/motorcycle.png'

import Item from "antd/lib/list/Item"

interface ITravelTimeline {
    routeResult: IRoute | null
    paramSearch: string[]
}
const TravelTimeline: React.FC<ITravelTimeline> = ({
    routeResult,
    paramSearch,
}) => {

    const typeIcon = (type: string, additional_type: string) => {
        switch (type) {
            case "bus":
                return <Image preview={false} width={25} height={25} src={busImg} alt="bus_icon"/>
            case "taxi":
                return <Image preview={false} width={25} height={25} src={carImg} alt="car_icon"/>
            case "car":
                return <Image preview={false} width={25} height={25} src={carImg} alt="car_icon"/>
            case "train":
                return <Image preview={false} width={25} height={25} src={trainImg} alt="train_icon"/>
            case "bicycle":
                return <Image preview={false} width={25} height={25} src={bicycleImg} alt="bicycle_icon"/>
            case "motorcycle":
                return <Image preview={false} width={25} height={25} src={motorcycleImg} alt="motorcycle_icon"/>
            default:
                return null
        }
    }

    const prefixAdditionalType = (additional_type: string) => {
        if (parseInt(additional_type)) {
            return <span>สาย</span>
        }
    }

    const renderVehicle = (item: IRouteDetail) => {
        prefixAdditionalType(item.additional_type)
        return (
            <div className="vehicle-section">
                {typeIcon(item.type, item.additional_type)} 
                <span>
                    {prefixAdditionalType(item.additional_type)}
                    {item.additional_type}
                </span>
                <Divider type="vertical" />
                <span>
                    {item.time} นาที
                </span>
            </div>
        )
    }

    const renderLocation = () => {
        const list = routeResult?.route.map((item, index) => {
            if (index === 0) {
                return (
                    <>
                        <Timeline.Item>
                            <div className="blue-section">
                                <h2>ตำแหน่งของคุณ: {item.source}</h2>
                            </div>
                        </Timeline.Item>
                        <Timeline.Item>
                            <div className="blue-section">
                                <h2>{item.destination}</h2>
                            </div>
                            {renderVehicle(item)}
                        </Timeline.Item>
                    </>
                )
            }
            return (
                <Timeline.Item>
                    <div className="blue-section">
                        <h2>{item.destination}</h2>
                    </div>
                    {renderVehicle(item)}
                </Timeline.Item>
            )
        })
        return list
    }

    const titleCard = () => {
        return (
            <div>
                <div>
                    คุณกำลังค้นหาเส้นทาง จาก 
                    <span className="title-value">{paramSearch[0]}</span>
                    ไป
                    <span className="title-value">{paramSearch[1]}</span>
                </div>
                <div className="time-section">
                    เวลาที่ใช้ทั้งหมด {routeResult?.time} นาที
                </div>
            </div>
        )
    }

    if (routeResult?.route.length === 0) {
        return (
            <div className="travel-timeline-container center">
                <Empty />
            </div>
        )
    }
    return (
        <div className="travel-timeline-container">
            <Card title={titleCard()}>
                <Timeline>
                    {renderLocation()}
                </Timeline>
            </Card>
        </div>
    )
}

export default TravelTimeline