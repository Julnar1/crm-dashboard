import React, { useState } from 'react';
import '../styles/_companyPage.scss';

const dummyAttendees = [
  "John Doe",
  "Jane Smith", 
  "Alex Johnson",
  "Maria Johnson",
  "Jane Cooper"
];
const dummyLocations = [
  "Conference Room A",
  "Zoom",
  "Google Meet",
  "Microsoft Teams",
  "Office Meeting Room"
];
const dummyReminders = [
  { value: "", label: "Choose" },
  { value: "5min", label: "5 minutes before" },
  { value: "15min", label: "15 minutes before" },
  { value: "30min", label: "30 minutes before" },
  { value: "1hr", label: "1 hour before" },
  { value: "1day", label: "1 day before" }
];

const CompanyMeetingDialog = ({ isOpen, onClose, onSave, companyData }) => {
  const [meetingData, setMeetingData] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    attendees: "",
    location: "",
    reminder: "",
    note: ""
  });

  const [customAttendees, setCustomAttendees] = useState("");

  const handleSave = () => {
    if (!meetingData.title.trim() || !meetingData.date || !meetingData.startTime || !meetingData.endTime || !meetingData.note.trim()) return;
    
    // Combine selected attendees with custom attendees
    let allAttendees = meetingData.attendees;
    if (customAttendees.trim()) {
      allAttendees = allAttendees ? `${meetingData.attendees}, ${customAttendees.trim()}` : customAttendees.trim();
    }

    const newMeeting = {
      id: Date.now(),
      title: meetingData.title.trim(),
      date: meetingData.date,
      startTime: meetingData.startTime,
      endTime: meetingData.endTime,
      attendees: allAttendees,
      location: meetingData.location,
      reminder: meetingData.reminder,
      note: meetingData.note.trim(),
      description: meetingData.note.trim(), // For activity tab display
      companyId: companyData?.id,
      companyName: companyData?.name,
      createdAt: new Date().toISOString()
    };
    onSave(newMeeting);
    setMeetingData({
      title: "",
      date: "",
      startTime: "",
      endTime: "",
      attendees: "",
      location: "",
      reminder: "",
      note: ""
    });
    setCustomAttendees("");
    onClose();
  };

  const handleCancel = () => {
    setMeetingData({
      title: "",
      date: "",
      startTime: "",
      endTime: "",
      attendees: "",
      location: "",
      reminder: "",
      note: ""
    });
    setCustomAttendees("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="company-meeting-modal">
      <div className="company-meeting-modal__card">
        <div className="company-meeting-modal__header">
          <span className="company-meeting-modal__title">Schedule Meeting</span>
          <button onClick={handleCancel} className="company-meeting-modal__close">×</button>
        </div>
        <div className="company-meeting-modal__body">
          <form className="company-meeting-form" onSubmit={e => { e.preventDefault(); handleSave(); }}>
            <div className="company-meeting-form__group">
              <label>Title <span className="required">*</span></label>
              <input
                type="text"
                value={meetingData.title}
                onChange={e => setMeetingData({ ...meetingData, title: e.target.value })}
                placeholder="Enter meeting title"
                required
              />
            </div>
            <div className="company-meeting-form__group">
              <label>Start Date <span className="required">*</span></label>
              <div className="company-meeting-form__input-icon">
                <input
                  type="date"
                  value={meetingData.date}
                  onChange={e => setMeetingData({ ...meetingData, date: e.target.value })}
                  required
                />
                <span className="icon-calendar" />
              </div>
            </div>
            <div className="company-meeting-form__row">
              <div className="company-meeting-form__group">
                <label>Start Time <span className="required">*</span></label>
                <div className="company-meeting-form__input-icon">
                  <input
                    type="time"
                    value={meetingData.startTime}
                    onChange={e => setMeetingData({ ...meetingData, startTime: e.target.value })}
                    required
                  />
                  <span className="icon-clock" />
                </div>
              </div>
              <div className="company-meeting-form__group">
                <label>End Time <span className="required">*</span></label>
                <div className="company-meeting-form__input-icon">
                  <input
                    type="time"
                    value={meetingData.endTime}
                    onChange={e => setMeetingData({ ...meetingData, endTime: e.target.value })}
                    required
                  />
                  <span className="icon-clock" />
                </div>
              </div>
            </div>
            <div className="company-meeting-form__group">
              <label>Attendees <span className="required">*</span></label>
              <select
                value={meetingData.attendees}
                onChange={e => setMeetingData({ ...meetingData, attendees: e.target.value })}
                required
              >
                <option value="">Choose from list</option>
                {dummyAttendees.map((a, i) => (
                  <option key={i} value={a}>{a}</option>
                ))}
              </select>
              <div style={{ marginTop: '8px' }}>
                <label style={{ fontSize: '12px', color: '#666' }}>Or add custom attendees (comma separated):</label>
                <input
                  type="text"
                  value={customAttendees}
                  onChange={e => setCustomAttendees(e.target.value)}
                  placeholder="e.g., John Doe, Jane Smith"
                  style={{ marginTop: '4px' }}
                />
              </div>
            </div>
            <div className="company-meeting-form__group">
              <label>Location</label>
              <select
                value={meetingData.location}
                onChange={e => setMeetingData({ ...meetingData, location: e.target.value })}
              >
                <option value="">Choose location</option>
                {dummyLocations.map((l, i) => (
                  <option key={i} value={l}>{l}</option>
                ))}
              </select>
            </div>
            <div className="company-meeting-form__group">
              <label>Reminder</label>
              <select
                value={meetingData.reminder}
                onChange={e => setMeetingData({ ...meetingData, reminder: e.target.value })}
              >
                {dummyReminders.map((r, i) => (
                  <option key={i} value={r.value}>{r.label}</option>
                ))}
              </select>
            </div>
            <div className="company-meeting-form__group">
              <label>Note <span className="required">*</span></label>
              <div className="company-meeting-form__note-toolbar">
                <select className="note-toolbar__select">
                  <option>Normal text</option>
                  <option>Heading</option>
                </select>
                <button type="button" className="note-toolbar__btn"><b>B</b></button>
                <button type="button" className="note-toolbar__btn"><i>I</i></button>
                <button type="button" className="note-toolbar__btn"><u>U</u></button>
                <button type="button" className="note-toolbar__btn">•</button>
                <button type="button" className="note-toolbar__btn">1.</button>
                <button type="button" className="note-toolbar__btn">🖼️</button>
              </div>
              <textarea
                value={meetingData.note}
                onChange={e => setMeetingData({ ...meetingData, note: e.target.value })}
                placeholder="Enter meeting description/notes"
                required
                rows={4}
                style={{ resize: 'vertical' }}
              />
            </div>
            <div className="company-meeting-form__actions">
              <button type="button" className="btn btn-cancel" onClick={handleCancel}>Cancel</button>
              <button
                type="submit"
                className="btn btn-save"
                disabled={!(meetingData.title && meetingData.date && meetingData.startTime && meetingData.endTime && meetingData.note)}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyMeetingDialog; 