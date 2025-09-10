import React, { useState } from 'react';
import '../styles/_companyPage.scss';

const CompanyCallDialog = ({ isOpen, onClose, onSave, companyData }) => {
  const [callData, setCallData] = useState({
    type: "outbound", // outbound or inbound
    duration: "",
    notes: "",
    status: "completed", // completed, missed, scheduled
    date: "",
    time: "",
    with: "" // Who the call was with
  });

  const handleSave = () => {
    if (callData.notes.trim() && callData.date && callData.time && callData.with.trim()) {
      const newCall = {
        id: Date.now(),
        type: callData.type,
        duration: callData.duration,
        summary: callData.notes.trim(),
        status: callData.status,
        date: callData.date,
        time: callData.time,
        with: callData.with.trim(),
        phoneNumber: companyData?.phone,
        createdAt: new Date().toISOString(),
        companyId: companyData?.id,
        companyName: companyData?.name
      };
      onSave(newCall);
      setCallData({ type: "outbound", duration: "", notes: "", status: "completed", date: "", time: "", with: "" });
      onClose();
    }
  };

  const handleCancel = () => {
    setCallData({ type: "outbound", duration: "", notes: "", status: "completed", date: "", time: "", with: "" });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="company-call-modal-blur-overlay">
      <div className="company-call-modal-compose-form">
        <button className="company-call-close-button" onClick={handleCancel}>&times;</button>
        <h6>Log Call</h6>
        <form className="company-call-form" onSubmit={e => { e.preventDefault(); handleSave(); }}>
          <label>Connected <span className="required">*</span></label>
          <input type="text" value={companyData?.phone || ""} readOnly />
          <label>Call Outcome <span className="required">*</span></label>
          <select value={callData.status} onChange={e => setCallData({ ...callData, status: e.target.value })} required>
            <option value="" disabled>Choose</option>
            <option value="completed">Completed</option>
            <option value="missed">Missed</option>
            <option value="scheduled">Scheduled</option>
          </select>
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <label>Date <span className="required">*</span></label>
              <input type="date" value={callData.date || ''} onChange={e => setCallData({ ...callData, date: e.target.value })} required />
            </div>
            <div style={{ flex: 1 }}>
              <label>Time <span className="required">*</span></label>
              <input type="time" value={callData.time || ''} onChange={e => setCallData({ ...callData, time: e.target.value })} required />
            </div>
          </div>
          <label>With <span className="required">*</span></label>
          <input
            type="text"
            value={callData.with || ''}
            onChange={e => setCallData({ ...callData, with: e.target.value })}
            placeholder="Who the call was with"
            required
          />
          <label>Duration</label>
          <input
            type="text"
            value={callData.duration || ''}
            onChange={e => setCallData({ ...callData, duration: e.target.value })}
            placeholder="e.g., 15 minutes"
          />
          <label>Note <span className="required">*</span></label>
          <div className="company-call-note-rich-bar">
            <span>Normal text</span>
            <b>B</b> <i>I</i> <u>U</u> <span>•</span> <span>1.</span> <span>⎘</span>
          </div>
          <textarea
            value={callData.notes}
            onChange={e => setCallData({ ...callData, notes: e.target.value })}
            placeholder="Enter"
            rows="4"
            required
          />
          <div className="company-call-button-row">
            <button type="button" className="white-button" onClick={handleCancel}>Cancel</button>
            <button type="submit" className="btn--primary" disabled={!callData.notes.trim() || !callData.date || !callData.time || !callData.with.trim()}>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyCallDialog; 