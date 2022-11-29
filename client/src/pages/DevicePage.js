//rafce
import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {useParams} from 'react-router-dom';
import {addToBasket, fetchOneDevice} from "../http/deviceAPI";

const DevicePage = () => {
  const [device, setDevice] = useState({info: []})
  const {id} = useParams()
  useEffect(() => {
      fetchOneDevice(id).then(data => setDevice(data))
  }, [])

  const add = () => {
      const formData = new FormData()
      formData.append('deviceId', id)
      addToBasket(formData).then(response => alert(`Товар ` + device.name + ` был добавлен в вашу корзину!`))
  }

  return (
    <Container className="mt-3 ">
    <Row>
        <Col md={4}>
              <Card
                    className="d-flex flex-column align-items-center justify-content-around bg-dark text-white"
                    style={{width: 300, height: 300, fontSize: 32, border: 'white'}}
                  >
                    <h1>{device.name}</h1>
              </Card>
        </Col>
        <Col md={4}>
            <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img}/>
        </Col>
        <Col md={4}>
            <Card
                  className="d-flex flex-column align-items-center justify-content-around bg-dark text-white"
                  style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
                >
                  <h3>От: {device.price} руб.</h3>
                  <Button variant={"outline-light"} onClick={add} >Добавить в корзину</Button>
            </Card>
        </Col>
    </Row><br/>
    <Row className="d-flex flex-column m-3 text-white">
            <h1>Характеристики</h1>
            {device.info.map((info, index) =>
            <Row key={info.id} style={{border: '2px solid lightgray', background: index % 2 === 0 ? 'darkgray' : 'transparent', padding: 10}}>
                    {info.title}: {info.description}
            </Row>
            )}
    </Row>
        </Container>
    );
};

export default DevicePage;