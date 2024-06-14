import { useState } from 'react'
import './ReqForm.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import SubAdminPanel from './HomePage/SubAdminHomePage'

import logo from '../Images/logoo.png';

export default function RequestForm() {

    const navigate = useNavigate();
    const [values, setValues] = useState({
        Name: '',
        Email:'',
        ClubName: '',
        ClubMotive:'',
        department: '',
        working:''
    })

    const onhandleChange = (e) => {
        setValues({...values, [e.target.name]:[e.target.value]})
    }

    function handleback() {
        navigate('/subAdminEntryPage');
    }

    async function handleSubmit() {
        await axios.post(process.env.REACT_APP_BASE_URL + "/ClubRequestForm", { Name:values.Name[0], Email: values.Email[0], ClubName:values.ClubName[0], ClubMotive:values.ClubMotive[0], department: values.department[0], working: values.working[0] }).then((res)=>{
            console.log(res?.data);
            alert("Form submitted successfully!");
            navigate('/subAdminEntryPage');
        })
            .catch((err) => {
                alert("An error occurred while submitting the form.");
                console.log(err);
        })
    }

    return (

        <>
            <div className='MainContainerLogin'>
                <div className='ContainerBoxLogin subAdminReqFormBox'>
                    <img src={logo} alt='logo' />
                    <div className='LoginContainer AdminBox subAdminReqForm'>
                        {/* <form onSubmit={handleSubmit}> */}

                        <h4>Want to start new Club?</h4>
                        <div className="input">
                        <input type="text" name='Name' placeholder="Enter Name" onChange={onhandleChange}/>
                        <input type="email" name='Email' placeholder="Enter Email" onChange={onhandleChange}/>
                <input type="text" name='ClubName' placeholder="Club Name" onChange={onhandleChange}/>
                <input type="text" name='ClubMotive' placeholder="Club Motive" onChange={onhandleChange}/>
                <input type="text" name='department' placeholder="Under which Department" onChange={onhandleChange}/>
                            <input type="textarea" name='working' placeholder="How it will work?" onChange={onhandleChange} className='textarea'/>
                            </div>
                        <button onClick={handleSubmit} className="login-btn" >Submit</button>
                        <button onClick={handleback} className="login-btn" >Back</button>
                        {/* </form> */}
                    </div>
                </div>
            </div>
        
{/*        
        <div className="container">
        <h1 className="heading">Want to start new Club</h1>
        <div className="box-container UploadContainer">
            <div className="box">
                <input type="text" name='Name' placeholder="Enter Name" onChange={onhandleChange}/><br/>
                <input type="email" name='Email' placeholder="Enter Email" onChange={onhandleChange}/><br/>
                <input type="text" name='ClubName' placeholder="Club Name" onChange={onhandleChange}/><br/>
                <input type="text" name='ClubMotive' placeholder="Club Motive" onChange={onhandleChange}/><br/>
                <input type="text" name='department' placeholder="Under which Department" onChange={onhandleChange}/><br />
                <input type="textarea" name='working' placeholder="How it will work?" onChange={onhandleChange}/><br/>
                <button onClick={handleSubmit}>Submit</button>
            
                </div>
        </div>
            </div> */}
            
            </>
    )
}