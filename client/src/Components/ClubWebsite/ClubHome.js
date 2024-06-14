import axios from "axios";
import ClubHome from "./Home";
import { useContext, useEffect } from "react";
import { Navbar_b } from "./Navbar";
import { useParams } from "react-router-dom";
import { Context } from "../../config/Context";

const ClubHomePage = () => {

    const { id } = useParams();
   
    const { email, setEmail } = useContext(Context);
    async function getAllClubDetails() {
        try {
            const res = await axios.post(process.env.REACT_APP_BASE_URL + '/clubDetails', { id });
            setEmail(res.data.Email);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllClubDetails();
    }, []);
    return (
        <>
           

            <ClubHome/>
      
        </>
);
}
export default ClubHomePage;
