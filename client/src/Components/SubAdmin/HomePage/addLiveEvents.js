import React, {  useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../../config/Context";

const AddLiveEvents = () => {

    const {loginInfo} = useContext(Context);

    const [file, setFile] = useState();
    const [image, setImage] = useState(undefined);
    const [heading, setHeading] = useState("");
    const [description, setDescription] = useState("");
    const [eventType, setEventType] = useState("");
    const [date, setDate] = useState("");
    const [fees, setFees] = useState("");
    const [start, setStart] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); 
    }

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('image', file);
    
        try {
            const response = await axios.post(process.env.REACT_APP_BASE_URL + '/file/upload', formData);
            if (response && response.data && response.data.imagePath) {
                setImage(response.data.imagePath);
            } else {
                console.log("Image upload failed");
            }
        } catch (error) {
            console.log(error.response?.data?.message || "An error occurred during image upload");
        }
    }
    

    const uploadData = async () => {
        try {
            const response = await axios.post(process.env.REACT_APP_BASE_URL + '/uploadLiveEvents', { email: loginInfo.email,image: image,eventType:eventType,start:start ,heading: heading, description:description, date:date,fees:fees });
            alert("Event Info added successfully..!!");
        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    const handleUploadButtonClick = async () => {
        await handleUpload(); // Upload image first
        uploadData(); // Don't call uploadData here, it should only be called when the user clicks the upload button
    }
    
    return (
        <>
            <div className="container">
                <h1 className="heading">Upload Events Page</h1>
                <div className="box-container UploadContainer">
                    <div className="box">                  
                        <input type="file" onChange={handleFileChange} /><br />
                        <input type='text' placeholder='Enter Event type' name='eventType' onChange={(e) => { setEventType(e.target.value) }} /><br />
                        <input type='text' placeholder='Event will starts in' name='start' onChange={(e)=>{setStart(e.target.value)}}/><br />
                        <input type='text' placeholder='Enter Event Heading' name='heading' onChange={(e)=>{setHeading(e.target.value)}}/><br />
                        <input type='text' placeholder='Enter Event Description' name='description' onChange={(e) => { setDescription(e.target.value) }} /><br />
                        <input type='date' placeholder='Enter Event Date' name='date' onChange={(e) => { setDate(e.target.value) }} /><br />
                        <input type='text' placeholder='Enter Event Charges' name='fees' onChange={(e)=>{setFees(e.target.value)}}/><br />
                        
                        <button onClick={handleUploadButtonClick}>Upload</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddLiveEvents;
