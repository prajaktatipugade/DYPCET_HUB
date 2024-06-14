
import logo from '../Images/logoo.png';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import axios from "axios"

function ForgotPassSub() {

    // const [keys, setKeys] = useState({ code: " " });
    const navigate = useNavigate();
    const { id, token } = useParams();

    const [pass, setPass] = useState("");
    const [cpass, setCpass] = useState("");
    const [validationMessage, setValidationMessage] = useState("");

    async function AdminFunc() { 
        if (pass !== cpass) {
            setValidationMessage("Passwords do not match");
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(pass)) {
            setValidationMessage("Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long");
            return;
        }

        try {
            const res = await axios.post(process.env.REACT_APP_BASE_URL + `/reset_pass/${id}/${token}`, { pass });
            console.log(res.data);
            navigate('/subAdminAuth');
        } catch (error) {
            console.log(error);
        }
    }

  

    return (
        <div>
            <div className='MainContainerLogin'>
                <div className='ContainerBoxLogin'>
                    <img src={logo} alt='logo' />
                    <div className='LoginContainer AdminBox subAdminBox'>
                        {/* <form onSubmit={handleSubmit}> */}

                            <h4>Forgot Password</h4>

                        <div className="input">
                        <input type="password" name="newPassword"  required title="New Password" placeholder='New Password' onChange={ (e)=>setPass(e.target.value)}
                                />
                                <input type="password" name="conPass" id="Code" required title="Confirm Password" placeholder='Confirm Password' onChange={ (e)=>setCpass(e.target.value)}
                            />
                         {validationMessage && <p className="validation-message">{validationMessage}</p>}
                       
                            </div>
                        <input type="submit" value="Set Password" onClick={AdminFunc} className="login-btn" />
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ForgotPassSub;