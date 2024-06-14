
import logo from '../Images/logoo.png';
import { useState } from 'react';

import axios from "axios"

function EmailSub() {

  


    const [email, setEmail] = useState("");

    async function AdminFunc() {
        try {
            const response = await axios.post(process.env.REACT_APP_BASE_URL + "/verify_email", { email });
            console.log(response.data);
            alert("Email sent..!!");
            
        } catch (error) {
            console.error(error);
            // Display error message to the user
            alert("Failed to verify email. Please try again later.");
        }
    }
    
  

    return (
        <div>
            <div className='MainContainerLogin'>
                <div className='ContainerBoxLogin'>
                    <img src={logo} alt='logo' />
                    <div className='LoginContainer AdminBox '>
                        {/* <form onSubmit={handleSubmit}> */}

                            <h4>Verify Email</h4>

                        <div className="input">
                        <input type="email" name="email"  required title="email" placeholder='enter email' onChange={ (e)=>setEmail(e.target.value)}
                                />
                                
                            </div>
                        <input type="submit" value="Verify Email" onClick={AdminFunc} className="login-btn" />
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
export default EmailSub;