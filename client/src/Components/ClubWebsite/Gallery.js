import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { Image, Button, Flex } from 'antd'
import axios from "axios";
import { Navbar_b } from './Navbar';
import { Context } from '../../config/Context';
import { useParams } from 'react-router-dom';

const Gallery = () => {
    const { id } = useParams();
    const { email } = useContext(Context);
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.post(process.env.REACT_APP_BASE_URL + '/readGallery',{email})

            .then(res => {
                setData(res.data);
            })
            .catch(err => console.log(err));
    }, [])


    return (
        <div>
            {
                email ? 
                <Navbar_b  id={id} /> 
                    : 
                    <></>
            }

<div className='container'>
                <br></br><br></br>
                <Flex wrap="wrap" gap="small">
                    <Image.PreviewGroup
                        preview={{
                            onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                        }}
                    >
                        {data.map((addGallery, index) => {
                            return <div key={index}>
                                <Image  width={280} src={addGallery.image} />
                            </div>
                        })}
                    </Image.PreviewGroup>
                </Flex>
            </div>

        </div>
    )
}

export default Gallery
