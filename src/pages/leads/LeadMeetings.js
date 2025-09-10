import React, { useState } from "react";
import "../../styles/_leadmeetings.scss";

const dummyLocations = [
  "Conference Room A",
  "Zoom",
  "Google Meet"
];
const dummyReminders = [
  { value: "", label: "Choose" },
  { value: "5min", label: "5 minutes before" },
  { value: "15min", label: "15 minutes before" },
  { value: "1hr", label: "1 hour before" }
];

const LeadMeetings = ({ leadId, leadEmail, meetings = [], onAddMeeting, onDeleteMeeting, isOpen, onClose, onOpenModal }) => {
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

  const handleAddMeeting = () => {
    if (!meetingData.title.trim() || !meetingData.date || !meetingData.startTime || !meetingData.endTime || !meetingData.note.trim()) return;
    const newMeeting = {
      id: Date.now(),
      title: meetingData.title.trim(),
      date: meetingData.date,
      startTime: meetingData.startTime,
      endTime: meetingData.endTime,
      attendees: meetingData.attendees,
      location: meetingData.location,
      reminder: meetingData.reminder,
      note: meetingData.note.trim(),
      leadEmail: leadEmail,
      createdAt: new Date().toISOString(),
      leadId: leadId
    };
    onAddMeeting(newMeeting);
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
    if (onClose) onClose();
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
    if (onClose) onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="lead-meetings-modal">
      <div className="lead-meetings-modal__card">
        <div className="lead-meetings-modal__header">
          <span className="lead-meetings-modal__title">Schedule Meeting</span>
          <button onClick={handleCancel} className="lead-meetings-modal__close">×</button>
        </div>
        <div className="lead-meetings-modal__body">
          <form className="lead-meetings-form" onSubmit={e => { e.preventDefault(); handleAddMeeting(); }}>
            <div className="lead-meetings-form__group">
              <label>Title <span className="required">*</span></label>
              <input
                type="text"
                value={meetingData.title}
                onChange={e => setMeetingData({ ...meetingData, title: e.target.value })}
                placeholder="Enter"
                required
              />
            </div>
            <div className="lead-meetings-form__group">
              <label>Start Date <span className="required">*</span></label>
              <div className="lead-meetings-form__input-icon">
                <input
                  type="date"
                  value={meetingData.date}
                  onChange={e => setMeetingData({ ...meetingData, date: e.target.value })}
                  required
                />
                <span className="icon-calendar" />
              </div>
            </div>
            <div className="lead-meetings-form__row">
              <div className="lead-meetings-form__group">
                <label>Start Time <span className="required">*</span></label>
                <div className="lead-meetings-form__input-icon">
                  <input
                    type="time"
                    value={meetingData.startTime}
                    onChange={e => setMeetingData({ ...meetingData, startTime: e.target.value })}
                    required
                  />
                  <span className="icon-clock" />
                </div>
              </div>
              <div className="lead-meetings-form__group">
                <label>End Time <span className="required">*</span></label>
                <div className="lead-meetings-form__input-icon">
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
            <div className="lead-meetings-form__group">
              <label>Attendees <span className="required">*</span></label>
              <input
                type="text"
                value={meetingData.attendees}
                onChange={e => setMeetingData({ ...meetingData, attendees: e.target.value })}
                placeholder="Enter attendees separated by commas (e.g., John Doe, Jane Smith)"
                required
              />
            </div>
            <div className="lead-meetings-form__group">
              <label>Location</label>
              <select
                value={meetingData.location}
                onChange={e => setMeetingData({ ...meetingData, location: e.target.value })}
              >
                <option value="">Choose</option>
                {dummyLocations.map((l, i) => (
                  <option key={i} value={l}>{l}</option>
                ))}
              </select>
            </div>
            <div className="lead-meetings-form__group">
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
            <div className="lead-meetings-form__group">
              <label>Note <span className="required">*</span></label>
              <div className="lead-meetings-form__note-toolbar">
                {/* Toolbar placeholder for rich text controls */}
                <select className="note-toolbar__select">
                  <option>Normal text</option>
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
                placeholder="Enter"
                required
                rows={4}
                style={{ resize: 'vertical' }}
              />
            </div>
            <div className="lead-meetings-form__actions">
              <button type="button" className="btn btn-cancel" onClick={handleCancel}>Cancel</button>
              <button
                type="submit"
                className="btn btn-save"
                disabled={!(meetingData.title && meetingData.date && meetingData.startTime && meetingData.endTime && meetingData.attendees && meetingData.note)}
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

export default LeadMeetings;
