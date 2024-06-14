import React, { useContext, useEffect, useState } from "react";
import "./Event.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../../config/Context";

const ClubsCard = ({ ClubName, ClubMotive, id }) => {
    const navigate = useNavigate();

    function codingWeb() {
        navigate(`/ClubHome/${id}`);
    }

    const { email } = useContext(Context);
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.post(process.env.REACT_APP_BASE_URL + '/readAboutUs', { email })
            .then(res => {
                console.log(res.data);
                setData(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="" onClick={codingWeb}>
                        <div className="card cardhover mt-2" style={{ width: "100%", height: "420px" }}>
                            {data.length > 0 && data.map((addAboutUs, index) => (
                                <div key={index}>
                                    <img src={addAboutUs.logoImage} className="card-img-top" alt="..." height="150px" />
                                </div>
                            ))}
                            <div className="card-body">
                                <h5 className="card-title eventhead">{ClubName}</h5>
                                <p className="card-text eventabout">{ClubMotive}</p>
                                <div className="d-flex">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClubsCard;
