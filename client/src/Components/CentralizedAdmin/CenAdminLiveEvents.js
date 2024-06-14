import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button"; // Import Button component from react-bootstrap
import { Context } from "../../config/Context";
// import { useHistory } from "react-router-dom";
const LiveEventReq = () => {
    const [data, setData] = useState([]);
    // const history = useHistory();
    const { email } = useContext(Context);
    useEffect(() => {
        axios.post(process.env.REACT_APP_BASE_URL + '/readLiveEvents',{email})
            .then(res => {
                setData(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    // const handleAccept = (acceptedEvent) => {
    //     history.push({
    //         pathname: '/events',
    //         state: { acceptedEvent }
    //     });
    // };

    async function acceptForm(id) { 
        await axios.post(process.env.REACT_APP_BASE_URL + "/acceptLiveEvents", { id }).then(response =>{
            console.log(response.data);
            window.alert("Event accepted successfully!");
        }).catch(error => { 
            console.log(error.data);
            window.alert("Error accepting event. Please try again.");
        })
    }

    async function StopForm(id) { 
        await axios.post(process.env.REACT_APP_BASE_URL + "/StopLiveEvents", { id }).then(response =>{
            console.log(response.data);
            window.alert("Event stopped successfully!");
        }).catch(error => { 
            console.log(error.data);
            window.alert("Error stopping event. Please try again.");
        })
    }

 

    return (
        <div>
            <center><h1 style={{ color: 'white' }}>Live Contest</h1></center>
            <div className="container">
                <div className="row">
                    {data.map((addLiveEvents, index) => (
                        <div key={index} className="col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4">
                            <div className="card cardhover mt-2" style={{ width: "100%", height: "470px" }}>
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
                                    <a href="https://www.youtube.com/" className="btn btnregister">Register now</a><br></br>
                                    <Button variant="primary" onClick={()=>acceptForm(addLiveEvents._id)} className="col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4 btnAccept butn">
                                        Accept
                                    </Button>
                                    <Button variant="danger" onClick={()=>StopForm(addLiveEvents._id)} className="col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4 butn">
                                        Stop
                                    </Button>
                                    {/* {submissionStatus === 'success' && <p>Event uploaded successfully!</p>}
                                    {submissionStatus === 'error' && <p>Error uploading event. Please try again.</p>} */}
                                    <br/><br/>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LiveEventReq;
