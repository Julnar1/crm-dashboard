import React, { useState } from 'react';
import '../styles/_companyPage.scss';

const dummyAssignees = [
  "John Doe",
  "Jane Smith",
  "Alex Johnson"
];
const dummyPriorities = [
  { value: "", label: "Choose" },
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" }
];
const dummyTaskTypes = [
  { value: '', label: 'Choose' },
  { value: 'call', label: 'Call' },
  { value: 'email', label: 'Email' },
  { value: 'meeting', label: 'Meeting' },
  { value: 'followup', label: 'Follow Up' },
  { value: 'other', label: 'Other' },
];

const CompanyTaskDialog = ({ isOpen, onClose, onSave, companyData }) => {
  const [taskData, setTaskData] = useState({
    name: '',
    dueDate: '',
    dueTime: '',
    type: '',
    priority: '',
    assignee: '',
    note: '',
  });

  const handleSave = () => {
    if (!taskData.name.trim() || !taskData.dueDate || !taskData.dueTime || !taskData.type || !taskData.priority || !taskData.assignee || !taskData.note.trim()) return;
    const newTask = {
      id: Date.now(),
      title: taskData.name.trim(),
      dueDate: taskData.dueDate,
      dueTime: taskData.dueTime,
      type: taskData.type,
      priority: taskData.priority,
      assignedTo: taskData.assignee,
      status: "Pending", // Default status for new tasks
      note: taskData.note.trim(),
      companyId: companyData?.id,
      companyName: companyData?.name,
      createdAt: new Date().toISOString(),
    };
    onSave(newTask);
    setTaskData({
      name: '',
      dueDate: '',
      dueTime: '',
      type: '',
      priority: '',
      assignee: '',
      note: '',
    });
    onClose();
  };

  const handleCancel = () => {
    setTaskData({
      name: '',
      dueDate: '',
      dueTime: '',
      type: '',
      priority: '',
      assignee: '',
      note: '',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="company-task-modal-overlay">
      <div className="company-task-modal">
        <div className="company-task-modal-header">
          <span className="company-task-modal-title">Create Task</span>
          <button onClick={handleCancel} className="company-task-modal-close">&times;</button>
        </div>
        <div className="company-task-modal-body">
          <div className="company-task-form">
            <div className="company-task-form-row">
              <div className="company-task-form-group full-width">
                <label>Task Name <span className="required">*</span></label>
                <input
                  type="text"
                  value={taskData.name}
                  onChange={e => setTaskData({ ...taskData, name: e.target.value })}
                  placeholder="Enter"
                  required
                />
              </div>
            </div>
            <div className="company-task-form-row">
              <div className="company-task-form-group">
                <label>Due Date <span className="required">*</span></label>
                <input
                  type="date"
                  value={taskData.dueDate}
                  onChange={e => setTaskData({ ...taskData, dueDate: e.target.value })}
                  required
                />
              </div>
              <div className="company-task-form-group">
                <label>Time <span className="required">*</span></label>
                <input
                  type="time"
                  value={taskData.dueTime}
                  onChange={e => setTaskData({ ...taskData, dueTime: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="company-task-form-row">
              <div className="company-task-form-group">
                <label>Task Type <span className="required">*</span></label>
                <select
                  value={taskData.type}
                  onChange={e => setTaskData({ ...taskData, type: e.target.value })}
                  required
                >
                  {dummyTaskTypes.map((t, i) => (
                    <option key={i} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
              <div className="company-task-form-group">
                <label>Priority <span className="required">*</span></label>
                <select
                  value={taskData.priority}
                  onChange={e => setTaskData({ ...taskData, priority: e.target.value })}
                  required
                >
                  {dummyPriorities.map((p, i) => (
                    <option key={i} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="company-task-form-row">
              <div className="company-task-form-group full-width">
                <label>Assigned to <span className="required">*</span></label>
                <select
                  value={taskData.assignee}
                  onChange={e => setTaskData({ ...taskData, assignee: e.target.value })}
                  required
                >
                  <option value="">Choose</option>
                  {dummyAssignees.map((a, i) => (
                    <option key={i} value={a}>{a}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="company-task-form-row">
              <div className="company-task-form-group full-width">
                <label>Note <span className="required">*</span></label>
                <textarea
                  className="company-task-note-textarea"
                  value={taskData.note}
                  onChange={e => setTaskData({ ...taskData, note: e.target.value })}
                  placeholder="Enter"
                  required
                  rows={4}
                />
              </div>
            </div>
            <div className="company-task-form-actions">
              <button className="white-button" onClick={handleCancel}>Cancel</button>
              <button
                className="custom-button"
                onClick={handleSave}
                disabled={!(taskData.name && taskData.dueDate && taskData.dueTime && taskData.type && taskData.priority && taskData.assignee && taskData.note)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyTaskDialog; 