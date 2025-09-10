import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from "react";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 576);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleHamburgerClick = () => {
    // Only open sidebar on mobile
    if (isMobile) {
      setSidebarOpen(true);
    }
  };

  const handleSidebarClose = () => {
    // Only close sidebar on mobile
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      <Header onHamburgerClick={handleHamburgerClick} />
      <div className="d-flex dashboard-layout-wrapper">
        <Sidebar 
          isOpen={isMobile ? sidebarOpen : true} 
          onClose={handleSidebarClose} 
        />
        <main className="main-content flex-grow-1" style={{ background: '#f8f9fa' }}>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
