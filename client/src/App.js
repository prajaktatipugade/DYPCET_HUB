import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import CenAdminAuth from './Components/CentralizedAdmin/AdminAuth';
import RequestForm from './Components/SubAdmin/ReqForm';
import CenAdminHome from './Components/CentralizedAdmin/CenAdminClubReq';
import Event from './Components/HomePage/Event';
import AdminPanel from './Components/CentralizedAdmin/CenAdminHome';
import MainHome from './Components/HomePage/MainHome';
import ClubsCard from './Components/HomePage/clubsCard';
import SubAdminPanel from './Components/SubAdmin/HomePage/SubAdminHomePage';
import { Navbar_b } from './Components/ClubWebsite/Navbar';
import Gallery from './Components/ClubWebsite/Gallery';
import EventSlider from './Components/ClubWebsite/EventSlider';
import About from './Components/ClubWebsite/About';
import TeamCoding from './Components/ClubWebsite/TeamCoding';
import Vision from './Components/ClubWebsite/Vision';
import AddAboutUs from './Components/SubAdmin/HomePage/addAbout';
import ClubHome from './Components/ClubWebsite/Home';
import SubAdminAuth from './Components/SubAdmin/SubAdminAuth';
import SubAdminEntryPage from './Components/SubAdmin/SubAdminEntryPage';
import ForgotPassSub from './Components/SubAdmin/ForgotPassSubAdmin';
import EmailSub from './Components/SubAdmin/emailVerification';
import AppContext from './config/Context';
import ClubHomePage from './Components/ClubWebsite/ClubHome';


function App() {
  return (
    <BrowserRouter basename="/DYCPCETclubs">
      <AppContext>
      <Routes>
      <Route path='/' element={<MainHome/>}/>
        <Route path='/CenAdminAuth' element={<CenAdminAuth />} />
        <Route path='/reqform' element={<RequestForm />} />
        <Route path='/CenAdminHomePage' element={<CenAdminHome />} />
        <Route path='/events' element={<Event />} />
        <Route path='/adminPanel' element={<AdminPanel />} />
        <Route path='/clubCards' element={<ClubsCard />} />
        <Route path='/subAdminPanel' element={<SubAdminPanel />} />
        <Route path='/navbar' element={<Navbar_b />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/eventSlider' element={<EventSlider />} />
        <Route path='/about' element={<About />} />
        <Route path='/teamCoding' element={<TeamCoding />} />
        <Route path='/vision' element={<Vision />} />
        <Route path='/addAboutUs' element={<AddAboutUs />} />
        <Route path='/clubHome/:id' element={<ClubHome />} />
        <Route path='/subAdminAuth' element={<SubAdminAuth />} />
        <Route path='/subAdminEntryPage' element={<SubAdminEntryPage />} />
        <Route path='/ForgotPassSub/:id/:token' element={<ForgotPassSub /> }/>
          <Route path='/EmailSub' element={<EmailSub />} />
          <Route path='/ClubHomePage/:id' element={<ClubHomePage />} />
      </Routes>
      </AppContext>
    </BrowserRouter>
  );
}

export default App;
