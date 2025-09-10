import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronRight,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

const CompanyLeftPanel = ({ companyData, onOpenModal, onEditCompany }) => {
  const navigate = useNavigate();
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(true);
  const [copied, setCopied] = useState(false);

  const toggleDetails = () => {
    setIsDetailsExpanded(!isDetailsExpanded);
  };

  const handleCopyDomain = () => {
    navigator.clipboard.writeText(companyData.domain);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const handleDomainClick = () => {
    // Open domain in new tab
    window.open(`https://${companyData.domain}`, '_blank');
  };

  const showInteractionPopup = (type, additionalData = {}) => {
    if (onOpenModal) {
      onOpenModal(type);
    }
  };

  const handleEditCompany = () => {
    if (onEditCompany) {
      onEditCompany(companyData);
    }
  };

  return (
    <div className="company-left-panel-container">
      {/* Back Navigation */}
      <span
        className="company-back-btn"
        onClick={() => navigate('/companies')}
        style={{ cursor: "pointer" }}
      >
        &lt; Companies
      </span>
      <div className="d-flex align-items-center gap-3 mt-3 mb-3">
        <div className="company-avatar">{companyData.name.charAt(0)}</div>
        <div>
          <h5 className="mb-0">{companyData.name}</h5>
          <div className="text-muted">{companyData.industry}</div>
          <div className="d-flex align-items-center gap-2">
            <span
              className="domain-text domain-link"
              onClick={handleDomainClick}
              style={{ cursor: "pointer" }}
            >
              {companyData.domain}
            </span>
            <i
              className="bi bi-copy copy-icon"
              onClick={handleCopyDomain}
              title={copied ? "Copied!" : "Copy domain"}
              style={{ cursor: "pointer" }}
            ></i>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons d-flex justify-content-between">
        <div className="action-item d-flex flex-column align-items-center">
          <button className="btn" onClick={() => showInteractionPopup("Note")}> 
            <i className="bi bi-pencil-square"></i>
          </button>
          <div className="action-label">Note</div>
        </div>
        <div className="action-item d-flex flex-column align-items-center">
          <button className="btn" onClick={() => showInteractionPopup("Email")}>
            <i className="bi bi-envelope"></i>
          </button>
          <div className="action-label">Email</div>
        </div>
        <div className="action-item d-flex flex-column align-items-center">
          <button className="btn" onClick={() => showInteractionPopup("Call", { phoneNumber: companyData.phone })}> 
            <i className="bi bi-telephone"></i>
          </button>
          <div className="action-label">Call</div>
        </div>
        <div className="action-item d-flex flex-column align-items-center">
          <button className="btn" onClick={() => showInteractionPopup("Task")}> 
            <i className="bi bi-check-square"></i>
          </button>
          <div className="action-label">Task</div>
        </div>
        <div className="action-item d-flex flex-column align-items-center">
          <button className="btn" onClick={() => showInteractionPopup("Meeting")}>
            <i className="bi bi-calendar"></i>
          </button>
          <div className="action-label">Meeting</div>
        </div>
      </div>

      {/* About this Company Section */}
      <div
        className="company-details__section-title"
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div
          onClick={toggleDetails}
          style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1 }}
        >
          <FontAwesomeIcon
            icon={isDetailsExpanded ? faChevronDown : faChevronRight}
            className="company-details__toggle-icon"
          />
          <span>About this Company</span>
        </div>
        <FontAwesomeIcon
          icon={faPenToSquare}
          className="action-icon"
          style={{
            color: "blue",
            cursor: "pointer",
            fontSize: "16px",
            transition: "transform 0.2s, color 0.2s",
            marginLeft: "10px",
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleEditCompany();
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "scale(1.1)";
            e.target.style.color = "#0056b3";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.color = "blue";
          }}
        />
      </div>

      {/* Company Details */}
      {isDetailsExpanded && (
        <div className="company-details__fields">
          <div className="company-details__field">
            <div className="company-details__field-label">Company Domain Name</div>
            <div className="company-details__field-value">{companyData.domain}</div>
          </div>
          <div className="company-details__field">
            <div className="company-details__field-label">Company Name</div>
            <div className="company-details__field-value">{companyData.name}</div>
          </div>
          <div className="company-details__field">
            <div className="company-details__field-label">Industry</div>
            <div className="company-details__field-value">{companyData.industry}</div>
          </div>
          <div className="company-details__field">
            <div className="company-details__field-label">Phone Number</div>
            <div className="company-details__field-value">{companyData.phone}</div>
          </div>
          <div className="company-details__field">
            <div className="company-details__field-label">Company Owner</div>
            <div className="company-details__field-value">{companyData.owner}</div>
          </div>
          <div className="company-details__field">
            <div className="company-details__field-label">City</div>
            <div className="company-details__field-value">{companyData.city}</div>
          </div>
          <div className="company-details__field">
            <div className="company-details__field-label">Country/Region</div>
            <div className="company-details__field-value">{companyData.country}</div>
          </div>
          <div className="company-details__field">
            <div className="company-details__field-label">No of Employees</div>
            <div className="company-details__field-value">{companyData.employees}</div>
          </div>
          <div className="company-details__field">
            <div className="company-details__field-label">Annual Revenue</div>
            <div className="company-details__field-value">{companyData.revenue}</div>
          </div>
          <div className="company-details__field">
            <div className="company-details__field-label">Created Date</div>
            <div className="company-details__field-value">{companyData.created}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyLeftPanel;