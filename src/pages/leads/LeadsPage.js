import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LeadForm from "./LeadForm";
import LeadItem from "./LeadItem";
import Pagination from "../../components/Pagination";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import { useSelector, useDispatch } from 'react-redux';
import { addLead, updateLead } from '../../redux/slices/leadsSlice';
import "../../styles/main.scss"; // ✅ importing main.scss
import { toast } from "react-toastify";

const LeadsPage = () => {
  const leads = useSelector(state => state.leads.leads);
  const navigate = useNavigate();

  // Form state for both create and edit
  const [showForm, setShowForm] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [leadStatusFilter, setLeadStatusFilter] = useState(""); // ✅ Add lead status filter state
  
  const [createdDate, setCreatedDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 7;
  const datepickerRef = useRef();

  const dispatch = useDispatch();

  const handleAddOrEditLead = (lead) => {
    if (editingLead) {
      // Edit mode: update existing lead
      const statusValue = lead.leadStatus
        ? lead.leadStatus.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
        : "New";
      dispatch(updateLead({
        ...editingLead,
        ...lead,
        status: statusValue,
      }));
      toast.success("Lead updated successfully!");
      setShowForm(false); // Close the form after save
      setEditingLead(null); // Reset editing state after save
    } else {
      // Add mode: create new lead
      const statusValue = lead.leadStatus
        ? lead.leadStatus.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
        : "New";
      const newLead = {
        ...lead,
        id: leads.length + 1,
        name: `${lead.firstName} ${lead.lastName}`,
        createdAt: new Date().toISOString().split("T")[0],
        status: statusValue, // Capitalized and formatted status
      };
      dispatch(addLead(newLead));
      const newTotalPages = Math.ceil((leads.length + 1) / leadsPerPage);
      setCurrentPage(newTotalPages); // Focus to the last page after adding
      toast.success("Lead created successfully!");
      setShowForm(false); // Close the form after save
      setEditingLead(null); // Reset editing state after save
    }
  };

  // Edit: open form in-page with lead data
  const handleEditLead = (lead) => {
    setEditingLead(lead);
    setShowForm(true);
  };
  // Create: open form in-page
  const handleCreateLead = () => {
    setShowForm(true);
    setEditingLead(null);
  };

  // ✅ Updated filtering logic to include lead status
  const filteredLeads = leads.filter((lead) => {
    const fullName = `${lead.firstName || ""} ${lead.lastName || ""}`.toLowerCase();
    const email = (lead.email || "").toLowerCase();
    const phone = (lead.phone || "").toLowerCase();
    const term = searchTerm.toLowerCase();

    // Search filter
    const matchesSearch = fullName.includes(term) || email.includes(term) || phone.includes(term);
    
    // Lead status filter - using 'leadStatus' property
    const matchesStatus = !leadStatusFilter || leadStatusFilter === "" || lead.leadStatus === leadStatusFilter;

    return matchesSearch && matchesStatus;
  });

  const indexOfLast = currentPage * leadsPerPage;
  const indexOfFirst = indexOfLast - leadsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);

  // ✅ Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, leadStatusFilter]);

  return (
    <>
      <div className={`${showForm ? "blur-background" : ""} list-container`}>
        {/* Header */}
        <div className="list-header border-bottom">
          <h5 className="fw-bold">Leads</h5>
          <div>
            <button className="btn btn-outline-primary me-2 fw-bold px-4 py-2">Import</button>
            <button className="btn btn-primary px-4 py-2" onClick={handleCreateLead}>Create</button>
          </div>
        </div>

        {/* Search and Pagination */}
        <div className="list-searchbar border-bottom">
          <div className="list-search-input-group input-group rounded-lg">
            <span className="input-group-text border-start-0 border-end-0 bg-transparent">
              <i className="bi bi-search text-muted"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0 border-end-0 list-search-input"
              placeholder="Search phone, name, email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.max(2, Math.ceil(filteredLeads.length / leadsPerPage))}
            onPageChange={setCurrentPage}
          />
        </div>

        {/* Filters */}
        <div className="list-table-filter-container border-top">
          <div className="list-filters d-flex gap-2 mb-2">
            <div className="select-wrapper">
              <select 
                className="form-select"
                value={leadStatusFilter}
                onChange={(e) => setLeadStatusFilter(e.target.value)}
              >
                <option value="">Lead Status</option>
                <option value="Open">Open</option>
                <option value="New">New</option>
                <option value="In Progress">In Progress</option>
                <option value="Converted">Converted</option>
              </select>
              <span className="select-chevron"><i className="bi bi-chevron-down"></i></span>
            </div>
            <div className="flatpickr-with-icon">
              <Flatpickr
                ref={datepickerRef}
                className="form-control"
                placeholder="Created Date"
                options={{ dateFormat: "d-m-Y" }}
                value={createdDate}
                onChange={([date]) => setCreatedDate(date)}
              />
              <i className="bi bi-calendar calendar-icon"></i>
            </div>
          </div>

          {/* Table */}
          <div className="table-responsive">
            <table className="table list-table align-middle">
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>PHONE NUMBER</th>
                  <th>CREATED DATE</th>
                  <th>LEAD STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {currentLeads.map((lead) => (
                  <LeadItem key={lead.id} lead={lead} onEdit={handleEditLead} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Form for both Create and Edit */}
      {showForm && (
        <LeadForm
          onCancel={() => {
            setShowForm(false);
            setEditingLead(null);
          }}
          onSubmit={handleAddOrEditLead}
          initialData={editingLead}
        />
      )}
    </>
  );
};

export default LeadsPage;