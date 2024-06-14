import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

export default function CenAdminHome() {

  const [data, setData] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // Track email sending state
  const [submissionStatus, setSubmissionStatus] = useState(null); // Track email sending status

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_BASE_URL + "/readClubRequestForm");
        setData(response.data.response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };



    fetchData();
  }, []);

  const handleAccept = async (clubRequestForm) => {
    setIsSubmitting(true); // Set submitting state for UI feedback
    setSubmissionStatus(null); // Reset any previous status

    try {
      // Send email using server-side API (replace with your actual API endpoint)
      console.log(clubRequestForm);
      const response = await axios.post(process.env.REACT_APP_BASE_URL + '/send_club_acceptance_email', { email: clubRequestForm });

      if (response.data.success) {
        setSubmissionStatus('success');
      } else {
        setSubmissionStatus('error');
        console.error('Error sending email:', response.data.error); // Log for debugging
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }

  };


  async function acceptForm(id) {
    await axios.post(process.env.REACT_APP_BASE_URL + "/acceptClubReqForm", { id }).then(response => {
      console.log(response.data);
    }).catch(error => {
      console.log(error.data);
    })
  }

  const handleReject = async (clubRequestForm) => {
    setIsSubmitting(true); // Set submitting state for UI feedback
    setSubmissionStatus(null); // Reset any previous status

    try {
      // Send email using server-side API (replace with your actual API endpoint)
      console.log(clubRequestForm);
      const response = await axios.post(process.env.REACT_APP_BASE_URL + '/send_club_reject_email', { email: clubRequestForm });

      if (response.data.success) {
        setSubmissionStatus('success');
      } else {
        setSubmissionStatus('error');
        console.error('Error sending email:', response.data.error); // Log for debugging
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }


  };




  return (
    <div >
      <div className="container" style={{ display: 'inline-block', verticalAlign: 'top', marginRight: '10px' }}>
        <h1 className="heading">Request List</h1>
        <div className="container">
                <div className="row">
          {data?.map((ClubRequestForm, index) => {
            return <div key={index} className="col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4 ">
              
              <div className="card cardhover mt-2" >
                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                <Card.Body>
                  <Card.Title>{ClubRequestForm.Name}</Card.Title>
                  <Card.Text>
                    Email: {ClubRequestForm.Email}<br />
                    Club Name: {ClubRequestForm.ClubName} <br />
                    Club Motive: {ClubRequestForm.ClubMotive} <br />
                    Department: {ClubRequestForm.department} <br />
                    Working: {ClubRequestForm.working} <br />
                  </Card.Text>
                  <Button
                    variant="primary"
                    disabled={isSubmitting}
                    onClick={() => {
                      handleAccept(ClubRequestForm.Email);
                      acceptForm(ClubRequestForm._id);
                    }}  className="col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4 btnAccept butn"
                  >
                    {isSubmitting ? 'Sending...' : 'Accept'}
                  </Button>
                  <Button variant="danger" disabled={isSubmitting} onClick={() => handleReject(ClubRequestForm.Email)} className="col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4 butn" >{isSubmitting ? 'Sending...' : 'Reject'}</Button>
                  {submissionStatus === 'success' && <p>Email sent successfully!</p>}
                  {submissionStatus === 'error' && <p>Error sending email. Please try again.</p>}

                  </Card.Body>
                  </div>
           
            </div>
          })}
            </div>
        </div>
      </div>
    </div>
  );
}