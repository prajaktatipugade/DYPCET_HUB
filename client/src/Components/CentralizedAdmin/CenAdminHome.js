import React, { useState } from 'react';
import './CenAdminHome.css'; // Import CSS for styling
import CenAdminHome from './CenAdminClubReq'; // Import ClubRequestForm component
import LiveEventReq from './CenAdminLiveEvents';
import { useNavigate } from 'react-router-dom';
import Dashbord from './Dashbord';

const AdminPanel = () => {
  const [selectedNavItem, setSelectedNavItem] = useState('Dashboard'); // State to track selected navigation item
  const navigate = useNavigate();

  // Define navigation items
  const navItems = ['Dashboard', 'Club Request', 'Live Events', 'Logout'];

  // Function to handle click on navigation items
  const handleNavItemClick = (item) => {
    setSelectedNavItem(item);
    // You can perform additional actions here, such as loading corresponding content for the selected item
  };

  // Function to render component based on selectedNavItem
  const renderComponent = () => {
    switch (selectedNavItem) {
      case 'Club Request':
        return <CenAdminHome />;
      case 'Dashboard':
        return <Dashbord/>;
      case 'Live Events':
        return <LiveEventReq />;
      case 'Logout':
        return navigate("/");
      default:
        return <h2>{selectedNavItem}</h2>;
    }
  };

  return (
    <div className="admin-panel">
      <div className="sidebar">
        <div className="logo">
          Centralized Admin 
        </div>
        <ul className="nav-items">
          {navItems.map((item, index) => (
            <li
              key={index}
              className={selectedNavItem === item ? 'active' : ''}
              onClick={() => handleNavItemClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="content">
        {/* Render component based on selectedNavItem */}
        {renderComponent()}
      </div>
    </div>
  );
};

export default AdminPanel;
