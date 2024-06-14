
import logo from '../Images/logoo.png';
import { useNavigate } from 'react-router-dom';

function SubAdminEntryPage() {

    const navigate = useNavigate();
  
    function NewClubFun() {
        navigate('/reqform');
    }

    function LoginFun() {
        navigate('/subAdminAuth');
    }

    function backFun()
    {
        navigate('/');
    }

    return (
        <div>
            <div className='MainContainerLogin'>
                <div className='ContainerBoxLogin'>
                    <img src={logo} alt='logo' />
                    <div className='LoginContainer AdminBox'>
                        {/* <form onSubmit={handleSubmit}> */}

                            <h4>Sub Administrator User</h4>
                        <input type="submit" value="New Club Request" onClick={NewClubFun} className="login-btn" />
                        <input type="submit" value="Login to SubAdmin Panel" onClick={LoginFun} className="login-btn" />
                        <input type="submit" value="Back" onClick={backFun}  className="login-btn" />
                        {/* </form> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SubAdminEntryPage;