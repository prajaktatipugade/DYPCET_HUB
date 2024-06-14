import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../Images/cc.png';
import { Link } from 'react-router-dom';


export const Navbar_b = ({ id }) => {
    return (
       
        
        <Navbar expand="lg" className="bg-body-tertiary sticky-top">
            <Container fluid>
                <Navbar.Brand as={Link} to={`/ClubHomePage/${id}`}><img src={logo} style={{
                    height: '50px',
                    borderRadius: '5px'
                }} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <div className='list'><Nav.Link as={Link} to={`/clubHome/${id}`}>Home</Nav.Link></div>
                        
                        <Nav.Link as={Link} to={"/about"}>About us</Nav.Link>
                        <Nav.Link as={Link} to={"/teamCoding"}>Members</Nav.Link>
                        <Nav.Link as={Link} to={"/eventSlider"}>Events</Nav.Link>
                        <Nav.Link as={Link} to={"/gallery"}>Gallery</Nav.Link>
                       
                        <Nav.Link as={Link} to={"/"}>Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}