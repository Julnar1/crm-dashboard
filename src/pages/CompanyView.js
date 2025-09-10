import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CompanyNoteDialog from '../components/CompanyNoteDialog';
import CompanyEmailDialog from '../components/CompanyEmailDialog';
import CompanyCallDialog from '../components/CompanyCallDialog';
import CompanyTaskDialog from '../components/CompanyTaskDialog';
import CompanyMeetingDialog from '../components/CompanyMeetingDialog';
import CompanyFormDialog from '../components/CompanyFormDialog';
import CompanyLeftPanel from '../components/company/CompanyLeftPanel';
import CompanyMainContent, { CompanyActivityContent, CompanyAccordionContent } from '../components/company/CompanyMainContent';
import CompanyRightPanel from '../components/company/CompanyRightPanel';
import { 
  selectCompanyById, 
  updateCompany,
  selectCompaniesStatus,
  selectCompaniesLoading,
  selectCompaniesError,
  resetStatus
} from '../redux/slices/companiesSlice';
import '../styles/_companyPage.scss';
import { toast } from 'react-toastify';

const CompanyView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  // Redux selectors
  const companyData = useSelector(state => selectCompanyById(state, id));
  const status = useSelector(selectCompaniesStatus);
  const loading = useSelector(selectCompaniesLoading);
  const error = useSelector(selectCompaniesError);
  
  const [selectedTab, setSelectedTab] = useState("Activity");
  const [attachmentsOpen, setAttachmentsOpen] = useState(true);
  const [openItemId, setOpenItemId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Interaction popup states
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  
  // Edit company dialog state
  const [isEditCompanyDialogOpen, setIsEditCompanyDialogOpen] = useState(false);
  
  // Dynamic data states
  const [companyNotes, setCompanyNotes] = useState([]);
  const [companyEmails, setCompanyEmails] = useState([]);
  const [companyCalls, setCompanyCalls] = useState([]);
  const [companyTasks, setCompanyTasks] = useState([]);
  const [companyMeetings, setCompanyMeetings] = useState([]);

  // Modal handlers
  const showInteractionPopup = (type) => {
    switch (type) {
      case 'Note':
        setIsNoteModalOpen(true);
        break;
      case 'Email':
        setIsEmailModalOpen(true);
        break;
      case 'Call':
        setIsCallModalOpen(true);
        break;
      case 'Task':
        setIsTaskModalOpen(true);
        break;
      case 'Meeting':
        setIsMeetingModalOpen(true);
        break;
      default:
        break;
    }
  };

  // Edit company handler
  const handleEditCompany = (companyData) => {
    setIsEditCompanyDialogOpen(true);
  };

  // Save company handler
  const handleSaveCompany = async (updatedCompanyData) => {
    try {
      const updatedCompany = { ...companyData, ...updatedCompanyData };
      await dispatch(updateCompany(updatedCompany)).unwrap();
      toast.success("Company updated successfully!");
      setIsEditCompanyDialogOpen(false);
      dispatch(resetStatus());
    } catch (error) {
      toast.error(error || "An error occurred while updating company");
    }
  };

  // Save handlers
  const handleSaveNote = (newNote) => {
    setCompanyNotes(prev => [newNote, ...prev]);
  };

  const handleSaveEmail = (newEmail) => {
    setCompanyEmails(prev => [newEmail, ...prev]);
  };

  const handleSaveCall = (newCall) => {
    setCompanyCalls(prev => [newCall, ...prev]);
  };

  const handleSaveTask = (newTask) => {
    setCompanyTasks(prev => [newTask, ...prev]);
  };

  const handleSaveMeeting = (newMeeting) => {
    setCompanyMeetings(prev => [newMeeting, ...prev]);
  };

  // Function to organize newly created items for Activity tab
  const getActivityData = () => {
    const activityData = {
      upcoming: [
        {
          id: 1,
          type: "Task",
          title: "Task assigned to Alice",
          subTitle: "Review client proposal",
          description: "Task assigned to Alice",
          status: "Pending",
          assignedTo: "Alice",
          date: "2025-06-24T17:30:00Z",
          isOverdue: true
        },
        {
          id: 2,
          type: "Task",
          title: "Task assigned to Alice", 
          subTitle: "Send treatment estimate",
          description: "Task assigned to Alice",
          status: "In Progress",
          assignedTo: "Alice",
          date: "2025-06-24T17:30:00Z",
          isOverdue: true
        }
      ],
      "July 2025": [
        {
          id: 7,
          type: "Email",
          title: "Email tracking",
          description: "Follow up email sent to client",
          to: "client@example.com",
          subject: "Project Update",
          body: "Follow up email sent to client",
          date: "2025-07-15T10:30:00Z"
        },
        {
          id: 8,
          type: "Call",
          title: "Call with John Smith",
          description: "Discussed project timeline and deliverables",
          with: "John Smith",
          summary: "Discussed project timeline and deliverables",
          duration: "20 minutes",
          date: "2025-07-10T14:00:00Z"
        }
      ],
      "June 2025": [
        {
          id: 3,
          type: "Call",
          title: "Call from Maria Johnson",
          description: "Brought Maria through our latest product line. She's interested and is going to get back to me.",
          with: "Maria Johnson",
          summary: "Brought Maria through our latest product line. She's interested and is going to get back to me.",
          duration: "15 minutes",
          date: "2025-06-24T17:30:00Z"
        },
        {
          id: 4,
          type: "Meeting",
          title: "Meeting Maria Johnson and Jane Cooper",
          description: "Let's discuss our new product line.",
          attendees: "Maria Johnson, Jane Cooper",
          meetingDescription: "Let's discuss our new product line.",
          date: "2025-06-24T17:30:00Z"
        },
        {
          id: 5,
          type: "Email",
          title: "Email tracking",
          description: "Jane Cooper opened Hello there",
          to: "jane.cooper@example.com",
          subject: "Hello there",
          body: "Jane Cooper opened Hello there",
          date: "2025-06-24T17:30:00Z"
        },
        {
          id: 6,
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
    if (companyTasks.length > 0) {
      const newTasks = companyTasks.map(task => ({
        id: task.id,
        type: "Task",
        title: `Task assigned to ${task.assignedTo}`,
        subTitle: task.title,
        description: task.note,
        status: task.status || "Pending",
        assignedTo: task.assignedTo,
        date: task.createdAt,
        isOverdue: new Date(task.createdAt) < new Date()
      }));
      activityData.upcoming = [...newTasks, ...activityData.upcoming];
    }

    // Add newly created items to current month section
    const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
    
    // Add new notes
    if (companyNotes.length > 0) {
      const newNotes = companyNotes.map(note => ({
        id: note.id,
        type: "Note",
        title: `Note by ${note.author || "Jane Cooper"}`,
        description: note.content,
        content: note.content,
        author: note.author || "Jane Cooper",
        date: note.createdAt
      }));
      if (!activityData[currentMonth]) {
        activityData[currentMonth] = [];
      }
      activityData[currentMonth] = [...newNotes, ...activityData[currentMonth]];
    }

    // Add new emails
    if (companyEmails.length > 0) {
      const newEmails = companyEmails.map(email => ({
        id: email.id,
        type: "Email",
        title: "Email tracking",
        description: email.body, // Use actual email body content like hardcoded data
        to: email.to,
        subject: email.subject,
        body: email.body,
        date: email.createdAt
      }));
      if (!activityData[currentMonth]) {
        activityData[currentMonth] = [];
      }
      activityData[currentMonth] = [...newEmails, ...activityData[currentMonth]];
    }

    // Add new calls
    if (companyCalls.length > 0) {
      const newCalls = companyCalls.map(call => ({
        id: call.id,
        type: "Call",
        title: `Call with ${call.with}`,
        description: call.summary,
        with: call.with,
        summary: call.summary,
        duration: call.duration,
        date: call.createdAt
      }));
      if (!activityData[currentMonth]) {
        activityData[currentMonth] = [];
      }
      activityData[currentMonth] = [...newCalls, ...activityData[currentMonth]];
    }

    // Add new meetings
    if (companyMeetings.length > 0) {
      const newMeetings = companyMeetings.map(meeting => ({
        id: meeting.id,
        type: "Meeting",
        title: `Meeting ${meeting.attendees}`,
        description: meeting.description,
        attendees: meeting.attendees,
        meetingDescription: meeting.description,
        date: meeting.createdAt
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
        id: 1,
        content: "Some note in this note",
        date: "2025-07-05T12:30:00Z",
        author: "Maria Johnson"
      },
      {
        id: 2,
        content: "error not found",
        date: "2025-07-06T14:00:00Z",
        author: "John Smith"
      },
      ...companyNotes.map(note => ({
        ...note,
        date: note.createdAt || note.date // Ensure date field exists
      }))
    ],
    Emails: [
      {
        id: 1,
        to: "client@example.com",
        subject: "Follow up on treatment",
        body: "Hi, just checking in...",
        date: "2025-07-05T13:00:00Z"
      },
      {
        id: 2,
        to: "client2@example.com",
        subject: "Quotation attached",
        body: "Please find the quotation.",
        date: "2025-07-05T14:30:00Z"
      },
      ...companyEmails.map(email => ({
        ...email,
        date: email.createdAt || email.date // Ensure date field exists
      }))
    ],
    Calls: [
      {
        id: 1,
        with: "client name",
        summary: "Discussed dental plan",
        duration: "5 minutes",
        date: "2025-07-05T12:30:00Z"
      },
      {
        id: 2,
        with: "client2",
        summary: "Follow-up on root canal",
        duration: "10 minutes",
        date: "2025-07-06T14:00:00Z"
      },
      ...companyCalls.map(call => ({
        ...call,
        date: call.createdAt || call.date // Ensure date field exists
      }))
    ],
    Tasks: [
      {
        id: 1,
        title: "Send treatment estimate",
        status: "Pending",
        assignedTo: "Alice",
        date: "2025-07-05T10:00:00Z"
      },
      {
        id: 2,
        title: "Update invoice details",
        status: "Completed",
        assignedTo: "Bob",
        date: "2025-07-04T15:00:00Z"
      },
      {
        id: 3,
        title: "Review client proposal",
        status: "In Progress",
        assignedTo: "Alice",
        date: "2025-07-03T09:00:00Z"
      },
      ...companyTasks.map(task => ({
        ...task,
        date: task.createdAt || task.date // Ensure date field exists
      }))
    ],
    Meetings: [
      {
        id: 1,
        title: "Dental consultation",
        date: "2025-07-07",
        startTime: "16:00",
        endTime: "17:00",
        attendees: "husni, Dr. Ameen, client",
        location: "Conference Room A",
        reminder: "15min",
        description: "Discuss treatment options",
        note: "Discuss treatment options",
        createdAt: "2025-07-07T16:00:00Z"
      },
      {
        id: 2,
        title: "Post-treatment review",
        date: "2025-07-08",
        startTime: "15:00",
        endTime: "16:00",
        attendees: "husni, client",
        location: "Zoom",
        reminder: "30min",
        description: "Review progress and suggest next steps",
        note: "Review progress and suggest next steps",
        createdAt: "2025-07-08T15:00:00Z"
      },
      ...companyMeetings.map(meeting => ({
        ...meeting,
        date: meeting.createdAt || meeting.date // Ensure date field exists
      }))
    ]
  };

  // Define tab list and generate tab content with accordion
  const tabList = ["Activity", "Notes", "Emails", "Calls", "Tasks", "Meetings"];
  
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
        return <div><strong>Content:</strong> {item.content}</div>;
      case "Call":
        return (
          <div>
            <div><strong>With:</strong> {item.with}</div>
            <div><strong>Summary:</strong> {item.summary || item.notes}</div>
            <div><strong>Duration:</strong> {item.duration}</div>
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

  const renderNoteContent = (item) => (
    <div>
      <div><strong>Author:</strong> {item.author || "Jane Cooper"}</div>
      <div><strong>Content:</strong> {item.content}</div>
    </div>
  );

  const renderEmailContent = (item) => (
    <div>
      <div><strong>To:</strong> {item.to || item.recipients}</div>
      <div><strong>Subject:</strong> {item.subject}</div>
      <div><strong>Body:</strong> {item.body}</div>
    </div>
  );

  const renderCallContent = (item) => (
    <div>
      <div><strong>With:</strong> {item.with}</div>
      <div><strong>Summary:</strong> {item.summary || item.notes}</div>
      <div><strong>Duration:</strong> {item.duration}</div>
      {item.date && <div><strong>Date:</strong> {item.date}</div>}
      {item.time && <div><strong>Time:</strong> {item.time}</div>}
      {item.status && <div><strong>Status:</strong> {item.status}</div>}
      {item.type && <div><strong>Type:</strong> {item.type}</div>}
    </div>
  );

  const renderTaskContent = (item) => (
    <div>
      <div><strong>Title:</strong> {item.title || item.name}</div>
      <div><strong>Status:</strong> {item.status}</div>
      <div><strong>Assigned To:</strong> {item.assignedTo || item.assignee}</div>
      {item.dueDate && <div><strong>Due Date:</strong> {item.dueDate}</div>}
      {item.dueTime && <div><strong>Due Time:</strong> {item.dueTime}</div>}
      {item.type && <div><strong>Type:</strong> {item.type}</div>}
      {item.priority && <div><strong>Priority:</strong> {item.priority}</div>}
      {item.note && <div><strong>Note:</strong> {item.note}</div>}
    </div>
  );

  const renderMeetingContent = (item) => (
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

  const tabContent = {
    Activity: (
      <CompanyActivityContent
        activityData={mockData.Activity}
        openItemId={openItemId}
        setOpenItemId={setOpenItemId}
        renderItemContent={renderActivityContent}
      />
    ),
    Notes: (
      <CompanyAccordionContent
        items={mockData.Notes}
        openItemId={openItemId}
        setOpenItemId={setOpenItemId}
        renderItemContent={renderNoteContent}
        emptyMessage="No notes found for this company."
        onAddClick={() => showInteractionPopup("Note")}
        addButtonText="Add Note"
      />
    ),
    Emails: (
      <CompanyAccordionContent
        items={mockData.Emails}
        openItemId={openItemId}
        setOpenItemId={setOpenItemId}
        renderItemContent={renderEmailContent}
        emptyMessage="No emails found for this company."
        onAddClick={() => showInteractionPopup("Email")}
        addButtonText="Add Email"
      />
    ),
    Calls: (
      <CompanyAccordionContent
        items={mockData.Calls}
        openItemId={openItemId}
        setOpenItemId={setOpenItemId}
        renderItemContent={renderCallContent}
        emptyMessage="No calls found for this company."
        onAddClick={() => showInteractionPopup("Call")}
        addButtonText="Add Call"
      />
    ),
    Tasks: (
      <CompanyAccordionContent
        items={mockData.Tasks}
        openItemId={openItemId}
        setOpenItemId={setOpenItemId}
        renderItemContent={renderTaskContent}
        emptyMessage="No tasks found for this company."
        onAddClick={() => showInteractionPopup("Task")}
        addButtonText="Add Task"
      />
    ),
    Meetings: (
      <CompanyAccordionContent
        items={mockData.Meetings}
        openItemId={openItemId}
        setOpenItemId={setOpenItemId}
        renderItemContent={renderMeetingContent}
        emptyMessage="No meetings found for this company."
        onAddClick={() => showInteractionPopup("Meeting")}
        addButtonText="Add Meeting"
      />
    ),
  };

  // Show loading or error state if company not found
  if (!companyData) {
    return (
      <div className="company-view-container">
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <div className="text-center">
            <h4>Company not found</h4>
            <p>The company you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="company-view-container">
        <div className="company-left-panel-wrapper">
          <CompanyLeftPanel 
            companyData={companyData} 
            onOpenModal={showInteractionPopup}
            onEditCompany={handleEditCompany}
          />
        </div>
        
        <div className="company-main-content">
          
          <CompanyMainContent 
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            tabList={tabList}
            tabContent={tabContent}
            openItemId={openItemId}
            setOpenItemId={setOpenItemId}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
        
        <div className="company-right-panel-wrapper">
          <CompanyRightPanel 
            attachmentsOpen={attachmentsOpen}
            setAttachmentsOpen={setAttachmentsOpen}
          />
        </div>
      </div>

      {/* Dialog Components */}
      <CompanyNoteDialog 
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        onSave={handleSaveNote}
        companyData={companyData}
      />
      
      <CompanyEmailDialog 
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        onSend={handleSaveEmail}
        companyData={companyData}
      />
      
      <CompanyCallDialog 
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
        onSave={handleSaveCall}
        companyData={companyData}
      />
      
      <CompanyTaskDialog 
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSave={handleSaveTask}
        companyData={companyData}
      />
      
      <CompanyMeetingDialog 
        isOpen={isMeetingModalOpen}
        onClose={() => setIsMeetingModalOpen(false)}
        onSave={handleSaveMeeting}
        companyData={companyData}
      />

      {/* Edit Company Dialog */}
      <CompanyFormDialog 
        open={isEditCompanyDialogOpen}
        onClose={() => setIsEditCompanyDialogOpen(false)}
        onSave={handleSaveCompany}
        initialData={companyData}
        loading={loading}
      />
    </>
  );
};

export default CompanyView; 