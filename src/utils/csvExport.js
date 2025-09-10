/**
 * Utility functions for CSV export functionality
 */

/**
 * Convert data array to CSV format
 * @param {Array} data - Array of objects to convert to CSV
 * @param {Array} columns - Array of column definitions with {key, label}
 * @returns {string} CSV formatted string
 */
export const convertToCSV = (data, columns) => {
  if (!data || data.length === 0) return '';
  
  // Create header row
  const headers = columns.map(col => `"${col.label}"`).join(',');
  
  // Create data rows
  const rows = data.map(row => {
    return columns.map(col => {
      const value = row[col.key] || '';
      // Escape quotes and wrap in quotes
      return `"${String(value).replace(/"/g, '""')}"`;
    }).join(',');
  });
  
  return [headers, ...rows].join('\n');
};

/**
 * Download CSV file
 * @param {string} csvContent - CSV content string
 * @param {string} filename - Name of the file to download
 */
export const downloadCSV = (csvContent, filename) => {
  // Create blob with CSV content
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
  // Create download link
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  // Trigger download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up URL object
  URL.revokeObjectURL(url);
};

/**
 * Export team performance data to CSV
 * @param {Array} teamData - Team performance data array
 */
export const exportTeamPerformanceCSV = (teamData) => {
  const columns = [
    { key: 'name', label: 'Employee' },
    { key: 'active', label: 'Active Deals' },
    { key: 'closed', label: 'Closed Deals' },
    { key: 'revenue', label: 'Revenue' },
    { key: 'change', label: 'Change %' }
  ];
  
  const csvContent = convertToCSV(teamData, columns);
  const filename = `team-performance-${new Date().toISOString().split('T')[0]}.csv`;
  
  downloadCSV(csvContent, filename);
};

/**
 * Export dashboard statistics to CSV
 * @param {Array} statData - Statistics data array
 */
export const exportDashboardStatsCSV = (statData) => {
  const columns = [
    { key: 'label', label: 'Metric' },
    { key: 'value', label: 'Value' }
  ];
  
  const csvContent = convertToCSV(statData, columns);
  const filename = `dashboard-stats-${new Date().toISOString().split('T')[0]}.csv`;
  
  downloadCSV(csvContent, filename);
};

/**
 * Export sales data to CSV
 * @param {Array} salesData - Sales data array
 */
export const exportSalesDataCSV = (salesData) => {
  const columns = [
    { key: 'month', label: 'Month' },
    { key: 'dark', label: 'Dark Segment' },
    { key: 'light', label: 'Light Segment' },
    { key: 'total', label: 'Total' }
  ];
  
  // Add total column to data
  const dataWithTotal = salesData.map(item => ({
    ...item,
    total: item.dark + item.light
  }));
  
  const csvContent = convertToCSV(dataWithTotal, columns);
  const filename = `sales-data-${new Date().toISOString().split('T')[0]}.csv`;
  
  downloadCSV(csvContent, filename);
};

/**
 * Export conversion data to CSV
 * @param {Array} conversionData - Conversion funnel data array
 */
export const exportConversionDataCSV = (conversionData) => {
  const columns = [
    { key: 'label', label: 'Stage' },
    { key: 'value', label: 'Value (%)' },
    { key: 'color', label: 'Color Code' }
  ];
  
  const csvContent = convertToCSV(conversionData, columns);
  const filename = `conversion-funnel-${new Date().toISOString().split('T')[0]}.csv`;
  
  downloadCSV(csvContent, filename);
};
