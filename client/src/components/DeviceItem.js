import React from 'react'
import {Col, Card} from 'react-bootstrap'
import Image from "react-bootstrap/Image"
import {useNavigate} from "react-router-dom"
import {DEVICE_ROUTE} from '../utils/consts'

const DeviceItem = ({device}) => {
    const navigate = useNavigate()
  return (
    <Col md={3} className={"mt-3"} onClick={()=> navigate(DEVICE_ROUTE + "/" + device.id)}>
        <Card style={{width: 150, cursor: 'pointer'}} className="bg-dark text-white">
            <Image width={150} height={150} src={process.env.REACT_APP_API_URL + device.img}/>
            <div className="mt-1 d-flex justify-content-between align-items-center">
                <div>цена: {device.price} грн</div>
                <div className="d-flex align-items-center"></div>
            </div>
            <div>{device.name}</div>
        </Card>
    </Col>
  )
}

export default DeviceItem