import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import MainContent from '../MainContent';

// Company Accordion Content Component
export const CompanyAccordionContent = ({ items, openItemId, setOpenItemId, renderItemContent, emptyMessage, onAddClick, addButtonText }) => {
  return (
    <div>
      <div className="company-accordion-header-row">
        <div className="company-accordion-header-title">
          {addButtonText ? addButtonText.split(' ')[1] : 'Items'} {/* Extract type from button text */}
        </div>
        {onAddClick && (
          <button 
            className="company-accordion-add-button" 
            onClick={onAddClick}
          >
            {addButtonText || 'Add Item'}
          </button>
        )}
      </div>
      {items.length === 0 ? (
        <div className="company-accordion-empty">{emptyMessage}</div>
      ) : (
        <div className="company-accordion-content">
          {items.map((item) => (
            <div key={item.id} className="company-accordion-item">
              <div
                className="company-accordion-header"
                onClick={() => setOpenItemId(openItemId === item.id ? null : item.id)}
              >
                <div className="company-accordion-title-group">
                  <div className="company-accordion-title">
                    {item.title || item.subject || item.summary || item.content}
                  </div>
                  {openItemId !== item.id && item.preview && (
                    <div className="company-accordion-preview">
                      {item.preview}
                    </div>
                  )}
                </div>
                <div className="company-accordion-date">
                  {item.date ? new Date(item.date).toLocaleString(undefined, { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric', 
                    hour: 'numeric', 
                    minute: '2-digit' 
                  }) : ''}
                </div>
                <FontAwesomeIcon
                  icon={openItemId === item.id ? faChevronDown : faChevronRight}
                  className="company-accordion-chevron"
                />
              </div>
              {openItemId === item.id && (
                <div className="company-accordion-body">
                  {renderItemContent(item)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Company Activity Content Component for sectioned structure
export const CompanyActivityContent = ({ activityData, openItemId, setOpenItemId, renderItemContent }) => {
  const formatDate = (date, isOverdue = false) => {
    const formattedDate = new Date(date).toLocaleString(undefined, { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric', 
      hour: 'numeric', 
      minute: '2-digit' 
    });
    
    if (isOverdue) {
      return `overdue: ${formattedDate}`;
    }
    return formattedDate;
  };

  const renderTitle = (item) => {
    // For June 2025, bold specific titles or prefixes
    if (item.title) {
      if (item.title.startsWith('Call ')) {
        return <><strong>Call</strong>{item.title.slice(4)}</>;
      }
      if (item.title.startsWith('Note by ')) {
        const authorName = item.title.replace('Note by ', '');
        return <><strong>Note</strong> by <strong>{authorName}</strong></>;
      }
      if (item.title === 'Email tracking' || item.title === 'Meeting Maria Johnson and Jane Cooper') {
        return <strong>{item.title}</strong>;
      }
      if (item.title.startsWith('Task assigned to ')) {
        const assigneeName = item.title.replace('Task assigned to ', '');
        return <><strong>Task</strong> assigned to <strong>{assigneeName}</strong></>;
      }
      if (item.title.startsWith('Meeting ')) {
        const attendees = item.title.replace('Meeting ', '');
        return <><strong>Meeting</strong> <strong>{attendees}</strong></>;
      }
    }
    return item.title;
  };

  const renderSubheading = (item) => {
    if (item.type === 'Call' && item.summary) return <div className="company-activity-subheading">{item.summary}</div>;
    if (item.type === 'Meeting' && item.description) return <div className="company-activity-subheading">{item.description}</div>;
    if (item.type === 'Email' && (item.description || item.body)) return <div className="company-activity-subheading">{item.description || item.body}</div>;
    if (item.type === 'Note' && item.description) return <div className="company-activity-subheading">{item.description}</div>;
    return null;
  };

  return (
    <div className="company-activity-content">
      {/* Upcoming Section */}
      {activityData.upcoming && activityData.upcoming.length > 0 && (
        <div className="company-activity-section">
          <div className="company-activity-section-title">Upcoming</div>
          <div className="company-activity-section-content">
            {activityData.upcoming.map((item) => (
              <div key={item.id} className="company-activity-item">
                <div
                  className="company-activity-header"
                  onClick={() => setOpenItemId(openItemId === item.id ? null : item.id)}
                >
                   <FontAwesomeIcon
                    icon={openItemId === item.id ? faChevronDown : faChevronRight}
                    className="company-activity-chevron pe-2"
                  />
                  <div className="company-activity-content-wrapper">
                 
                    <div className="company-activity-title">
                      {renderTitle(item)}
                    </div>
                    {item.subTitle && (
                      <div className="company-activity-subtitle">
                        {item.subTitle}
                      </div>
                    )}
                  </div>
                  <div className={`company-activity-date ${item.isOverdue ? 'overdue' : ''}`}>
                    {formatDate(item.date, item.isOverdue)}
                  </div>
                 
                </div>
                {openItemId === item.id && (
                  <div className="company-activity-body">
                    {renderItemContent(item)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Monthly Sections */}
      {Object.keys(activityData)
        .filter(key => key !== 'upcoming')
        .sort((a, b) => {
          // Sort months by date in descending order (latest first)
          const monthA = new Date(a + ' 1, 2025');
          const monthB = new Date(b + ' 1, 2025');
          return monthB - monthA; // Descending order
        })
        .map((month) => (
        <div key={month} className="company-activity-section">
          <div className="company-activity-section-title">{month}</div>
          <div className="company-activity-section-content">
            {activityData[month].map((item) => (
              <div key={item.id} className="company-activity-item">
                <div
                  className="company-activity-header"
                  onClick={() => setOpenItemId(openItemId === item.id ? null : item.id)}
                >
                  <div className="company-activity-content-wrapper">
                    <div className="company-activity-title">
                      {renderTitle(item)}
                    </div>
                    {renderSubheading(item)}
                    {item.subTitle && (
                      <div className="company-activity-subtitle">
                        {item.subTitle}
                      </div>
                    )}
                  </div>
                  <div className={`company-activity-date ${item.isOverdue ? 'overdue' : ''}`}>
                    {formatDate(item.date, item.isOverdue)}
                  </div>
                  <FontAwesomeIcon
                    icon={openItemId === item.id ? faChevronDown : faChevronRight}
                    className="company-activity-chevron"
                  />
                </div>
                {openItemId === item.id && (
                  <div className="company-activity-body">
                    {renderItemContent(item)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const CompanyMainContent = ({ 
  selectedTab, 
  setSelectedTab, 
  tabList, 
  tabContent, 
  openItemId, 
  setOpenItemId,
  searchTerm,
  setSearchTerm
}) => {
  return (
    <MainContent 
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}
      tabList={tabList}
      tabContent={tabContent}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
    />
  );
};

export default CompanyMainContent;