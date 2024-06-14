
import logo from '../Images/logoo.png';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { Context } from '../../config/Context';
function SubAdminAuth() {

    // const [keys, setKeys] = useState({ code: " " });
    const navigate = useNavigate();
   


    function backFun() {
        navigate('/subAdminEntryPage');
    }

    const [username, setUsername] = useState("admin");
    const [code, setCode] = useState("");
    const [email, setEmail] = useState("");
    const {loginInfo ,setLoginInfo} = useContext(Context);

    async function AdminFunc() { 
        
        await axios.post(process.env.REACT_APP_BASE_URL + "/subAdminLogin", { email, password:code }).then((res) => { 
            //console.log(res?.data);
            setLoginInfo({email: res.data.Email, id: res.data._id});
            navigate('/subAdminPanel');
        }).catch((error) => { 
            console.log(error);
        })
    }

    function handlePassword() {
        navigate("/EmailSub");
    }

    return (
        <div>
            <div className='MainContainerLogin'>
                <div className='ContainerBoxLogin'>
                    <img src={logo} alt='logo' />
                    <div className='LoginContainer AdminBox subAdminBox'>
                        {/* <form onSubmit={handleSubmit}> */}

                            <h4>Sub Administrator User</h4>

                        <div className="input">
                        <input type="email" name="email" id="email" required title="Please enter your email here" placeholder='email' onChange={ (e)=>setEmail(e.target.value)}
                                />
                                <input type="password" name="code" id="Code" required title="Please enter your key here" placeholder='Secret Key' onChange={ (e)=>setCode(e.target.value)}
                            />
                            <div className='forgot_pass' onClick={handlePassword}><a >Reset password?</a></div>
                            </div>
                        <input type="submit" value="Verify" onClick={AdminFunc} className="login-btn" />
                        <input type="submit" value="Back" onClick={backFun} className="login-btn" />
                        {/* </form> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SubAdminAuth;