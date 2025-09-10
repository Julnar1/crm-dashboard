import React, { useState } from "react";
import "../../styles/_leadtasks.scss";

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

const LeadTasks = ({ leadId, tasks = [], onAddTask, onDeleteTask, isModalOpen, onOpenModal, onCloseModal }) => {
  const [taskData, setTaskData] = useState({
    name: '',
    dueDate: '',
    dueTime: '',
    type: '',
    priority: '',
    assignee: '',
    note: '',
  });

  const handleAddTask = () => {
    if (!taskData.name.trim() || !taskData.dueDate || !taskData.dueTime || !taskData.type || !taskData.priority || !taskData.assignee || !taskData.note.trim()) return;
    const newTask = {
      id: Date.now(),
      name: taskData.name.trim(),
      dueDate: taskData.dueDate,
      dueTime: taskData.dueTime,
      type: taskData.type,
      priority: taskData.priority,
      assignee: taskData.assignee,
      note: taskData.note.trim(),
      leadId: leadId,
      createdAt: new Date().toISOString(),
    };
    onAddTask(newTask);
    setTaskData({
      name: '',
      dueDate: '',
      dueTime: '',
      type: '',
      priority: '',
      assignee: '',
      note: '',
    });
    if (onCloseModal) onCloseModal();
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
    if (onCloseModal) onCloseModal();
  };

  if (!isModalOpen) return null;

  return (
    <>
      <div className="lead-tasks-modal-overlay"></div>
      <div className="lead-tasks-modal">
        <div className="lead-tasks-modal-header">
          <span className="lead-tasks-modal-title">Create Task</span>
          <button onClick={handleCancel} className="lead-tasks-modal-close">&times;</button>
        </div>
        <div className="lead-tasks-modal-body">
          <div className="lead-tasks-form">
            <div className="lead-tasks-form-row">
              <div className="lead-tasks-form-group full-width">
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
            <div className="lead-tasks-form-row">
              <div className="lead-tasks-form-group">
                <label>Due Date <span className="required">*</span></label>
                <input
                  type="date"
                  value={taskData.dueDate}
                  onChange={e => setTaskData({ ...taskData, dueDate: e.target.value })}
                  required
                />
              </div>
              <div className="lead-tasks-form-group">
                <label>Time <span className="required">*</span></label>
                <input
                  type="time"
                  value={taskData.dueTime}
                  onChange={e => setTaskData({ ...taskData, dueTime: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="lead-tasks-form-row">
              <div className="lead-tasks-form-group">
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
              <div className="lead-tasks-form-group">
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
            <div className="lead-tasks-form-row">
              <div className="lead-tasks-form-group full-width">
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
            <div className="lead-tasks-form-row">
              <div className="lead-tasks-form-group full-width">
                <label>Note <span className="required">*</span></label>
                <textarea
                  className="lead-tasks-note-textarea"
                  value={taskData.note}
                  onChange={e => setTaskData({ ...taskData, note: e.target.value })}
                  placeholder="Enter"
                  required
                  rows={4}
                />
              </div>
            </div>
            <div className="lead-tasks-form-actions">
              <button className="white-button" onClick={handleCancel}>Cancel</button>
              <button
                className="custom-button"
                onClick={handleAddTask}
                disabled={!(taskData.name && taskData.dueDate && taskData.dueTime && taskData.type && taskData.priority && taskData.assignee && taskData.note)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeadTasks;
