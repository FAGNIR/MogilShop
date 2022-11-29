import React, { useEffect, useContext } from 'react';
import { Context } from '..';
import { getBasket } from '../http/deviceAPI';
import { Card, Col, Container, Row } from 'react-bootstrap'
import { observer } from 'mobx-react-lite';
import GooglePayButton from '@google-pay/button-react'
import {useNavigate} from "react-router-dom"
import {DEVICE_ROUTE} from '../utils/consts'
import Image from "react-bootstrap/Image"

const Basket = observer(() => {
    const {device} = useContext(Context)
    const navigate = useNavigate()
    useEffect(() => {
        getBasket().then(data => device.setBaskets(data))
    }, [])
    return (
        <Container
            className="d-flex flex-sm-column justify-content-center align-items-center mt-3"
        >
            <h1 className="pb-2">Корзина</h1>

            {device.basket?.map(product =>
                
                <div 
                className="d-flex w-100 p-2 justify-content-center mb-2" key={product.id}>
                    <Row className="d-flex w-100">

                    <Col md={3} className={"mt-3 "} onClick={()=> navigate(DEVICE_ROUTE + "/" + product.device.id)}>         
                            <Card style={{width: 150, cursor: 'pointer'}} className="bg-dark text-white">
                                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + product.device.img} className="bg-dark"/>
                                <div className="mt-1 d-flex justify-content-between align-items-center">
                                <div>цена: {product.device.price} грн</div>
                                <div className="d-flex align-items-center"></div>
                                </div>
                                <div>{product.device.name}</div>
                            </Card>
                        </Col>
                        <Col>
                            <div className="d-flex h-100 flex-row align-items-center">
                                <GooglePayButton
                                    environment="TEST"
                                    paymentRequest={{
                                        apiVersion: 2,
                                        apiVersionMinor: 0,
                                        allowedPaymentMethods: [{
                                            type: "CARD",
                                            parameters: {
                                                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                                allowedCardNetworks: ['MASTERCARD', 'VISA'],
                                            },
                                            tokenizationSpecification: {
                                                type: 'PAYMENT_GATEWAY',
                                                parameters: {
                                                    gateway: 'example',
                                                    gatewayMerchantId: 'exampleGateWayMerchantId',
                                                }
                                            }
                                        },],
                                        merchantInfo: {
                                            merchantId: '12345678901234567890',
                                            merchantName: 'Demo name',
                                        },
                                        transactionInfo: {
                                            totalPriceStatus: 'FINAL',
                                            totalPriceLabel: 'Total',
                                            totalPrice: product.device.price,
                                            currencyCode: 'UAH',
                                            countryCode: 'UA',
                                        },
                                        shippingAddressRequired: true,
                                        callbackIntents: ['SHIPPING_ADDRESS', 'PAYMENT_AUTHORIZATION'],
                                    }}
                                    onLoadPaymentData={paymentRequest => {
                                        console.log('success', paymentRequest);
                                        document.getElementById(product.id).hidden = false;
                                    }}
                                    onPaymentAuthorized={paymentData =>{
                                        console.log('Payment Authorised Success', paymentData)
                                        return {transactionState: 'SUCCESS'}
                                    }}
                                    onPaymentDataChanged={paymentData =>{
                                        console.log('On Payment Data Changed', paymentData)
                                        return {}
                                    }}
                                    existingPaymentMethodRequired='false'
                                    buttonColor='black'
                                    buttonType='Pay'
                                />
                            </div>
                            
                        </Col>           
                        <Col hidden={true} id={product.id}>
                            <div className="d-flex h-100 flex-row align-items-center">
                                <h6 className="font-weight-light" >PAYMENT SUCCESS</h6>
                            </div>
                            
                        </Col>             
                    </Row>
                </div>
            )}
        </Container>
    );
});

export default Basket;