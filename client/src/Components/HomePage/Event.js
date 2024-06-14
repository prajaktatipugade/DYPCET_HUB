import React, { useContext, useEffect, useState } from "react";
import "./Event.css";
import axios from "axios";
import { Context } from "../../config/Context";

const Event = () => {

    const { email } = useContext(Context);

    const [data, setData] = useState([]);
    async function fetchData() { 
        await axios.post(process.env.REACT_APP_BASE_URL + '/readLiveEvents',{email})
        .then(res => {
            setData(res.data);
        })
        .catch(err => console.log(err));
    }
  useEffect(() => {
      fetchData();
}, []);
    
    return (
        <div>
            <center><h1 style={{ color: 'white' }}>Live Contest</h1></center>
            <div className="container">
            <div className="row">
                    {data.map((addLiveEvents, index) => (
                        addLiveEvents.status === true && (
                        <div key={index} className="col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4">
                            <div className="card cardhover mt-2" style={{ width: "100%", height: "450px" }}>
                                <img src={addLiveEvents.image} className="card-img-top" alt="..." height="150px" />
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                        <p className="codeevent">{addLiveEvents.eventType}</p>
                                        <p className="codetime">{addLiveEvents.start}</p>
                                    </div>
                                    <h5 className="card-title eventhead">{addLiveEvents.heading}</h5>
                                    <p className="card-text eventabout">{addLiveEvents.description}</p>
                                    <div className="d-flex">
                                        <div className="edate">
                                            <p className="eventdt">Event date</p>
                                            <p className="eventdate">{addLiveEvents.date}</p>
                                        </div>
                                        <div className="efee">
                                            <p className="eventf">Entrée fee</p>
                                            <p className="eventfee">{addLiveEvents.fees}</p>
                                        </div>
                                    </div>
                                    <a href="https://www.youtube.com/" className="btn btnregister">Register now</a>
                                    
                                    {/* {submissionStatus === 'success' && <p>Event uploaded successfully!</p>}
                                    {submissionStatus === 'error' && <p>Error uploading event. Please try again.</p>} */}
                                    <br/><br/>
                                </div>
                            </div>
                        </div>)
                    ))}
                </div>
            </div>
           
        </div>
    )
}

export default Event;