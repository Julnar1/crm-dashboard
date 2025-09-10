import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch,faBars} from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";

const Header = ({ onHamburgerClick }) => {
  return (
    <nav className="header">
      {/* Hamburger Menu - Mobile Only */}
      <button
        className="header__hamburger"
        aria-label="Open sidebar"
        onClick={onHamburgerClick}
      >
        <FontAwesomeIcon icon={faBars} size="lg" />
      </button>

      {/* Logo */}
      <h1 className="header__logo">
        CRM
      </h1>

      {/* Search and Actions */}
      <div className="header__actions">
        <div className="header__search input-group me-3">
          <span className="input-group-text bg-white border-end-0">
            <FontAwesomeIcon icon={faSearch} className="text-muted" />
          </span>
          <input
            type="text"
            className="form-control border-start-0 focus-ring-light"
            placeholder="Search"
            aria-label="Search input"
          />
        </div>

        {/* Notification Bell */}
        <div className="header__notification me-3">
          <FontAwesomeIcon
            icon={faBell}
            size="lg"
          />
        </div>

        {/* User Avatar */}
        <div className="header__avatar">
          A
        </div>
      </div>
    </nav>
  );
};

export default Header;
