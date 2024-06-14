import React, { useContext } from 'react'
import { Col, Row } from 'antd'
import './About.css'
import { Navbar_b } from './Navbar';
import { useState } from 'react';
import Vision from './Vision';
import { useEffect } from 'react';
import axios from "axios";
import { Context } from '../../config/Context';
import { useParams } from 'react-router-dom';
const About = () => {

    const [data, setData] = useState([]);
    const { email } = useContext(Context);
    const { id } = useParams();
    // useEffect(() => { 
    //     axios.post(process.env.REACT_APP_BASE_URL + "/clubDetails", { id ,email}).then(response =>{
    //         console.log(response.data);
    //     }).catch(error => { 
    //         console.log(error.data);
    //     })
    // }, [])
    

    useEffect(() => {
        axios.post(process.env.REACT_APP_BASE_URL + '/readAboutUs', {email})
            .then(res => {
                console.log(res.data);
                setData(res.data);
            })
            .catch(err => console.log(err));
    }, [])


    return (
        <>
           {
                email ? 
                <Navbar_b  id={id} /> 
                    : 
                    <></>
            }
            {data.map((addAboutUs, index) => {
                return <div key={index}>
 <div className="container about-page mt-5">

<Row gutter={16} className='row-style'>

    <Col xs={24} sm={24} md={12} lg={12} xl={12} className='first-col' >
        <div className='aboutClubImage'>
            <img src={addAboutUs.logoImage} className='club-img' />
        </div>
    </Col>
    <Col xs={24} sm={24} md={12} lg={12} xl={12} >
        <div className='harshAbotDetail'>
            <h1 className='aboutHead'>About us</h1>
            <p>{addAboutUs.aboutInfo}</p>
        </div>
    </Col>
</Row>
</div>
</div>
            })}
            <Vision/>

        </>
    )
}

export default About
