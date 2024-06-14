import React, { useContext, useState, useEffect } from 'react';
import './Vision.css';
import { Col, Row, Card } from 'antd';
import axios from 'axios';
import { Context } from '../../config/Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpenReader, faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';

const Vision = () => {
    const { email } = useContext(Context);
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.post(process.env.REACT_APP_BASE_URL + '/readAboutUs',{email})

            .then(res => {
                setData(res.data);
            })
            .catch(err => console.log(err));
    }, [])

    return (
        <>
     
     <div className='container-fluid'>
            {data.map((addAboutUs, index) => (
                <div key={index} className="container mt-5">
                    <h1 className='visionHead'>Our Vision-Mission</h1>
                    <Row gutter={[16, 16]} className='justify-content-center'>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Card bordered className='mission' hoverable>
                                <FontAwesomeIcon icon={faBookOpenReader} className="fa-icon-beat visonLogo" style={{ fontSize: '50px' }} />
                                <p className='vision-text'>
                                    {addAboutUs.mission}
                                </p>
                            </Card>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Card bordered className='mission' hoverable>
                                <FontAwesomeIcon icon={faGlobeAmericas} className="fa-icon-beat visonLogo" style={{ fontSize: '50px' }} />
                                <p className='vision-text'>
                                    {addAboutUs.vision}
                                </p>
                            </Card>
                        </Col>
                    </Row>
                </div>
            ))}
        </div>
            </>
    )
}

export default Vision;

