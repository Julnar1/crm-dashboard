import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { IoPeople, IoBagCheck, IoCash } from "react-icons/io5";
import { BsBagXFill } from "react-icons/bs";
import { 
  exportTeamPerformanceCSV, 
  exportDashboardStatsCSV, 
  exportSalesDataCSV, 
  exportConversionDataCSV 
} from "../utils/csvExport";
import { toast } from "react-toastify";

const statData = [
  {
    label: "Total Leads",
    value: "1,250",
    icon: <IoPeople size="1em" />,
    color: "#6c63ff",
    gradient: "linear-gradient(to top, #ffffff 0%, #ede7ff 50%, #6c63ff 100%)",
  },
  {
    label: "Active Deals",
    value: "136",
    icon: <IoBagCheck size="1em" />,
    color: "#43aa8b",
    gradient: "linear-gradient(to top, #ffffff 0%,  #e6f7f2 50%, #43aa8b 100%)",
  },
  {
    label: "Closed Deals",
    value: "136",
    icon: <BsBagXFill size="0.865em" />,
    color: "#ff4d6d",
    gradient: "linear-gradient(to top, #ffffff 0%,  #ffe6ec 50%, #ff4d6d 100%)",
  },
  {
    label: "Monthly Revenue",
    value: "45,000",
    icon: <IoCash size="1em" />,
    color: "#ffb347",
    gradient: "linear-gradient(to top, #ffffff 0%,  #fff5e6 50%, #ffb347 100%)",
  },
];

const conversionData = [
  { label: "Contact", color: "#6c63ff", value: 80 },
  { label: "Qualified Lead", color: "#5bc0be", value: 60 },
  { label: "Proposal Sent", color: "#ffd600", value: 50 },
  { label: "Negotiation", color: "#3c30ff", value: 30 },
  { label: "Closed Won", color: "#43aa8b", value: 20 },
  { label: "Closed Lost", color: "#ff4d6d", value: 10 },
];

// Example sales data
const salesData = [
  { month: "Jan", dark: 2000, light: 2000 },
  { month: "Feb", dark: 1200, light: 1800 },
  { month: "Mar", dark: 2500, light: 2500 },
  { month: "Apr", dark: 1500, light: 2000 },
  { month: "May", dark: 1000, light: 1000 },
  { month: "Jun", dark: 1200, light: 1300 },
  { month: "Jul", dark: 1500, light: 1500 },
  { month: "Aug", dark: 2000, light: 2000 },
  { month: "Sep", dark: 3000, light: 3000 },
  { month: "Oct", dark: 1700, light: 1800 },
  { month: "Nov", dark: 1600, light: 1600 },
  { month: "Dec", dark: 2100, light: 2000 },
];

const teamData = [
  {
    name: "Ethan Harper",
    active: 25,
    closed: 10,
    revenue: "$12,000",
    change: "+3.3%",
  },
  {
    name: "Olivia Bennett",
    active: 30,
    closed: 15,
    revenue: "$15,000",
    change: "-0.1%",
  },
  {
    name: "Liam Carter",
    active: 22,
    closed: 12,
    revenue: "$10,000",
    change: "+3.4%",
  },
  {
    name: "Sophia Evans",
    active: 28,
    closed: 14,
    revenue: "$14,000",
    change: "-0.3%",
  },
];

const Dashboard = () => {
  // Handle CSV export for team performance
  const handleExportTeamCSV = () => {
    try {
      exportTeamPerformanceCSV(teamData);
      toast.success('Team performance data exported successfully!');
    } catch (error) {
      console.error('Error exporting team CSV:', error);
      toast.error('Failed to export team data. Please try again.');
    }
  };

  // Handle CSV export for dashboard stats
  const handleExportStatsCSV = () => {
    try {
      exportDashboardStatsCSV(statData);
      toast.success('Dashboard statistics exported successfully!');
    } catch (error) {
      console.error('Error exporting stats CSV:', error);
      toast.error('Failed to export statistics. Please try again.');
    }
  };

  // Handle CSV export for sales data
  const handleExportSalesCSV = () => {
    try {
      exportSalesDataCSV(salesData);
      toast.success('Sales data exported successfully!');
    } catch (error) {
      console.error('Error exporting sales CSV:', error);
      toast.error('Failed to export sales data. Please try again.');
    }
  };

  // Handle CSV export for conversion data
  const handleExportConversionCSV = () => {
    try {
      exportConversionDataCSV(conversionData);
      toast.success('Conversion funnel data exported successfully!');
    } catch (error) {
      console.error('Error exporting conversion CSV:', error);
      toast.error('Failed to export conversion data. Please try again.');
    }
  };

  return (
    <div className="dashboard__container" role="main" style={{ marginTop: 0, paddingTop: 0 }}>
      {/* Stat Cards */}
      <section aria-label="Statistics overview" className="dashboard__stats" style={{ marginTop: 0, paddingTop: 0 }}>
        {statData.map((stat, idx) => (
          <div key={stat.label} className="dashboard__stat-card">
            <div className="stat-card__content">
              <div className="stat-card__label">{stat.label}</div>
              <div className="stat-card__value">{stat.value}</div>
            </div>
            <div 
              className="stat-card__icon"
              style={{
                background: stat.gradient,
                color: stat.color,
              }}
            >
              {stat.icon}
            </div>
          </div>
        ))}
      </section>

      {/* Dashboard metrics and reports */}
      <section aria-label="Dashboard metrics and reports" className="dashboard__metrics">
        {/* Contact to Deal Conversion*/}
        <section aria-label="Conversion metrics" className="dashboard__conversion">
          <div className="conversion__title">Contact to Deal Conversion</div>
          {conversionData.map((step) => (
            <div key={step.label} className="conversion__item">
              <div className="conversion__label">{step.label}</div>
              <div className="conversion__bar">
                <div
                  className="conversion__fill"
                  style={{ 
                    width: `${step.value}%`,
                    backgroundColor: step.color
                  }}
                />
              </div>
            </div>
          ))}
        </section>

        {/* Sales Reports Chart */}
        <section aria-label="Sales reports" className="dashboard__sales">
          <div className="sales__header">
            <div className="sales__title">Sales Reports</div>
            <div className="sales__filter">
              <select className="form-select w-auto small">
                <option>Monthly</option>
                <option>Quarterly</option>
              </select>
            </div>
          </div>
          <div className="sales__chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                {/* Bottom (dark) bar */}
                <Bar
                  dataKey="dark"
                  stackId="a"
                  fill="#6c63ff"
                  radius={[4, 4, 0, 0]}
                  barSize={24}
                />
                {/* Top (light) bar */}
                <Bar
                  dataKey="light"
                  stackId="a"
                  fill="#b3b6fd"
                  radius={[4, 4, 0, 0]}
                  barSize={24}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </section>

      {/* Team Performance Tracking */}
      <section aria-label="Team performance tracking" className="dashboard__team">
        <div className="team__header">
          <div className="team__title">Team Performance Tracking</div>
          <button className="team__export" onClick={handleExportTeamCSV}>
            Export CSV
          </button>
        </div>
        <table className="team__table">
          <thead className="team__thead">
            <tr>
              <th>Employee</th>
              <th>Active Deals</th>
              <th>Closed Deals</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody className="team__tbody">
            {teamData.map((row, index) => (
              <tr key={row.name}>
                <td>{row.name}</td>
                <td>{row.active}</td>
                <td>{row.closed}</td>
                <td>
                  {row.revenue}
                  <span
                    className={`team__change ${
                      row.change.startsWith("+") ? "team__change--positive" : "team__change--negative"
                    }`}
                  >
                    {row.change}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Dashboard;
