import React, { useState } from "react";
import "../../styles/_leadcalls.scss";

const LeadCalls = ({ leadId, leadPhone, calls = [], onAddCall, onDeleteCall, isModalOpen, onOpenModal, onCloseModal }) => {
  const [callData, setCallData] = useState({
    type: "call", // outbound or inbound
    with: "", // who the call was with
    duration: "",
    notes: "",
    status: "completed" // completed, missed, scheduled
  });

  const handleAddCall = () => {
    if (callData.notes.trim() && callData.with.trim()) {
      const newCall = {
        id: `call_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: callData.type,
        with: callData.with.trim() || leadPhone, // use 'with' field or fallback to phone
        duration: callData.duration,
        notes: callData.notes.trim(),
        status: callData.status,
        phoneNumber: leadPhone,
        createdAt: new Date().toISOString(),
        leadId: leadId
      };
      onAddCall(newCall);
      setCallData({ type: "call", with: "", duration: "", notes: "", status: "completed" });
      if (onCloseModal) onCloseModal();
    }
  };

  const handleCancel = () => {
    setCallData({ type: "call", with: "", duration: "", notes: "", status: "completed" });
    if (onCloseModal) onCloseModal();
  };

  if (!isModalOpen) return null;

  return (
    <>
      <div className="modal-blur-overlay" />
      <div className="modal-compose-form">
        <button className="close-button" onClick={handleCancel}>&times;</button>
        <h6>Log Call</h6>
        <form className="lead-form" onSubmit={e => { e.preventDefault(); handleAddCall(); }}>
          <label>Connected <span className="required">*</span></label>
          <input type="text" value={leadPhone || ""} readOnly />
          <label>With <span className="required">*</span></label>
          <input 
            type="text" 
            value={callData.with} 
            onChange={e => setCallData({ ...callData, with: e.target.value })}
            placeholder="Enter person or company name"
            required 
          />
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
          <label>Note <span className="required">*</span></label>
          <div className="note-rich-bar">{/* Placeholder for formatting bar */}
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
          <div className="button-row">
            <button type="button" className="white-button" onClick={handleCancel}>Cancel</button>
            <button type="submit" className="btn--primary" disabled={!callData.notes.trim() || !callData.with.trim()}>Save</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LeadCalls;
