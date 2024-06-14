import React, {  useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../../config/Context";

const AddMembers = () => {

    const [file, setFile] = useState();
    const [image, setImage] = useState(undefined);
    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [ldnLink, setLdnLink] = useState("");
    const [instaLink, setInstaLink] = useState("");

    const {loginInfo} = useContext(Context);

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
            const response = await axios.post(process.env.REACT_APP_BASE_URL + '/uploadMembers', { email: loginInfo.email, image: image, name:name, position:position, linkedlnLink: ldnLink, instaLink: instaLink });
            alert("Members added successfully..!!");
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
                <h1 className="heading">Add Members Page</h1>
                <div className="box-container UploadContainer">
                    <div className="box">                  
                        <input type="file" onChange={handleFileChange} /><br />
                        <input type='text' placeholder='Enter Member Name' name='name' onChange={(e)=>{setName(e.target.value)}}/><br />
                        <input type='text' placeholder='Enter members position' name='position' onChange={(e)=>{setPosition(e.target.value)}}/><br />
                        <input type='text' placeholder='Share linkedln profile link' name='linkedlnLink' onChange={(e) => { setLdnLink(e.target.value) }} /><br />
                        <input type='text' placeholder='Share instagram profile link' name='instaLink' onChange={(e)=>{setInstaLink(e.target.value)}}/><br />
                        <button onClick={handleUploadButtonClick}>Upload</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddMembers;
