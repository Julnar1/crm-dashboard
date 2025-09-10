// Utility functions for formatting data

/**
 * Format file size in bytes to human readable format
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size (e.g., "1.2 KB", "3.4 MB")
 */
export const formatSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

/**
 * Format date to a readable string
 * @param {string|Date} date - Date to format
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 */
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  };
  
  return new Date(date).toLocaleString(undefined, { ...defaultOptions, ...options });
};

/**
 * Format attendees list with proper conjunction
 * @param {string} attendees - Comma-separated attendees string
 * @returns {string} Formatted attendees string with "and" before last item
 */
export const formatAttendees = (attendees) => {
  if (!attendees) return '';
  
  const attendeeList = attendees.split(',').map(a => a.trim()).filter(a => a);
  
  if (attendeeList.length <= 1) return attendees;
  if (attendeeList.length === 2) return attendeeList.join(' and ');
  
  const lastAttendee = attendeeList.pop();
  return `${attendeeList.join(', ')} and ${lastAttendee}`;
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @param {string} suffix - Suffix to add (default: '...')
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100, suffix = '...') => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength - suffix.length) + suffix;
};
