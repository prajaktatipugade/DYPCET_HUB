import React, { useState } from 'react';
import AddAboutUs from './addAbout';
import AddEvents from './addEvents';
import AddGallery from './addGallery';
import AddMembers from './addMembers';
import AddLiveEvents from './addLiveEvents';
import { useNavigate } from 'react-router-dom';
 // Import ClubRequestForm component

const SubAdminPanel = () => {
  const [selectedNavItem, setSelectedNavItem] = useState('Dashboard'); // State to track selected navigation item

  // Define navigation items
  const navItems = ['Add About Us', 'Add Events', 'Add Gallery', 'Add Members', 'Add Live Events', 'Logout'];
  
  const navigate = useNavigate();

  // Function to handle click on navigation items
  const handleNavItemClick = (item) => {
    setSelectedNavItem(item);
    // You can perform additional actions here, such as loading corresponding content for the selected item
  };

  // Function to render component based on selectedNavItem
  const renderComponent = () => {
    switch (selectedNavItem) {
      case 'Add Events':
        return <AddEvents/>;
      case 'Add About Us':
        return <AddAboutUs/>;
      case 'Add Gallery':
        return <AddGallery />
        case 'Add Members':
        return <AddMembers />
      case 'Add Live Events':
        return <AddLiveEvents/>
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
          Admin Panel
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

export default SubAdminPanel;
