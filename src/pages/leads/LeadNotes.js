import React, { useState } from 'react';
import '../../styles/_leadnotes.scss';

const LeadNotes = ({ notes = [], onAddNote, onDeleteNote, isModalOpen, onOpenModal, onCloseModal }) => {
  const [note, setNote] = useState('');
  // Accordion state for open/close
  const [openNoteId, setOpenNoteId] = useState(null);
  const toggleAccordion = (id) => {
    setOpenNoteId(openNoteId === id ? null : id);
  };

  const handleOpenModal = () => {
    setNote('');
    if (onOpenModal) onOpenModal();
  };
  const handleCloseModal = () => {
    setNote('');
    if (onCloseModal) onCloseModal();
  };

  const handleInput = (e) => setNote(e.target.value);

  const handleSave = () => {
    if (note.trim()) {
      const newNote = {
        id: Date.now(),
        content: note,
        createdAt: new Date().toISOString(),
      };
      onAddNote(newNote);
      setNote('');
      if (onCloseModal) onCloseModal();
    }
  };

  return (
    <div className="leadnotes-section">
      <div className="leadnotes-header">
        <h5>Notes</h5>
        <button 
          className="custom-button" 
          onClick={handleOpenModal}
          style={{ padding: '4px 8px', fontSize: '11px' }}
        >
          Create Note
        </button>
      </div>
      {notes.length === 0 ? (
        <div className="leadnotes-empty">No notes yet.</div>
      ) : (
        <ul className="leadnotes-list">
          {notes.map((n) => {
            // Get author if available
            const author = n.author || n.createdBy || null;
            // Get first line/preview (truncate to 60 chars)
            const preview = n.content.split('\n')[0].slice(0, 60) + (n.content.split('\n')[0].length > 60 ? '...' : '');
            return (
              <li key={n.id} className="leadnotes-item">
                <div className="leadnotes-note-month">
                  {new Date(n.createdAt).toLocaleString(undefined, { month: 'long', year: 'numeric' })}
                </div>
                <div className={`leadnotes-accordion-box${openNoteId === n.id ? ' open' : ''}`}> 
                  <div className="leadnotes-accordion-header" onClick={() => toggleAccordion(n.id)}>
                    <div className="leadnotes-accordion-header-left">
                      <span className={`leadnotes-accordion-arrow${openNoteId === n.id ? ' open' : ''}`}> 
                        <svg width="16" height="16" viewBox="0 0 16 16" style={{display: 'block'}}><path d="M4 6l4 4 4-4" stroke="#222" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
                      </span>
                      <div className="leadnotes-accordion-title-group">
                        <span className="leadnotes-accordion-title">Note{author && <span> by {author}</span>}</span>
                        {!openNoteId || openNoteId !== n.id ? (
                          <div className="leadnotes-accordion-preview">{preview}</div>
                        ) : null}
                      </div>
                    </div>
                    <span className="leadnotes-accordion-date">{new Date(n.createdAt).toLocaleString(undefined, { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })}</span>
                  </div>
                  {openNoteId === n.id && (
                    <div className="leadnotes-content">{n.content}</div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {isModalOpen && (
        <div className="leadnote-modal-overlay">
          <div className="leadnote-modal">
            <div className="leadnote-header-row">
              <span className="leadnote-title">Create Note</span>
              <button className="leadnote-close" onClick={handleCloseModal}>&times;</button>
            </div>
            <div className="leadnote-body">
              <label className="leadnote-label">
                Note <span className="leadnote-required">*</span>
              </label>
              <div className="leadnote-toolbar-group">
                <div className="leadnote-toolbar">
                  <select className="leadnote-toolbar-select">
                    <option>Normal text</option>
                    <option>Heading</option>
                  </select>
                  <button type="button" className="leadnote-toolbar-btn"><b>B</b></button>
                  <button type="button" className="leadnote-toolbar-btn"><i>I</i></button>
                  <button type="button" className="leadnote-toolbar-btn"><u>U</u></button>
                  <button type="button" className="leadnote-toolbar-btn leadnote-toolbar-btn--bulleted" title="Bulleted List"></button>
                  <button type="button" className="leadnote-toolbar-btn leadnote-toolbar-btn--numbered" title="Numbered List"></button>
                  <button type="button" className="leadnote-toolbar-btn leadnote-toolbar-btn--image" title="Insert Image"></button>
                </div>
              </div>
              <textarea
                className="leadnote-textarea"
                placeholder="Enter"
                value={note}
                onChange={handleInput}
                rows={8}
              />
            </div>
            <div className="leadnote-footer leadnote-footer-block">
              <button className="leadnote-cancel leadnote-footer-btn" onClick={handleCloseModal}>Cancel</button>
              <button className="leadnote-save leadnote-footer-btn" onClick={handleSave} disabled={!note.trim()}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadNotes; 