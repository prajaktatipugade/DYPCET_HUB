import React, { useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './EventSlider.css'
import axios from 'axios';
import { useState, useEffect } from "react";
import  { Navbar_b } from "./Navbar";
import { Context } from '../../config/Context';
import { useParams } from "react-router-dom";

const EventSlider = () => {

    const { email } = useContext(Context);
    const { id } = useParams();
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.post(process.env.REACT_APP_BASE_URL + '/readEvents',{email})

            .then(res => {
                setData(res.data);
            })
            .catch(err => console.log(err));
    }, [])



    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ],
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />
    };

    function CustomPrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={`${className} custom-arrow custom-prev-arrow`}
                style={style}
                onClick={onClick}
            />
        );
    }

    function CustomNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={`${className} custom-arrow custom-next-arrow`}
                style={style}
                onClick={onClick}
            />
        );
    }
    return (
        <>
            {
                email ? 
                <Navbar_b  id={id} /> 
                    : 
                    <></>
            }
            <div className="container-fluid mt-5">
                <h3 className="text-center"> Ongoing Events</h3>
                <div className="container">
                    <div className="slider-container harshSlider">
                        <Slider {...settings}>
                            
                            {data.map((addEvents, index) => {
                                return <div key={index}>
                                    <div>

                                        <div className="card col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 customCard"  >
                                            <img src={addEvents.image} className="card-img-top" alt="..." />
                                            <div className="card-body">
                                                <h5 className="card-title">{ addEvents.heading }</h5>
                                                <p className="card-text">
                                                    { addEvents.description}
                                                </p>
                                                <a href="#" className="btn btn-primary">Learn More</a>
                                            </div>
                                        </div>

                                    </div>
                    
                                </div>
                            })}
                        
                        {/* <div>
                        <h3>5</h3>
                    </div>
                    <div>
                        <h3>6</h3>
                    </div>
                    <div>
                        <h3>7</h3>
                    </div>
                    <div>
                        <h3>8</h3>
                    </div> */}
                    </Slider>
                </div>
            </div>
            </div>
            </>
    )
}

export default EventSlider

