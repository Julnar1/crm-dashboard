import React from "react";

export default function MainContent({
  selectedTab,
  setSelectedTab,
  tabList,
  tabContent,
  searchTerm,
  setSearchTerm,
}) {
  return (
    <div className="company-main">
      <div className="company-main__search-container">
        <div className="company-main__search-bar">
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search activities"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="company-main__tabs-wrapper">
          <div className="company-main__tabs">
            {tabList.map((tab) => (
              <div
                key={tab}
                className={`company-main__tab ${
                  selectedTab === tab ? "company-main__tab--active" : ""
                }`}
                onClick={() => setSelectedTab(tab)}
              >
                {tab}
              </div>
            ))}
          </div>
          <div className="company-main__tab-content">
            {tabContent[selectedTab]}
          </div>
        </div>
      </div>
    </div>
  );
}
