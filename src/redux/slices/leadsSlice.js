import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  leads: [
    {
      id: 1,
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice@example.com",
      phone: "1234567890",
      status: "Open",
      jobTitle: "Marketing Manager",
      contactOwner: "owner1",
      createdAt: "2025-06-30",
      activities: [
        { type: "Call", detail: "Call from Sales", date: "July 3", time: "2PM" },
        { type: "Task", detail: "Prepare campaign report", date: "July 4", time: "11AM" }
      ]
    },
    {
      id: 2,
      firstName: "Bob",
      lastName: "Smith",
      email: "bobsmith@example.com",
      phone: "9876543210",
      status: "In Progress",
      jobTitle: "Software Engineer",
      contactOwner: "owner2",
      createdAt: "2025-07-01",
      activities: [
        { type: "Meeting", detail: "Tech Demo Meeting", date: "July 5", time: "3PM" },
        { type: "Email", detail: "Bob Smith replied to project brief", date: "July 6", time: "9AM" }
      ]
    },
    {
      id: 3,
      firstName: "Sara",
      lastName: "Williams",
      email: "sara.w@example.com",
      phone: "9988776655",
      status: "New",
      jobTitle: "Product Manager",
      contactOwner: "owner3",
      createdAt: "2025-07-02",
      activities: [
        { type: "Call", detail: "Final wrap-up call", date: "July 4", time: "1PM" },
        { type: "Note", detail: "Client satisfied with delivery", date: "July 4", time: "1:30PM" }
      ]
    },
    {
      id: 4,
      firstName: "Emma",
      lastName: "Davis",
      email: "emma.davis@example.com",
      phone: "7766554433",
      status: "New",
      jobTitle: "Business Analyst",
      contactOwner: "owner1",
      createdAt: "2025-07-03",
      activities: [
        { type: "Email", detail: "Emma Davis received project proposal", date: "July 3", time: "10AM" },
        { type: "Task", detail: "Schedule kick-off meeting", date: "July 4", time: "4PM" }
      ]
    },
    {
      id: 5,
      firstName: "Alan",
      lastName: "Johnson",
      email: "alice@example.com",
      phone: "1234567890",
      status: "Open",
      jobTitle: "Marketing Manager",
      contactOwner: "owner2",
      createdAt: "2025-06-30",
      activities: [
        { type: "Call", detail: "Call from Sales", date: "July 3", time: "2PM" },
        { type: "Task", detail: "Prepare campaign report", date: "July 4", time: "11AM" }
      ]
    },
    {
      id: 6,
      firstName: "Boss",
      lastName: "Smith",
      email: "bobsmith@example.com",
      phone: "9876543210",
      status: "In Progress",
      jobTitle: "Software Engineer",
      contactOwner: "owner3",
      createdAt: "2025-07-01",
      activities: [
        { type: "Meeting", detail: "Tech Demo Meeting", date: "July 5", time: "3PM" },
        { type: "Email", detail: "Bob Smith replied to project brief", date: "July 6", time: "9AM" }
      ]
    },
    {
      id: 7,
      firstName: "Sona",
      lastName: "Williams",
      email: "sara.w@example.com",
      phone: "9988776655",
      status: "New",
      jobTitle: "Product Manager",
      contactOwner: "owner1",
      createdAt: "2025-07-02",
      activities: [
        { type: "Call", detail: "Final wrap-up call", date: "July 4", time: "1PM" },
        { type: "Note", detail: "Client satisfied with delivery", date: "July 4", time: "1:30PM" }
      ]
    },
    {
      id: 8,
      firstName: "Roy",
      lastName: "Davis",
      email: "emma.davis@example.com",
      phone: "7766554433",
      status: "Converted",
      jobTitle: "Business Analyst",
      contactOwner: "owner2",
      createdAt: "2025-07-03",
      activities: [
        { type: "Email", detail: "Emma Davis received project proposal", date: "July 3", time: "10AM" },
        { type: "Task", detail: "Schedule kick-off meeting", date: "July 4", time: "4PM" }
      ]
    }
  ],
};

const leadsSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {
    setLeads(state, action) {
      state.leads = action.payload;
    },
    addLead(state, action) {
      state.leads.push(action.payload);
    },
    updateLead(state, action) {
      const idx = state.leads.findIndex(l => l.id === action.payload.id);
      if (idx !== -1) state.leads[idx] = action.payload;
    },
    // Add more reducers as needed (deleteLead, etc.)
  },
});

export const { setLeads, addLead, updateLead } = leadsSlice.actions;
export default leadsSlice.reducer;
