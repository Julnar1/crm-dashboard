import React, { useRef, useState } from 'react';
import { formatSize } from '../../utils/formatting';

const CompanyRightPanel = ({ attachmentsOpen, setAttachmentsOpen }) => {
  const fileInputRef = useRef(null);
  const [attachments, setAttachments] = useState([]);

  const handleAddClick = (e) => {
    e.stopPropagation();
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFilesSelected = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newItems = files.map((file) => ({
      id: `${file.name}-${file.size}-${file.lastModified}`,
      name: file.name,
      size: file.size,
      type: file.type,
      previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
      file,
    }));

    setAttachments((prev) => [...newItems, ...prev]);
    // reset input to allow re-selecting same file later
    e.target.value = '';
  };


  return (
    <>
      <div className="company-ai-summary">
        <div className="company-ai-summary__header">
          <div className="company-ai-summary__title">
            <i className="bi bi-robot"></i>
            AI Company Summary
          </div>
        </div>
        <div className="company-ai-summary__content">
          <div className="company-ai-summary__message">
            There are no activities associated with this company and further details are needed to provide a comprehensive summary.
          </div>
        </div>
      </div>

      <div className="attachments-section" onClick={() => setAttachmentsOpen((v) => !v)} style={{cursor: "pointer"}}>
        <div className={`attachments-section__header ${attachmentsOpen ? "open" : ""}`}>
          <i className={`bi ${attachmentsOpen ? "bi-chevron-down" : "bi-chevron-right"} attachments-section__chevron`}></i>
          <div className="attachments-section__title">Attachments</div>
          <button className="attachments-section__add-btn" onClick={handleAddClick}>
            <i className="bi bi-plus"></i>Add
          </button>
        </div>
        {attachmentsOpen && (
          <div className="attachments-section__content">
            <div className="attachments-section__description">
              See the files attached to your activities or uploaded to this record.
            </div>
            {attachments.length === 0 ? (
              <div className="attachments-section__empty">No attachments yet. Click Add to upload.</div>
            ) : (
              <div className="attachments-section__list">
                {attachments.map((item) => (
                  <div key={item.id} className="attachment-item">
                    {item.previewUrl ? (
                      <img src={item.previewUrl} alt={item.name} style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4 }} />
                    ) : (
                      <i className="bi bi-file-earmark" style={{ fontSize: 24, color: '#666' }} />
                    )}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 500 }}>{item.name}</div>
                      <div style={{ fontSize: 12, color: '#666' }}>{formatSize(item.size)}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) }
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          style={{ display: 'none' }}
          onChange={handleFilesSelected}
        />
      </div>
    </>
  );
};

export default CompanyRightPanel;