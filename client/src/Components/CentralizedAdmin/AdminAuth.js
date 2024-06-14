import './AdminAuth.css';
import logo from '../Images/logoo.png';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import axios from "axios"

function CenAdminAuth() {

    // const [keys, setKeys] = useState({ code: " " });
    const navigate = useNavigate();
    // const handleChange = (e) => {
    //     setKeys({
    //         ...keys,
    //         [e.target.name]: e.target.value
    //     })
    // }

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(keys);
    // }
    function BackFunc()
    {
        navigate('/');
    }
    const [username, setUsername] = useState("admin");
    const [code, setCode] = useState("");

    async function AdminFunc() { 
        await axios.post(process.env.REACT_APP_BASE_URL + "/adminAuthentication", { username, code }).then((res) => { 
            console.log(res?.data);
            navigate('/adminPanel');
        }).catch((error) => { 
            console.log(error);
        })
    }

    return (
        <div>
            <div className='MainContainerLogin'>
                <div className='ContainerBoxLogin'>
                    <img src={logo} alt='logo' />
                    <div className='LoginContainer AdminBox'>
                        {/* <form onSubmit={handleSubmit}> */}

                            <h4>Administrator User</h4>

                            <div className="input">
                                <input type="password" name="code" id="Code" required title="Please enter your key here" placeholder='Secret Key' onChange={ (e)=>setCode(e.target.value)}
                                />
                            </div>
                        <input type="submit" value="Verify" onClick={AdminFunc} className="login-btn" />
                        <input type="submit" value="Back" onClick={BackFunc}  className="login-btn" />
                        {/* </form> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CenAdminAuth;