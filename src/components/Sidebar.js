import React from "react";
import { NavLink } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import {
  IoPeopleOutline,
  IoBagHandleOutline,
  IoBagCheckOutline,
} from "react-icons/io5";
import { BsTicket } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import "../styles/_layout.scss";

const Sidebar = ({ isOpen, onClose }) => {
  const navItems = [
    { to: "/", icon: <LuLayoutDashboard size="1.5em" />, label: "Dashboard" },
    { to: "/leads", icon: <IoPeopleOutline size="1.5em" />, label: "Leads" },
    {
      to: "/companies",
      icon: <IoBagHandleOutline size="1.5em" />,
      label: "Companies",
    },
    {
      to: "/deals",
      icon: <IoBagCheckOutline size="1.5em" />,
      label: "Deals",
    },
    {
      to: "/tickets",
      icon: <BsTicket size="1.5em" />,
      label: "Tickets",
    },
  ];

  // Check if we're on mobile
  const isMobile = window.innerWidth < 576;

  return (
    <>
      {/* Sidebar */}
      <aside className={`sidebar${isOpen ? " sidebar--open" : ""}`}>
        {/* Close button for mobile only */}
        {isMobile && (
          <button
            className="sidebar__close"
            aria-label="Close sidebar"
            onClick={onClose}
          >
            <IoClose size="1.5em" />
          </button>
        )}
        <ul className="sidebar__nav">
          {navItems.map(({ to, icon, label }) => (
            <li className="sidebar__item" key={to}>
              <NavLink
                to={to}
                aria-label={`Navigate to ${label}`}
                className="sidebar__link"
                onClick={isMobile ? onClose : undefined}
              >
                {({ isActive }) => (
                  <>
                    <div className={`sidebar__icon ${isActive ? 'sidebar__icon--active' : ''}`}>
                      {icon}
                    </div>
                    <span className="sidebar__label">
                      {label}
                    </span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>

      {/* Overlay for mobile only */}
      {isMobile && isOpen && (
        <div className="sidebar__overlay" onClick={onClose} />
      )}
    </>
  );
};

export default Sidebar;
