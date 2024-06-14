import React, { useContext } from 'react'
import { Row, Col } from 'antd'
import { InstagramOutlined, LinkedinOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import './TeamCoding.css';
import { Navbar_b } from './Navbar';
//import ModalEx from './ModalEx';
import axios from "axios";
import { useState, useEffect } from 'react';
import { Context } from '../../config/Context';
import { useParams } from 'react-router-dom';
const TeamCoding = () => {
    const { id } = useParams();
    const { email } = useContext(Context);
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.post(process.env.REACT_APP_BASE_URL + '/readMembers',{email})

            .then(res => {
                setData(res.data);
            })
            .catch(err => console.log(err));
    }, [])

    const { Meta } = Card;
    return (

        <>
            {
                email ? 
                <Navbar_b  id={id} /> 
                    : 
                    <></>
            }

       
<div className="container">
                <h1 className='our-team'>Our Team</h1>
                {/* <Row gutter={[24, 16]}>
                    {data.map((addMembers, index) => {
                        return <div key={index}>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Card hoverable
                                    className='custom-card'
                                    cover={
                                        <img
                                            alt="example"
                                            src={addMembers.image}
                                        />
                                    }
                                    actions={[
                                        <a href={addMembers.linkedlnLink}><LinkedinOutlined /></a>,
                                        <a href={addMembers.instaLink}><InstagramOutlined /></a>,
                                    ]}
                                >
                                    <Meta
                                        avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                                        title={addMembers.name}
                                        description={addMembers.position}
                                    />
                                </Card>
                            </Col>
                        </div>
                    })}



                    <hr />
                </Row> */}
                <Row gutter={[24, 16]} className='membersRow'>
                    {data.map((addMembers, index) => (
                        <Col key={index} xs={24} sm={12} md={8} lg={8} xl={8}>
                            <Card
                                hoverable
                                className='custom-card'
                                cover={<img alt="example" src={addMembers.image} className='teamMemberImage' />}
                                actions={[
                                    <a href={addMembers.linkedlnLink}><LinkedinOutlined /></a>,
                                    <a href={addMembers.instaLink}><InstagramOutlined /></a>,
                                ]}
                            >
                                <Meta
                                    avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                                    title={addMembers.name}
                                    description={addMembers.position}
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>

            </div>
            </>
    )
}

export default TeamCoding
