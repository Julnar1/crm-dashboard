import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FaPen } from "react-icons/fa";
import Pagination from "../components/Pagination";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import CompanyFormDialog from "../components/CompanyFormDialog";
import { 
  selectAllCompanies, 
  createCompany, 
  updateCompany,
  selectCompaniesStatus,
  selectCompaniesLoading,
  selectCompaniesError,
  resetStatus
} from "../redux/slices/companiesSlice";
import { toast } from "react-toastify";

// Extract unique options for filters
const getIndustryOptions = (companies) => Array.from(new Set(companies.map(c => c.industry)));
const getCityOptions = (companies) => Array.from(new Set(companies.map(c => c.city)));
const getCountryOptions = (companies) => Array.from(new Set(companies.map(c => c.country)));

const companiesPerPage = 7;

const CompaniesList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Redux selectors
  const companies = useSelector(selectAllCompanies);
  const status = useSelector(selectCompaniesStatus);
  const loading = useSelector(selectCompaniesLoading);
  const error = useSelector(selectCompaniesError);
  
  // Local state
  const [isCompanyFormDialogOpen, setIsCompanyFormDialogOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  
  const totalPages = Math.max(
    2,
    Math.ceil(companies.length / companiesPerPage)
  );

  const paginatedCompanies = companies.slice(
    (currentPage - 1) * companiesPerPage,
    currentPage * companiesPerPage
  );

  // Get filter options from Redux state
  const industryOptions = getIndustryOptions(companies);
  const cityOptions = getCityOptions(companies);
  const countryOptions = getCountryOptions(companies);

  // Local PaginationDemo function, like in Tickets.js
  function PaginationDemo() {
    return (
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    );
  }

  const handleCreateCompany = () => {
    setSelectedCompany(null);
    setIsCompanyFormDialogOpen(true);
  };

  const handleEditCompany = (company) => {
    setSelectedCompany(company);
    setIsCompanyFormDialogOpen(true);
  };

  const handleSaveCompany = async (companyData) => {
    try {
      if (selectedCompany) {
        // Update existing company
        const updatedCompany = { ...selectedCompany, ...companyData };
        await dispatch(updateCompany(updatedCompany)).unwrap();
        toast.success("Company updated successfully!");
      } else {
        // Create new company
        await dispatch(createCompany(companyData)).unwrap();
        toast.success("Company created successfully!");
      }
      setIsCompanyFormDialogOpen(false);
      setSelectedCompany(null);
      dispatch(resetStatus());
    } catch (error) {
      toast.error(error || "An error occurred");
    }
  };

  return (
    <div className="list-container">
      {/* Header Section*/}
      <div className="list-header border-bottom">
        <h5 className="fw-bold">Companies</h5>
        <div>
          <button className="btn btn-outline-primary me-2 fw-bold px-4 py-2">
            Import
          </button>
          <button className="btn btn-primary px-4 py-2" onClick={handleCreateCompany}>Create</button>
        </div>
      </div>

      {/* Search and Pagination Row */}
      <div className="list-searchbar border-bottom">
        <div className="list-search-input-group input-group rounded-lg">
          <span className="input-group-text border-start-0 border-end-0 bg-transparent">
            <FontAwesomeIcon icon={faSearch} className="text-muted" />
          </span>
          <input
            type="text"
            className="form-control border-start-0 border-end-0 list-search-input"
            placeholder="Search phone, name, city"
            aria-label="Search input"
          />
        </div>
        <PaginationDemo />
      </div>

      {/* Table and Filter Section*/}
      <div className="list-table-filter-container border-top">
        <div className="list-filters d-flex gap-2 mb-2">
          <div className="select-wrapper mr-2">
            <select className="form-select">
              <option>Industry Type</option>
              {industryOptions.map((industry, idx) => (
                <option key={idx}>{industry}</option>
              ))}
            </select>
            <span className="select-chevron"><i className="bi bi-chevron-down"></i></span>
          </div>
          <div className="select-wrapper">
            <select className="form-select mr-2">
              <option>City</option>
              {cityOptions.map((city, idx) => (
                <option key={idx}>{city}</option>
              ))}
            </select>
            <span className="select-chevron"><i className="bi bi-chevron-down"></i></span>
          </div>
          <div className="select-wrapper">
            <select className="form-select">
              <option>Country/Region</option>
              {countryOptions.map((country, idx) => (
                <option key={idx}>{country}</option>
              ))}
            </select>
            <span className="select-chevron"><i className="bi bi-chevron-down"></i></span>
          </div>
          <div className="select-wrapper">
          <select className="form-select">
            <option>Lead Status</option>
            <option>new</option>
            <option>open</option>
            <option>in progress</option> 
          </select>
          <span className="select-chevron"><i className="bi bi-chevron-down"></i></span>
          </div>
          <div className="flatpickr-with-icon">
          <Flatpickr options={{dateFormat: "d-m-Y"}} className="form-control" style={{maxWidth: 160,fontWeight:500}} placeholder="Created Date" />
          <i className="bi bi-calendar calendar-icon"></i>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table list-table align-middle">
            <thead>
              <tr>
                <th>COMPANY NAME</th>
                <th>COMPANY OWNER</th>
                <th>PHONE NUMBER</th>
                <th>INDUSTRY</th>
                <th>CITY</th>
                <th>COUNTRY/REGION</th>
                <th>CREATED DATE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCompanies.map((c, idx) => (
                <tr key={idx}>
                  <td>{c.name}</td>
                  <td>{c.owner}</td>
                  <td>{c.phone}</td>
                  <td>{c.industry}</td>
                  <td>{c.city}</td>
                  <td>{c.country}</td>
                  <td>{c.created}</td>
                  <td>
                    <button className="btn btn-sm btn-link text-primary me-2" onClick={() => handleEditCompany(c)}>
                      <FaPen />
                    </button>
                    <button className="btn btn-sm btn-outline-primary text-primary" onClick={() => navigate(`/companies/${c.id}`)}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <CompanyFormDialog 
        open={isCompanyFormDialogOpen} 
        onClose={() => { 
          setIsCompanyFormDialogOpen(false);
          setSelectedCompany(null);
        }} 
        onSave={handleSaveCompany} 
        initialData={selectedCompany}
        loading={loading}
      /> 
    </div>
  );
};

export default CompaniesList;

 