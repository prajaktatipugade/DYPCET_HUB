import React, {  useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../../config/Context";

const AddGallery = () => {

    const [file, setFile] = useState();
    const [image, setImage] = useState(undefined);

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
            const response = await axios.post(process.env.REACT_APP_BASE_URL + '/uploadGallery', { email: loginInfo.email, image: image });
            alert("Gallery Info added successfully..!!");
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
                <h1 className="heading">Upload Gallery Page</h1>
                <div className="box-container UploadContainer">
                    <div className="box">                  
                        <input type="file" onChange={handleFileChange} /><br />
                        
                        <button onClick={handleUploadButtonClick}>Upload</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddGallery;
