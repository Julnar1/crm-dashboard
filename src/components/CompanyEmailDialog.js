import React, { useState, useEffect } from 'react';
import '../styles/_companyPage.scss';

const CompanyEmailDialog = ({ isOpen, onClose, onSend, companyData }) => {
  const [recipients, setRecipients] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [showCcBcc, setShowCcBcc] = useState(false);
  const [cc, setCc] = useState('');
  const [bcc, setBcc] = useState('');
  const [isSending, setIsSending] = useState(false);

  // Pre-populate recipients when modal opens and companyData is provided
  useEffect(() => {
    if (isOpen && companyData?.domain) {
      setRecipients(`contact@${companyData.domain}`);
    }
  }, [isOpen, companyData]);

  const handleSend = async () => {
    if (!recipients.trim() || !subject.trim() || !body.trim()) {
      alert('Please fill in all required fields (Recipients, Subject, and Body)');
      return;
    }

    setIsSending(true);
    try {
      const emailData = {
        id: Date.now(),
        to: recipients.trim(),
        subject: subject.trim(),
        body: body.trim(),
        cc: cc.trim(),
        bcc: bcc.trim(),
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        companyId: companyData?.id,
        companyName: companyData?.name
      };

      if (onSend) {
        await onSend(emailData);
      }
      
      // Reset form
      setRecipients('');
      setSubject('');
      setBody('');
      setCc('');
      setBcc('');
      setShowCcBcc(false);
      onClose();
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSend();
    }
  };

  const handleClose = () => {
    // Reset form when closing
    setRecipients('');
    setSubject('');
    setBody('');
    setCc('');
    setBcc('');
    setShowCcBcc(false);
    setIsSending(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="company-email-modal-overlay">
      <div className="company-email-modal">
        <div className="company-email-header">
          <span>New Email</span>
          <button className="company-email-close" onClick={handleClose}>&times;</button>
        </div>
        <div className="company-email-fields">
          <div className="company-email-row">
            <input
              className="company-email-input"
              type="text"
              placeholder="Recipients *"
              value={recipients}
              onChange={e => setRecipients(e.target.value)}
              required
            />
            <button 
              className="company-email-ccbcc" 
              onClick={() => setShowCcBcc(v => !v)}
              type="button"
            >
              Cc Bcc
            </button>
          </div>
          {showCcBcc && (
            <div className="company-email-row">
              <input
                className="company-email-input"
                type="text"
                placeholder="Cc"
                value={cc}
                onChange={e => setCc(e.target.value)}
              />
              <input
                className="company-email-input"
                type="text"
                placeholder="Bcc"
                value={bcc}
                onChange={e => setBcc(e.target.value)}
              />
            </div>
          )}
          <div className="company-email-row">
            <input
              className="company-email-input"
              type="text"
              placeholder="Subject *"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              required
            />
          </div>
        </div>
        <textarea
          className="company-email-body"
          placeholder="Body Text * (Ctrl+Enter to send)"
          value={body}
          onChange={e => setBody(e.target.value)}
          onKeyPress={handleKeyPress}
          required
        />
        <div className="company-email-toolbar">
          <button 
            className="company-email-send"
            onClick={handleSend}
            disabled={isSending}
          >
            {isSending ? 'Sending...' : 'Send'}
            {!isSending && <span className="company-email-send-dropdown">▼</span>}
          </button>
          <button className="company-email-toolbar-btn" title="Format" type="button">
            <svg width="20" height="20" viewBox="0 0 20 20">
              <text x="6" y="15" fontSize="16" fontWeight="bold" fill="#888" fontFamily="Arial">A</text>
              <line x1="5" y1="16" x2="18" y2="16" stroke="#888" strokeWidth="2" />
            </svg>
          </button>
          <button className="company-email-toolbar-btn" title="Attach" type="button">📎</button>
          <button className="company-email-toolbar-btn" title="Link" type="button">🔗</button>
          <button className="company-email-toolbar-btn" title="Emoji" type="button">
            <svg width="20" height="20" fill="none" stroke="#888" strokeWidth="2" viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="8"/>
              <path d="M7 13a3 3 0 0 0 6 0"/>
              <circle cx="7" cy="9" r="1"/>
              <circle cx="13" cy="9" r="1"/>
            </svg>
          </button>
          <button className="company-email-toolbar-btn" title="Image" type="button">
            <svg width="20" height="20" fill="none" stroke="#888" strokeWidth="2" viewBox="0 0 20 20">
              <rect x="3" y="7" width="14" height="8" rx="2"/>
              <circle cx="7" cy="11" r="1.5"/>
              <path d="M7 15l3-4 4 4"/>
            </svg>
          </button>
          <button 
            className="company-email-toolbar-btn" 
            title="Delete" 
            type="button"
            style={{marginLeft:'auto',color:'#888'}}
            onClick={handleClose}
          >
            &#128465;
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyEmailDialog; 