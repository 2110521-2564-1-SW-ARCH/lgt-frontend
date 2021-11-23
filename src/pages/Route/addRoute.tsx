import { CheckCircleTwoTone, InfoCircleOutlined } from '@ant-design/icons'
import { Button, Divider, Form, Input, message, Modal, Row, Select, Space } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useState } from 'react'
import { addRouteApi } from '../../service/route'
import './addRoute.scss'

interface IAddRouteApi {
    source: string
    destination: string
    time: string
    type: string
    additional_type: string
}

const AddRoute: React.FC = () => {
    const [form] = useForm()
    const [visible, setVisible] = useState<boolean>(false)

    function onReset() {
        form.resetFields()
    }

    const onSaveRoute = async (value: IAddRouteApi) => {
        try {
            await addRouteApi({
                ...value,
                time: value.time ? parseInt(value.time): 0,
                additional_type: value.additional_type ? value.additional_type: ""
            })
            setVisible(true)
        } catch {
            message.error("Can't save your route")
        }
    }

    return (
        <div className="add-route-container">
            <div className="add-section">
                <Divider orientation="left">
                        Add new route
                </Divider>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onSaveRoute}
                    >
                    <Form.Item 
                        name="source" 
                        label="Source"
                        rules={[{ required: true }]}>
                        <Input placeholder="Enter Source" />
                    </Form.Item>
                    <Form.Item 
                        name="destination" 
                        label="Destination"
                        rules={[{ required: true }]}>
                        <Input placeholder="Enter Destination"/>
                    </Form.Item>
                    <Form.Item name="time" label="Time">
                        <Input placeholder="Enter Time" />
                    </Form.Item>
                    <Form.Item name="type" label="Type" rules={[{ required: true }]}>
                        <Select placeholder="Select Type of vehicle">
                            <Select.Option value="bicycle">Bicycle</Select.Option>
                            <Select.Option value="motorcycle">Motorcycle</Select.Option>
                            <Select.Option value="car">Car</Select.Option>
                            <Select.Option value="taxi">Taxi</Select.Option>
                            <Select.Option value="bus">Bus</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item 
                        name="additional_type" 
                        label="Additional Type"
                        tooltip={{ title: 'หมายเหตุ (เช่น สายรถเมล์)', icon: <InfoCircleOutlined /> }}>
                        <Input placeholder="Enter Additional Type" />
                    </Form.Item>
                    <Form.Item>
                        <Space align="center">
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button htmlType="button" onClick={onReset}>
                                Reset
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
            <Modal 
                visible={visible}
                onCancel={() => setVisible(false)}
                footer={false}
                className="add-route-modal"
                centered>
                <Row justify="center" align="middle">
                    <CheckCircleTwoTone twoToneColor="#52c41a" /> 
                    <div className="text">Add new route success!</div>
                </Row>
                <Row justify="center">
                    <Button href="/home">Return to home</Button>
                </Row>
            </Modal>
        </div>
    )
}

export default AddRoute