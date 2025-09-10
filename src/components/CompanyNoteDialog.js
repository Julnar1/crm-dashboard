import React, { useState } from 'react';
import '../styles/_companyPage.scss';

const CompanyNoteDialog = ({ isOpen, onClose, onSave, companyData }) => {
  const [note, setNote] = useState('');

  const handleSave = () => {
    if (note.trim()) {
      const newNote = {
        id: Date.now(),
        content: note,
        createdAt: new Date().toISOString(),
        companyId: companyData?.id,
        companyName: companyData?.name,
        author: "Jane Cooper" // Add specific author name
      };
      onSave(newNote);
      setNote('');
      onClose();
    }
  };

  const handleCancel = () => {
    setNote('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="company-note-modal-overlay">
      <div className="company-note-modal">
        <div className="company-note-header-row">
          <span className="company-note-title">Create Note</span>
          <button className="company-note-close" onClick={handleCancel}>&times;</button>
        </div>
        <div className="company-note-body">
          <label className="company-note-label">
            Note <span className="company-note-required">*</span>
          </label>
          <div className="company-note-toolbar-group">
            <div className="company-note-toolbar">
              <select className="company-note-toolbar-select">
                <option>Normal text</option>
                <option>Heading</option>
              </select>
              <button type="button" className="company-note-toolbar-btn"><b>B</b></button>
              <button type="button" className="company-note-toolbar-btn"><i>I</i></button>
              <button type="button" className="company-note-toolbar-btn"><u>U</u></button>
              <button type="button" className="company-note-toolbar-btn company-note-toolbar-btn--bulleted" title="Bulleted List"></button>
              <button type="button" className="company-note-toolbar-btn company-note-toolbar-btn--numbered" title="Numbered List"></button>
              <button type="button" className="company-note-toolbar-btn company-note-toolbar-btn--image" title="Insert Image"></button>
            </div>
          </div>
          <textarea
            className="company-note-textarea"
            placeholder="Enter"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={8}
          />
        </div>
        <div className="company-note-footer company-note-footer-block">
          <button className="company-note-cancel company-note-footer-btn" onClick={handleCancel}>Cancel</button>
          <button className="company-note-save company-note-footer-btn" onClick={handleSave} disabled={!note.trim()}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default CompanyNoteDialog; 