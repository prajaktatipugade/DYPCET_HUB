import React, { useState } from 'react'
import Event from './Event';
import './Home.css';
import Button from 'react-bootstrap/Button';
import {  useNavigate } from 'react-router-dom';
import ClubsCard from './clubsCard';
import Footer from './Footer/Footer'
import  { useEffect, useRef } from 'react';
import axios from 'axios';

function MainHome() {
  
  const navigate = useNavigate();
  function CenAdmin() {
    navigate('/CenAdminAuth');
  }
  function ClubAdmin() {
    navigate('/subAdminEntryPage');
  }

  const [clubs, setClubs] = useState(undefined);

  async function getAllClubDetails(){
    await axios.get(process.env.REACT_APP_BASE_URL+'/clubs').then(res=>{
      setClubs(res.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  useEffect(()=>{
    getAllClubDetails();
  }, [])

  const observer = useRef(null);

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        } else {
          entry.target.classList.remove('show');
        }
      });
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.current.observe(el));

    // Cleanup function to unobserve elements
    return () => {
      hiddenElements.forEach((el) => observer.current.unobserve(el));
    };
  }, []);
  return (
    <div className='comcontainer'>
      <div className='HomeContainer'>
      <div className='comcontainer1'>

        <div class="navbar ">
          <div class="nav-logo1" style={{ color: 'white' }}>
            <h2>&nbsp; &nbsp;DYPCETHub</h2>
          </div>

          <div class="center-nav">
            <li><a href="#" class="scroll-link" data-scroll-to="0">Home</a></li>
            <li><a href="#" class="scroll-link" data-scroll-to="800">About</a></li>
              <li><a href="#" class="scroll-link" data-scroll-to="800">Contact us</a></li>
              <li><a href="#" class="scroll-link" data-scroll-to="800" onClick={CenAdmin}>Centralized Admin</a></li>
              <li><a href="#" class="scroll-link" data-scroll-to="800" onClick={ClubAdmin}>Club Admin</a></li>
          </div>
        </div>
        <div className='homepage hidden'>
          <center><h1 className='headding ' >Discover Great Clubs</h1><br></br>
            <h2 className='homepage-secound' style={{ color: 'white', fontSize: '50px' }}>Explore,  Engage,  Excel</h2><br></br>
            <h2 className='hedinfo' style={{ color: 'white', fontSize: '20px' }}> Uncover exciting opportunities, connect with like-minded peers, and enhance your college experience with diverse activities</h2>
          </center>
        </div>

      </div>

      <div className='eventcontainer hidden'>
        <center><h1 className='cardheadding' style={{ fontSize: '65px' }}>Upcoming Events</h1><br></br></center>

        <Event />
        </div>
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        <center><div className='cardscontainer hidden '>
          
        <center><h1 className='cardheadding' style={{ fontSize: '65px',color:'white' }}>DYPCET Clubs</h1><br></br></center>
        {
        clubs ?
        <div className="container" >
                <div className="row">
                  
          {
            clubs.map(club=>(
              <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4'>
                {console.log(club)}
                <ClubsCard ClubName={club.ClubName} ClubMotive={club.ClubMotive} key={club._id} id={club._id} />
              </div>
                
            ))
                    }
                 
</div>
        </div>
        :
        <></>
      }
      </div></center>
      <div className='addClubasAdmin hidden' ><center><h1>Want to start or add your Club? </h1><a href="#" data-scroll-to="0" onClick={CenAdmin}>Register here</a></center> </div>
      <div className='footercontainer hidden'><Footer/></div>
      </div>
      


      
      
 </div>
   
  )
}

export default MainHome



