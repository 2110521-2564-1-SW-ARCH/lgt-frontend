import { useState, useEffect } from 'react';
import { useLocation, useHistory } from "react-router-dom";
import _ from 'lodash'

// interface
import { ILocationRouteDetail } from '../../helpers/interface/location';
import { ISavePlan } from '../../helpers/interface/travelcatalog';

// UI
import './generatePlan.scss'
import { Button, Space, Card, Divider, Empty, Image, message, Spin, Row, Timeline, Modal, Input, Form, Switch } from 'antd';
import { useForm } from 'antd/lib/form/Form'

// image 
import busImg from '../../images/bus_icon.png'
import carImg from '../../images/car_icon.png'
import trainImg from '../../images/train_icon.png'
import bicycleImg from '../../images/bicycle.png'
import motorcycleImg from '../../images/motorcycle.png'

// API
import { getRouteApi } from '../../service/route';
import { savePlanApi } from '../../service/travelCatalog';

interface IRoute {
    time: number
    route: IRouteDetail[]
}

interface IRouteDetail {
    id: number
    source: string
    destination: string
    time: number
    type: string
    additional_type: string
    updated_at: string
}

interface IPlan {
    userName: string
    planName: string
    description: string
    locations: number[]
}

const GeneratePlan: React.FC = () => {
    const location = useLocation()
    const history = useHistory()
    const [loading, setLoading] = useState<boolean>(true)
    const [planDetail, setPlanDetail] = useState<ILocationRouteDetail[]>([])
    const [sourcePlan, setSourcePlan] = useState<string>("")
    const [destinationPlan, setDestinationPlan] = useState<string>("")
    var listPlanRes: IRoute[]

    const [planList, setPlanList] = useState<IRoute[]>([])
    const [saveLocation, setSaveLocation] = useState<string[]>([])

    const [visiblePlanModal, setVisiblePlanModal] = useState<boolean>(false)
    const [form] = useForm()

    const savePlan = async (formField: {
        planName: string,
        planDescription: string,
        isPublic: boolean,
    }) => {
        try {
            console.log('value', formField)
            console.log('planDetail', planDetail)
            const username = localStorage.getItem('username')
            const locationId: number[] = planDetail.map((item) => (item.id))
            console.log('locationId', locationId)
            console.log('user', username)
            if (username) {
                const res = await savePlanApi({
                    userName: username,
                    planName: formField.planName,
                    description: formField.planDescription,
                    isPublic: formField.isPublic,
                    locations: locationId
                })
                console.log('res', res)
                history.push('/home')
            }
            
        } catch (error) {   
            message.error("Can't save plan")
        }
    }

    const fetchAllRoute = async (details: ILocationRouteDetail[]) => {
        var saveLocationList: string[] = []
        details.map(async (item, index) => {
            var currentLocationList: IRoute[] = []
            if (index !== details.length - 1) {
                await fetchRoute(item, details[index + 1])
                    .then((response) => {
                        listPlanRes.push(response)
                        currentLocationList.push(response)
                        setPlanList(listPlanRes)
                    })
                saveLocationList.push(item.name)
                setSaveLocation(saveLocationList)
            }
        })
    }

    const fetchRoute = async (
        sourceItem: ILocationRouteDetail, 
        destinationItem: ILocationRouteDetail
        ) => {
        return await getRouteApi({
            srcLocation: sourceItem.name, 
            destLocation: destinationItem.name
        })
    } 
    
    const initLoad = () => {
        setLoading(true)
        fetchAllRoute(location.state.detail)
        setPlanDetail(location.state.detail)
        setSourcePlan(location.state.detail[0].name)
        setDestinationPlan(location.state.detail[location.state.detail.length - 1].name)
    }

    console.log('loading', loading)
    useEffect(() => {
        listPlanRes = []
        initLoad()
        setLoading(false)
    }, [])
    
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

    function getClassName(name: string) {
        if ( _.find(planDetail, {name: name})){
            return "green-section"
        }
        return "blue-section"
    }

    const renderLocation = () => {
        const list = planList.map((locationItem, index) => {
            return locationItem.route.map((item, locationIndex) => {
                if (locationIndex === 0 && index === 0) {
                    return (
                        <>
                            <Timeline.Item>
                                <div className={getClassName(item.source)}>
                                    <h2>{item.source}</h2>
                                </div>
                            </Timeline.Item>
                            <Timeline.Item>
                                <div className={getClassName(item.destination)}>
                                    <h2>{item.destination}</h2>
                                </div>
                                {renderVehicle(item)}
                            </Timeline.Item>
                        </>
                    )
                }
                return (
                    <Timeline.Item>
                        <div className={getClassName(item.destination)}>
                            <h2>{item.destination}</h2>
                        </div>
                        {renderVehicle(item)}
                    </Timeline.Item>
                )
            })
        })
        return list
    }

    function sumTime() {
        var sum = 0
        planList.map((locationItem) => {
            sum += locationItem.time
        })
        return sum
    }

    const titleCard = () => {
        const firstName = localStorage.getItem("firstName")
        return (
            <div>
                <div>
                    แพลนของคุณ <span className="title-value">{firstName}</span>
                    เดินทางจาก
                    <span className="title-value">{sourcePlan}</span>
                    ไป
                    <span className="title-value">{destinationPlan}</span>
                </div>
                <div className="time-section">
                    เวลาที่ใช้ทั้งหมด {sumTime()} นาที
                </div>
            </div>
        )
    }

     if (loading || planDetail.length === 0 || planList.length === 0) {
        return (
            <div className="generate-plan-container">
                <div className="loading-container">
                    <Spin/>
                </div>
            </div>
        )
    } else if (planList[0].route.length === 0) {
        return (
            <div className="generate-plan-container">
                 <div className="generate-section">
                     <h2>Generate Plan</h2>
                     <Card title={titleCard()}>
                        <div className="center">
                            <Empty />
                        </div>
                    </Card>
                </div>
            </div>
        )
    } 

    return (
        <div className="generate-plan-container">
            <div className="generate-section">
                <h2>Generate Plan</h2>
                <Card title={titleCard()}>
                    <Timeline>
                        {renderLocation()}
                    </Timeline>
                    <Row justify="center" align="middle">
                        <Button onClick={() => {setVisiblePlanModal(true)}}>
                            Save
                        </Button>
                    </Row>
                </Card>
            </div>
            <Modal centered visible={visiblePlanModal} footer={false} onCancel={() => setVisiblePlanModal(false)}>
                <div className="modal-plan-container">
                    <h3>ยืนยันแพลนของคุณ กรุณากรอกข้อมูลด้านล่างให้ครบถ้วน</h3>
                    <Form 
                        onFinish={savePlan} form={form}
                        initialValues={{
                            planName: "",
                            planDescription: "",
                            isPublic: false
                        }}>
                        <Form.Item name="planName" label="Plan Name">
                            <Input />
                        </Form.Item>
                        <Form.Item name="planDescription" label="Plan Description">
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item 
                            name="isPublic" 
                            label="คุณต้องการแบ่งปันเส้นทางของคุณกับผู้อื่นไหม ?">
                            <Switch />
                        </Form.Item>
                        <Form.Item>
                            <Row justify='center' align="middle">
                                <Space>
                                    <Button htmlType="submit" type="primary">
                                        Save
                                    </Button>
                                    <Button onClick={() => {
                                        setVisiblePlanModal(false)
                                        form.resetFields()
                                    }}>
                                        Cancel
                                    </Button>
                                </Space>
                            </Row>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </div>
    )
}

export default GeneratePlan