import React, { useContext, useEffect, useState } from 'react';
import './Home.css';
import imgLogo from '../Images/cc.png';
import { Navbar_b } from './Navbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../../config/Context';


const ClubHome = () => {
    const { id } = useParams();
    //const [clubs, setClubs] = useState(undefined);
    const { email, setEmail } = useContext(Context);
    

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.post(process.env.REACT_APP_BASE_URL + '/readAboutUs', {email})
            .then(res => {
                console.log(res.data);
                setData(res.data);
            })
            .catch(err => console.log(err));
    }, [])


    async function getAllClubDetails() {
        try {
            const res = await axios.post(process.env.REACT_APP_BASE_URL + '/clubDetails', { id });
            setEmail(res.data.Email);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllClubDetails();
    }, []);

    useEffect(() => {
        if (email) { 
            console.log(email);
        }
    }, [email]);

    return (
        <>
            {email && <Navbar_b id={id} />}
            {data.map((addAboutUs, index) => (
                <div key={index}>
                    <div className="main-cont">
                        <div className="container custom-container">
                            <div className="row customRow">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 descriptionDiv">
                                    <div className='desc'>
                                        <h1 className='describe'>Welcome to our Club</h1>
                                        <h4 className='sub-describe'>We are here to code your life and execute successfully!</h4>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 imageCol">
                                    <img src={addAboutUs.logoImage} alt="Club Logo" className='imgLogo-style' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
        
};

export default ClubHome;
