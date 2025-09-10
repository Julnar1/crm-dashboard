import React, { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LeadNotes from "./LeadNotes";
import LeadEmail from "./LeadEmail";
import LeadCalls from "./LeadCalls";
import LeadMeetings from "./LeadMeetings";
import LeadTasks from "./LeadTasks";
import LeadForm from "./LeadForm";
import { CompanyAccordionContent, CompanyActivityContent } from "../../components/company/CompanyMainContent";
import { useSelector, useDispatch } from 'react-redux';
import { updateLead } from '../../redux/slices/leadsSlice';
import { addDeal } from '../../redux/slices/dealsSlice';
import { toast } from 'react-toastify';
import { formatSize, formatAttendees } from '../../utils/formatting';

// Reusable AI Summary and Attachments component
function AISummary({ className, style }) {
  return (
    <div className={className} style={style}>
      <h6>AI Lead Summary</h6>
      <p>
        No activities found for this lead. Consider reaching out to establish
        initial contact and begin the engagement process. 
      </p>
    </div>
  );
}

function AttachmentsSection({ attachmentsCollapsed, setAttachmentsCollapsed }) {
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
    <div className="attachments">
      <div className="d-flex align-items-center justify-content-between attachments-header">
        <div className="d-flex align-items-center" onClick={() => setAttachmentsCollapsed((prev) => !prev)}>
          <i className={`bi note-icon ${attachmentsCollapsed ? 'bi-chevron-down' : 'bi-chevron-up'}`}></i>
          <strong className="mb-0">Attachments</strong>
        </div>
        <span 
          className="add-attachment mb-0 note-icon" 
          onClick={handleAddClick}
        >
          + Add
        </span>
      </div>
      {/* Collapsible content with file upload functionality */}
      {!attachmentsCollapsed && (
        <div className="attachments-content">
          <div className="attachments-info">
            See the files attached to your activities or uploaded to this record.
        </div>
          {attachments.length === 0 ? (
            <div className="no-attachments">
              No attachments yet. Click Add to upload.
            </div>
          ) : (
            <div className="attachments-section__list">
              {attachments.map((item) => (
                <div key={item.id} className="attachment-item">
                  {item.previewUrl ? (
                    <img 
                      src={item.previewUrl} 
                      alt={item.name} 
                      className="attachment-preview"
                    />
                  ) : (
                    <i 
                      className="bi bi-file-earmark attachment-icon"
                    />
                  )}
                  <div className="attachment-details">
                    <div className="attachment-name">{item.name}</div>
                    <div className="attachment-size">{formatSize(item.size)}</div>
                  </div>
                </div>
              ))}
        </div>
      )}
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        className="file-input"
        onChange={handleFilesSelected}
      />
    </div>
  );
}

const LeadView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const leads = useSelector(state => state.leads.leads);
  const lead = leads.find((l) => String(l.id) === String(id));
  const [activeTab, setActiveTab] = useState("Activity");
  const [searchTerm, setSearchTerm] = useState("");
  const [aboutCollapsed, setAboutCollapsed] = useState(false);
  const [attachmentsCollapsed, setAttachmentsCollapsed] = useState(false);
  const [openItemId, setOpenItemId] = useState(null);
  
  // Edit lead dialog state
  const [isEditLeadDialogOpen, setIsEditLeadDialogOpen] = useState(false);

  // Modal states
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showMeetingModal, setShowMeetingModal] = useState(false);

  // Data states
  const [notes, setNotes] = useState([]);
  const [emails, setEmails] = useState([]);
  const [calls, setCalls] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [meetings, setMeetings] = useState([]);

  // Open/close states for accordion items
  const [openNoteIdx, setOpenNoteIdx] = useState(null);
  const [openEmailIdx, setOpenEmailIdx] = useState(null);
  const [openCallId, setOpenCallId] = useState(null);
  const [openTaskId, setOpenTaskId] = useState(null);
  const [openMeetingId, setOpenMeetingId] = useState(null);

  if (!lead) {
    return (
      <div className="view-container">
        <div className="d-flex justify-content-center align-items-center loading-container">
          <div className="text-center loading-content">
            <h4>Lead not found</h4>
            <p>The lead you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(lead.email);
    // You might want to show a toast notification here
  };

  const handleConvertLead = () => {
    console.log('Convert button clicked!'); // Debug log
    // Convert lead to deal
    const convertedData = {
      id: Date.now(),
      name: `${lead.firstName} ${lead.lastName}`,
      email: lead.email,
      phone: lead.phoneNumber,
      jobTitle: lead.jobTitle,
      status: 'New Deal',
      value: 0,
      createdAt: new Date().toISOString(),
      source: 'Lead Conversion',
      leadId: lead.id
    };
    
    // Dispatch action to add deal to Redux store
    dispatch(addDeal(convertedData));
    
    // Update lead status to converted
    dispatch(updateLead({
      ...lead,
      leadStatus: 'Converted',
      convertedAt: new Date().toISOString()
    }));
    
    toast.success('Lead converted to deal successfully!');
    
    // Optionally navigate to deals page
    // navigate('/deals');
  };

  const handleAddNote = (noteData) => {
    setNotes([...notes, noteData]);
    // Here you would typically also update the lead in your context/backend
  };

  const handleDeleteNote = (noteId) => {
    setNotes(notes.filter(note => note.id !== noteId));
  };

  const handleAddEmail = (emailData) => {
    setEmails([...emails, emailData]);
  };

  const handleAddCall = (callData) => {
    setCalls([...calls, callData]);
  };

  const handleAddTask = (taskData) => {
    setTasks([...tasks, taskData]);
  };

  const handleAddMeeting = (meetingData) => {
    setMeetings([...meetings, meetingData]);
  };

  const handleDeleteMeeting = (meetingId) => {
    setMeetings(meetings.filter(meeting => meeting.id !== meetingId));
  };

  const handleOpenMeetingModal = () => {
    setShowMeetingModal(true);
  };

  const handleCloseMeetingModal = () => {
    setShowMeetingModal(false);
  };


  // Function to organize newly created items for Activity tab
  const getActivityData = () => {
    const activityData = {
      upcoming: [
        {
          id: 101,
          type: "Task",
          title: "Task assigned to Alice",
          subTitle: "Prepare campaign report",
          description: "Prepare campaign report",
          status: "Pending",
          assignedTo: "Alice",
          date: "2025-06-24T17:30:00Z",
          isOverdue: true
        },
        {
          id: 102,
          type: "Task",
          title: "Task assigned to Alice", 
          subTitle: "Review marketing materials",
          description: "Review marketing materials",
          status: "In Progress",
          assignedTo: "Alice",
          date: "2025-06-24T17:30:00Z",
          isOverdue: true
        }
      ],
      "July 2025": [
        {
          id: 104,
          type: "Meeting",
          title: "Meeting husni, Dr. Ameen and lead",
          subTitle: "Discuss project options",
          attendees: "husni, Dr. Ameen, lead",
          meetingDescription: "Discuss project options",
          startTime: "16:00",
          endTime: "17:00",
          location: "Conference Room A",
          reminder: "15min",
          date: "2025-07-07T16:00:00Z"
        },
        {
          id: 105,
          type: "Meeting",
          title: "Meeting husni and lead",
          subTitle: "Review progress and suggest next steps",
          attendees: "husni, lead",
          meetingDescription: "Review progress and suggest next steps",
          startTime: "15:00",
          endTime: "16:00",
          location: "Zoom",
          reminder: "30min",
          date: "2025-07-08T15:00:00Z"
        },
        {
          id: 107,
          type: "Email",
          title: "Email tracking",
          description: "Follow up email sent to lead",
          to: "lead@example.com",
          subject: "Project Update",
          body: "Follow up email sent to lead",
          date: "2025-07-15T10:30:00Z"
        },
        {
          id: 108,
          type: "Call",
          title: "Call with John Smith",
          description: "Discussed project timeline and deliverables",
          with: "John Smith",
          summary: "Discussed project timeline and deliverables",
          date: "2025-07-10T14:00:00Z"
        }
      ],
      "June 2025": [
        {
          id: 203,
          type: "Call",
          title: "Call with Maria Johnson",
          description: "Brought Maria through our latest product line. She's interested and is going to get back to me.",
          with: "Maria Johnson",
          summary: "Brought Maria through our latest product line. She's interested and is going to get back to me.",
          date: "2025-06-24T17:30:00Z"
        },
        {
          id: 206,
          type: "Email",
          title: "Email tracking",
          description: "Jane Cooper opened Hello there",
          to: "jane.cooper@example.com",
          subject: "Hello there",
          body: "Jane Cooper opened Hello there",
          date: "2025-06-24T17:30:00Z"
        },
        {
          id: 207,
          type: "Note",
          title: "Note by Maria Johnson",
          description: "Sample Note",
          content: "Sample Note",
          author: "Maria Johnson",
          date: "2025-06-24T17:30:00Z"
        }
      ]
    };

    // Add newly created tasks to upcoming section
    if (tasks.length > 0) {
      const newTasks = tasks.map(task => ({
        id: task.id,
        type: "Task",
        title: `Task assigned to ${task.assignee || task.assignedTo || lead.firstName}`,
        subTitle: task.name || task.title || "Untitled Task",
        description: task.note || task.description,
        status: task.status || "Pending",
        assignedTo: task.assignee || task.assignedTo || lead.firstName,
        date: task.createdAt || task.dueDate,
        isOverdue: new Date(task.createdAt || task.dueDate) < new Date()
      }));
      activityData.upcoming = [...newTasks, ...activityData.upcoming];
    }

    // Add newly created items to current month section
    const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
    
    // Add new notes
    if (notes.length > 0) {
      const newNotes = notes.map(note => ({
        id: note.id,
        type: "Note",
        title: `Note by ${note.author || `${lead.firstName} ${lead.lastName}`}`,
        description: note.content,
        content: note.content,
        author: note.author || `${lead.firstName} ${lead.lastName}`,
        date: note.createdAt || note.date
      }));
      if (!activityData[currentMonth]) {
        activityData[currentMonth] = [];
      }
      activityData[currentMonth] = [...newNotes, ...activityData[currentMonth]];
    }

    // Add new emails
    if (emails.length > 0) {
      const newEmails = emails.map(email => ({
        id: email.id,
        type: "Email",
        title: "Email tracking",
        description: email.body,
        to: email.to || email.recipients,
        subject: email.subject,
        body: email.body,
        date: email.createdAt || email.date
      }));
      if (!activityData[currentMonth]) {
        activityData[currentMonth] = [];
      }
      activityData[currentMonth] = [...newEmails, ...activityData[currentMonth]];
    }

    // Add new calls
    if (calls.length > 0) {
      const newCalls = calls.map(call => ({
        id: call.id,
        type: "Call",
        title: `Call with ${call.with || call.phoneNumber || `${lead.firstName} ${lead.lastName}`}`,
        description: call.summary || call.notes,
        with: call.with || call.phoneNumber || `${lead.firstName} ${lead.lastName}`,
        summary: call.summary || call.notes,
        notes: call.notes,
        duration: call.duration,
        phoneNumber: call.phoneNumber,
        date: call.createdAt || call.date
      }));
      if (!activityData[currentMonth]) {
        activityData[currentMonth] = [];
      }
      activityData[currentMonth] = [...newCalls, ...activityData[currentMonth]];
    }

    // Add new meetings
    if (meetings.length > 0) {
      const newMeetings = meetings.map(meeting => ({
        id: meeting.id,
        type: "Meeting",
        title: `Meeting ${formatAttendees(meeting.attendees)}`,
        subTitle: meeting.description || meeting.note || "No description",
        attendees: meeting.attendees || "Unknown",
        meetingDescription: meeting.description || meeting.note,
        startTime: meeting.startTime || "00:00",
        endTime: meeting.endTime || "01:00",
        location: meeting.location || "",
        reminder: meeting.reminder || "",
        date: meeting.createdAt || meeting.date
      }));
      if (!activityData[currentMonth]) {
        activityData[currentMonth] = [];
      }
      activityData[currentMonth] = [...newMeetings, ...activityData[currentMonth]];
    }

    return activityData;
  };

  // Mock data for each tab
  const mockData = {
    Activity: getActivityData(),
    Notes: [
      {
        id: 301,
        title: "Note by Maria Johnson",
        content: "Some note in this note",
        date: "2025-07-05T12:30:00Z",
        author: "Maria Johnson"
      },
      {
        id: 302,
        title: "Note by John Smith",
        content: "error not found",
        date: "2025-07-06T14:00:00Z",
        author: "John Smith"
      }
    ],
    Emails: [
      {
        id: 401,
        to: "lead@example.com",
        subject: "Follow up on project",
        body: "Hi, just checking in...",
        date: "2025-07-05T13:00:00Z"
      },
      {
        id: 402,
        to: "lead2@example.com",
        subject: "Proposal attached",
        body: "Please find the proposal.",
        date: "2025-07-05T14:30:00Z"
      },
      ...emails.map(email => ({
        ...email,
        date: email.createdAt || email.date
      }))
    ],
    Calls: [
      {
        id: 501,
        type: "Call",
        title: "Call with John Smith",
        with: "John Smith",
        summary: "Discussed project timeline and deliverables",
        date: "2025-07-10T14:00:00Z"
      },
      {
        id: 502,
        type: "Call", 
        title: "Call with Maria Johnson",
        with: "Maria Johnson",
        summary: "Brought Maria through our latest product line. She's interested and is going to get back to me.",
        date: "2025-06-24T17:30:00Z"
      }
    ],
    Tasks: [
      {
        id: 601,
        title: "Send project proposal",
        status: "Pending",
        assignedTo: "Alice",
        priority: "High",
        dueDate: "2025-07-10T10:00:00Z",
        note: "Prepare and send the project proposal to the client. Include all technical specifications and timeline details.",
        date: "2025-07-05T10:00:00Z"
      },
      {
        id: 602,
        title: "Update project details",
        status: "Completed",
        assignedTo: "Bob",
        priority: "Medium",
        dueDate: "2025-07-08T15:00:00Z",
        note: "Update the project documentation with the latest changes and requirements from the client meeting.",
        date: "2025-07-04T15:00:00Z"
      },
      {
        id: 603,
        title: "Review lead proposal",
        status: "In Progress",
        assignedTo: "Alice",
        priority: "Medium",
        dueDate: "2025-07-12T09:00:00Z",
        note: "Review the lead proposal document and provide feedback on pricing and technical feasibility.",
        date: "2025-07-03T09:00:00Z"
      }
    ],
    Meetings: [
      {
        id: 701,
        title: "Project consultation",
        date: "2025-07-07",
        startTime: "16:00",
        endTime: "17:00",
        attendees: "husni, Dr. Ameen, lead",
        location: "Conference Room A",
        reminder: "15min",
        note: "Discuss project options",
        subTitle: "Discuss project options",
        createdAt: "2025-07-07T16:00:00Z"
      },
      {
        id: 702,
        title: "Post-project review",
        date: "2025-07-08",
        startTime: "15:00",
        endTime: "16:00",
        attendees: "husni, lead",
        location: "Zoom",
        reminder: "30min",
        note: "Review progress and suggest next steps",
        subTitle: "Review progress and suggest next steps",
        createdAt: "2025-07-08T15:00:00Z"
      },
      ...meetings.map(meeting => ({
        ...meeting,
        subTitle: meeting.description || meeting.note || "No description",
        date: meeting.createdAt || meeting.date
      }))
    ]
  };

  // Render functions for accordion content
  const renderNoteContent = (note) => (
    <div className="company-accordion-note-content">
      <div className="company-accordion-note-field">
        <strong>Author:</strong> {note.author || "Unknown"}
                  </div>
      <div className="company-accordion-note-field">
        <strong>Content:</strong> {note.content}
                  </div>
                </div>
  );

  const renderCallContent = (call) => {
    // Get the "with" field - prefer call.with, then phoneNumber, then lead name
    const getWithField = (call) => {
      if (call.with && call.with !== "Unknown") return call.with;
      if (call.phoneNumber) return call.phoneNumber;
      return `${lead.firstName} ${lead.lastName}`;
    };

        return (
      <div className="company-accordion-note-content">
        <div className="company-accordion-note-field">
          <strong>With:</strong> {getWithField(call)}
                  </div>
        <div className="company-accordion-note-field">
          <strong>Type:</strong> {call.type || "Call"}
                  </div>
        {call.summary && (
          <div className="company-accordion-note-field">
            <strong>Summary:</strong> {call.summary}
                </div>
        )}
        {call.notes && (
          <div className="company-accordion-note-field">
            <strong>Summary:</strong> {call.notes}
          </div>
        )}
      </div>
    );
  };

  const renderTaskContent = (task) => (
    <div className="company-accordion-note-content">
      <div className="company-accordion-note-field">
        <strong>Status:</strong> {task.status || "Pending"}
                  </div>
      <div className="company-accordion-note-field">
        <strong>Priority:</strong> {task.priority || "Medium"}
                  </div>
      {task.assignedTo && (
        <div className="company-accordion-note-field">
          <strong>Assigned To:</strong> {task.assignedTo}
                  </div>
      )}
      {task.dueDate && (
        <div className="company-accordion-note-field">
          <strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}
                </div>
      )}
      {task.note && (
        <div className="company-accordion-note-field">
          <strong>Description:</strong> {task.note}
              </div>
            )}
          </div>
  );

  // Render function for activity content (accordion)
  const renderActivityContent = (item) => {
    switch(item.type) {
      case "Meeting":
        return (
          <div>
            <div><strong>Title:</strong> {item.title}</div>
            <div><strong>Date:</strong> {item.date}</div>
            <div><strong>Time:</strong> {item.startTime} - {item.endTime}</div>
            <div><strong>Attendees:</strong> {item.attendees}</div>
            {item.location && <div><strong>Location:</strong> {item.location}</div>}
            {item.reminder && <div><strong>Reminder:</strong> {item.reminder}</div>}
            <div><strong>Description:</strong> {item.description || item.note}</div>
          </div>
        );
      case "Note":
        return (
          <div>
            <div><strong>Author:</strong> {item.author || `${lead.firstName} ${lead.lastName}`}</div>
            <div><strong>Content:</strong> {item.content}</div>
          </div>
        );
      case "Call":
        return (
          <div>
            <div><strong>With:</strong> {item.with}</div>
            <div><strong>Summary:</strong> {item.summary || item.notes}</div>
            {item.date && <div><strong>Date:</strong> {item.date}</div>}
            {item.time && <div><strong>Time:</strong> {item.time}</div>}
            {item.status && <div><strong>Status:</strong> {item.status}</div>}
            {item.type && <div><strong>Type:</strong> {item.type}</div>}
          </div>
        );
      case "Email":
        return (
          <div>
            <div><strong>To:</strong> {item.to || item.recipients}</div>
            <div><strong>Subject:</strong> {item.subject}</div>
            <div><strong>Body:</strong> {item.body || item.description}</div>
          </div>
        );
      case "Task":
        return (
          <div>
            <div><strong>Title:</strong> {item.subTitle || item.title || item.name}</div>
            <div><strong>Status:</strong> {item.status}</div>
            <div><strong>Assigned To:</strong> {item.assignedTo || item.assignee}</div>
            {item.dueDate && <div><strong>Due Date:</strong> {item.dueDate}</div>}
            {item.dueTime && <div><strong>Due Time:</strong> {item.dueTime}</div>}
            {item.type && <div><strong>Type:</strong> {item.type}</div>}
            {item.priority && <div><strong>Priority:</strong> {item.priority}</div>}
            {item.note && <div><strong>Note:</strong> {item.note}</div>}
          </div>
        );
      default:
        return <div>{item.description || item.content}</div>;
    }
  };

  // Edit lead handler
  const handleEditLead = () => {
    setIsEditLeadDialogOpen(true);
  };

  // Save lead handler
  const handleSaveLead = async (updatedLeadData) => {
    try {
      const updatedLead = { ...lead, ...updatedLeadData };
      await dispatch(updateLead(updatedLead)).unwrap();
      toast.success("Lead updated successfully!");
      setIsEditLeadDialogOpen(false);
    } catch (error) {
      toast.error(error || "An error occurred while updating lead");
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Activity":
        return (
          <CompanyActivityContent
            key="activity-content"
            activityData={getActivityData()}
            openItemId={openItemId}
            setOpenItemId={setOpenItemId}
            renderItemContent={renderActivityContent}
          />
        );

      case "Notes":
        // Merge hardcoded notes with newly created notes
        const allNotes = [
          ...mockData.Notes,
          ...notes.map(note => ({
            ...note,
            title: `Note by ${note.author || `${lead.firstName} ${lead.lastName}`}`,
            author: note.author || `${lead.firstName} ${lead.lastName}`,
            date: note.createdAt || note.date
          }))
        ];
        
        return (
          <CompanyAccordionContent
            items={allNotes}
            openItemId={openItemId}
            setOpenItemId={setOpenItemId}
            renderItemContent={renderNoteContent}
            emptyMessage="No notes found for this lead."
            onAddClick={() => setShowNoteModal(true)}
            addButtonText="Add Note"
          />
        );

      case "Emails": {
        // Prepare email data for the reusable component
        const emailItems = mockData.Emails.map((email, idx) => ({
          id: idx,
          title: 'Email',
          preview: `${email.subject || 'No subject'}`,
          date: email.date,
          ...email
        }));

        return (
          <div>
            <CompanyAccordionContent
              title="Emails"
              items={emailItems}
              openItemId={openEmailIdx}
              setOpenItemId={setOpenEmailIdx}
              onAddClick={() => setShowEmailModal(true)}
              addButtonText="Add Email"
              emptyMessage="No emails yet."
              renderItemContent={(email) => (
                <>
                  <div><strong>To:</strong> {email.recipients}</div>
                  {email.cc && <div><strong>Cc:</strong> {email.cc}</div>}
                  {email.bcc && <div><strong>Bcc:</strong> {email.bcc}</div>}
                  <div><strong>Subject:</strong> {email.subject}</div>
                  <div className="email-content">{email.body}</div>
                </>
              )}
            />
            <LeadEmail
              leadId={lead.id}
              leadEmail={lead.email}
              emails={emails}
              onAddEmail={handleAddEmail}
              onDeleteEmail={(emailId) => setEmails(emails.filter(e => e.id !== emailId))}
              isOpen={showEmailModal}
              onClose={() => setShowEmailModal(false)}
              onSend={handleAddEmail}
            />
          </div>
        );
      }

      case "Calls":
        // Merge mock data with newly created calls
        const allCalls = [
          ...mockData.Calls,
          ...calls.map(call => ({
            ...call,
            title: call.title || `Call with ${call.with || call.phoneNumber || `${lead.firstName} ${lead.lastName}`}`,
            date: call.createdAt || call.date
          }))
        ];
        

        return (
          <CompanyAccordionContent
            items={allCalls}
              openItemId={openCallId}
              setOpenItemId={setOpenCallId}
            renderItemContent={renderCallContent}
            emptyMessage="No calls found for this lead."
              onAddClick={() => setShowCallModal(true)}
              addButtonText="Add Call"
          />
        );

      case "Tasks":
        // Merge hardcoded tasks with newly created tasks
        const allTasks = [
          ...mockData.Tasks,
          ...tasks.map(task => ({
            ...task,
            title: task.name || task.title || "Untitled Task",
            date: task.createdAt || task.dueDate || task.date,
            status: task.status || "Pending",
            assignedTo: task.assignee || task.assignedTo,
            priority: task.priority || "Medium"
          }))
        ];

        return (
          <CompanyAccordionContent
            items={allTasks}
              openItemId={openTaskId}
              setOpenItemId={setOpenTaskId}
            renderItemContent={renderTaskContent}
            emptyMessage="No tasks found for this lead."
              onAddClick={() => setShowTaskModal(true)}
              addButtonText="Add Task"
          />
        );

      case "Meetings": {
        const meetingItems = mockData.Meetings.map((meeting, idx) => ({
          id: idx,
          title: 'Meeting',
          preview: `${meeting.subTitle || meeting.description || meeting.note || 'No description'}`,
          date: meeting.date,
          ...meeting
        }));

        return (
          <div>
            <CompanyAccordionContent
              title="Meetings"
              items={meetingItems}
              openItemId={openMeetingId}
              setOpenItemId={setOpenMeetingId}
              onAddClick={handleOpenMeetingModal}
              addButtonText="Add Meeting"
              emptyMessage="No meetings yet."
              renderItemContent={(meeting) => (
                <>
                  <div><strong>Title:</strong> {meeting.title || 'Untitled Meeting'}</div>
                  <div><strong>Type:</strong> {meeting.type || 'General'}</div>
                  {meeting.date && <div><strong>Date:</strong> {new Date(meeting.date).toLocaleDateString()}</div>}
                  {meeting.startTime && meeting.endTime && <div><strong>Time:</strong> {meeting.startTime} - {meeting.endTime}</div>}
                  {meeting.attendees && <div><strong>Attendees:</strong> {meeting.attendees}</div>}
                  {meeting.location && <div><strong>Location:</strong> {meeting.location}</div>}
                  {meeting.reminder && <div><strong>Reminder:</strong> {meeting.reminder}</div>}
                  <div><strong>Description:</strong></div>
                  <div className="meeting-content">{meeting.note || 'No description'}</div>
                </>
              )}
            />
            <LeadMeetings 
              leadId={lead.id}
              leadEmail={lead.email}
              meetings={mockData.Meetings}
              onAddMeeting={handleAddMeeting}
              onDeleteMeeting={handleDeleteMeeting}
              isOpen={showMeetingModal}
              onClose={handleCloseMeetingModal}
              onOpenModal={handleOpenMeetingModal}
            />
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="view-container">
      {/* Left Panel - Lead Info and Actions */}
      <div className="left-panel-wrapper">
        <div className="lead-left-panel">
          {/* Back Button */}
              <span 
            className="company-back-btn back-section"
            onClick={() => navigate('/leads')}
              >
                &lt; Leads
              </span>
          
          {/* Lead Profile - Matching Company Layout */}
          <div className="d-flex align-items-center gap-3 mt-3 mb-3">
              <div className="company-avatar">{lead.firstName.charAt(0)}</div>
                <div>
                <h5 className="mb-0">{lead.firstName} {lead.lastName}</h5>
                <div className="text-muted">{lead.jobTitle}</div>
                  <div className="d-flex align-items-center gap-2">
                  <a
                    href={`mailto:${lead.email}`}
                    className="domain-text domain-link email-link"
                  >
                      {lead.email}
                    </a>
                    <i 
                      className="bi bi-copy copy-icon" 
                      onClick={handleCopyEmail}
                    title="Copy email"
                    ></i>
                  </div>
                </div>
        </div>

              {/* Action Buttons */}
          <div className="action-buttons d-flex justify-content-between mb-4">
                <div className="action-item d-flex flex-column align-items-center">
                  <button className="btn" onClick={() => { setActiveTab("Notes"); setShowNoteModal(true); }}> 
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <div className="action-label">Note</div>
                </div>
                <div className="action-item d-flex flex-column align-items-center">
                  <button className="btn" onClick={() => { setActiveTab("Emails"); setShowEmailModal(true); }}>
                    <i className="bi bi-envelope"></i>
                  </button>
                  <div className="action-label">Email</div>
                </div>
                <div className="action-item d-flex flex-column align-items-center">
                  <button className="btn" onClick={() => { setActiveTab("Calls"); setShowCallModal(true); }}> 
                    <i className="bi bi-telephone"></i>
                  </button>
                  <div className="action-label">Call</div>
                </div>
                <div className="action-item d-flex flex-column align-items-center">
                  <button className="btn" onClick={() => { setActiveTab("Tasks"); setShowTaskModal(true); }}> 
                    <i className="bi bi-check-square"></i>
                  </button>
                  <div className="action-label">Task</div>
                </div>
                <div className="action-item d-flex flex-column align-items-center">
                  <button className="btn" onClick={() => { setActiveTab("Meetings"); handleOpenMeetingModal(); }}>
                <i className="bi bi-calendar-event"></i>
                  </button>
                  <div className="action-label">Meeting</div>
                </div>
              </div>

          {/* About this Lead Section - Matching Company Structure */}
          <div className="company-details__section-title about-toggle">
            <div
              onClick={() => setAboutCollapsed(!aboutCollapsed)}
              className="about-toggle"
            >
              <i className={`bi ${aboutCollapsed ? 'bi-chevron-right' : 'bi-chevron-down'} company-details__toggle-icon`}></i>
              <span>About this Lead</span>
            </div>
            <i
              className="bi bi-pencil-square action-icon edit-icon"
              onClick={(e) => {
                e.stopPropagation();
                handleEditLead();
              }}
            />
              </div>

          {/* Lead Details */}
              {!aboutCollapsed && (
            <div className="company-details__fields">
              <div className="company-details__field">
                <div className="company-details__field-label">Email</div>
                <div className="company-details__field-value">{lead.email}</div>
                  </div>
              <div className="company-details__field">
                <div className="company-details__field-label">First Name</div>
                <div className="company-details__field-value">{lead.firstName}</div>
                  </div>
              <div className="company-details__field">
                <div className="company-details__field-label">Last Name</div>
                <div className="company-details__field-value">{lead.lastName}</div>
                  </div>
              <div className="company-details__field">
                <div className="company-details__field-label">Phone Number</div>
                <div className="company-details__field-value">{lead.phoneNumber}</div>
                  </div>
              <div className="company-details__field">
                <div className="company-details__field-label">Lead Status</div>
                <div className="company-details__field-value">{lead.leadStatus}</div>
                  </div>
              <div className="company-details__field">
                <div className="company-details__field-label">Job Title</div>
                <div className="company-details__field-value">{lead.jobTitle}</div>
                  </div>
              <div className="company-details__field">
                <div className="company-details__field-label">Created Date</div>
                <div className="company-details__field-value">{lead.createdDate}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

      {/* Main Content - Activities and Tabs */}
      <div className="main-content">
        <div className="main-content-wrapper">
          {/* Search Bar and Convert Button Row */}
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div className="search-convert-container">
              <div className="search-bar">
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-search"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search activities"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <button
                className="btn btn-primary convert-button"
                onClick={handleConvertLead}
              >
                Convert
              </button>
            </div>
          </div>

            {/* Tabs */}
          <div className="tabs-wrapper">
            <div className="tabs">
              {["Activity", "Notes", "Emails", "Calls", "Tasks", "Meetings"].map((tab) => (
                <div
                  key={tab}
                  className={`tab ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </div>
              ))}
            </div>
            <div className="tab-content">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - AI Summary and Attachments */}
      <div className="right-panel-wrapper">
        <AISummary className="ai-summary mb-3" />
        <AttachmentsSection 
          attachmentsCollapsed={attachmentsCollapsed} 
          setAttachmentsCollapsed={setAttachmentsCollapsed} 
        />
      </div>

      {/* Edit Lead Dialog */}
      {isEditLeadDialogOpen && (
        <LeadForm 
          onCancel={() => setIsEditLeadDialogOpen(false)}
          onSubmit={handleSaveLead}
          initialData={lead}
        />
      )}

      {/* Lead Notes Modal */}
      {showNoteModal && (
        <LeadNotes 
          leadId={lead.id}
          notes={notes}
          onAddNote={handleAddNote}
          onDeleteNote={handleDeleteNote}
          isModalOpen={showNoteModal}
          onOpenModal={() => setShowNoteModal(true)}
          onCloseModal={() => setShowNoteModal(false)}
        />
      )}

      {/* Lead Calls Modal */}
      <LeadCalls 
        leadId={lead.id}
        leadPhone={lead.phone}
        calls={calls}
        onAddCall={handleAddCall}
        onDeleteCall={(callId) => setCalls(calls.filter(c => c.id !== callId))}
        isModalOpen={showCallModal}
        onOpenModal={() => setShowCallModal(true)}
        onCloseModal={() => setShowCallModal(false)}
      />

      {/* Lead Tasks Modal */}
      <LeadTasks
        leadId={lead.id}
        tasks={tasks}
        onAddTask={handleAddTask}
        onDeleteTask={(taskId) => setTasks(tasks.filter(t => t.id !== taskId))}
        isModalOpen={showTaskModal}
        onOpenModal={() => setShowTaskModal(true)}
        onCloseModal={() => setShowTaskModal(false)}
      />
    </div>
  );
};

export default LeadView;