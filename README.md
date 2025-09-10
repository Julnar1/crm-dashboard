# CRM Dashboard - Leads & Companies Management System

A modern, responsive CRM dashboard built with React and Redux for managing leads and companies with a clean, professional UI.

## 🚀 Live Demo

- **Vercel**: (https://crm-dashboard-ten-peach.vercel.app)
- **GitHub**: (https://github.com/Julnar1/crm-dashboard)

## 📋 Features Implemented

### 🔐 Authentication System
- **Login Page** - Secure user authentication
- **Register Page** - New user registration with validation
- **Forgot Password** - Password reset functionality
- **Reset Password** - Token-based password reset
- **Protected Routes** - Route protection based on authentication status

### 📊 Dashboard
- **Analytics Overview** - Key metrics and statistics
- **Recent Activities** - Latest leads and companies
- **Quick Actions** - Fast access to common tasks
- **Responsive Design** - Works on all device sizes

### 👥 Leads Management
- **Leads List Page** - View all leads with pagination and filtering
- **Lead View Page** - Detailed lead information with 3-panel layout
- **Lead Creation** - Add new leads with comprehensive form validation
- **Lead Editing** - Update lead information with pre-filled forms
- **Lead Conversion** - Convert leads to deals with one click
- **Lead Status Management** - Track lead progression
- **Search & Filter** - Find leads quickly with advanced filtering
- **Activity Tracking** - Notes, calls, tasks, meetings, and emails
- **File Attachments** - Upload and manage lead-related files

### 🏢 Companies Management
- **Companies List Page** - View all companies with pagination
- **Company View Page** - Detailed company information
- **Company Creation** - Add new companies with validation
- **Company Editing** - Update company details
- **Company Activities** - Track all company interactions
- **File Management** - Upload and organize company documents

### 📝 Activity Management
- **Notes System** - Add and manage notes for leads/companies
- **Call Logging** - Record and track phone calls
- **Task Management** - Create and assign tasks
- **Meeting Scheduling** - Schedule and manage meetings
- **Email Integration** - Send and track emails
- **Activity Timeline** - Chronological view of all activities

### 🎨 UI/UX Features
- **Responsive Design** - Mobile-first approach
- **Modern UI Components** - Clean, intuitive interface
- **Loading States** - Smooth user experience
- **Error Handling** - User-friendly error messages
- **Toast Notifications** - Real-time feedback using React Toastify
- **Modal Dialogs** - Clean form interactions
- **Accordion Components** - Organized content display
- **File Upload** - Drag-and-drop file management
- **Search & Filter** - Advanced data filtering capabilities

## 🛠 Tech Stack

### Frontend Framework
- **React 18** - Modern React with hooks and functional components
- **React Router DOM** - Client-side routing
- **Redux Toolkit** - State management
- **React Redux** - React-Redux bindings

### UI & Styling
- **Bootstrap 5** - CSS framework
- **SCSS** - CSS preprocessor
- **Bootstrap Icons** - Icon library
- **React Icons** - Additional icon components

### Form Handling
- **Custom Validation** - Centralized validation system
- **Phone Input** - International phone number input
- **Date Picker** - Flatpickr integration

### Development Tools
- **Create React App** - Development environment
- **ESLint** - Code linting
- **SCSS** - CSS preprocessing

### Third-Party Libraries
- **React Toastify** - Toast notifications for user feedback
- **React Phone Input 2** - Phone number input with country codes
- **React Flatpickr** - Date/time picker component
- **Web Vitals** - Performance monitoring and analytics

## 📦 Dependencies

### Core Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.8.0",
  "@reduxjs/toolkit": "^1.9.0",
  "react-redux": "^8.0.0"
}
```

### UI & Styling
```json
{
  "bootstrap": "^5.2.0",
  "bootstrap-icons": "^1.10.0",
  "react-icons": "^4.7.0",
  "sass": "^1.57.0"
}
```

### Form & Input
```json
{
  "react-phone-input-2": "^2.15.0",
  "react-flatpickr": "^3.10.0",
  "flatpickr": "^4.6.0"
}
```

### Notifications & Utils
```json
{
  "react-toastify": "^9.1.0",
  "web-vitals": "^3.1.0"
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Julnar1/crm-dashboard.git
   cd crm-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🧪 Testing the Application

### 🔐 Authentication Testing

#### **Protected Routes Behavior**
- When you run `npm start`, the application will redirect to the login page
- **Logged-in users** can only access: Dashboard, Leads, and Companies pages
- **Non-logged-in users** will be redirected to login page when trying to access protected routes

#### **Hardcoded Credentials for Testing**
Use these credentials to test successful login:
```
Email: test@example.com
Password: password123
```

#### **Registration Flow Testing**
1. Navigate to `/register` or click "Register" link
2. Fill out the registration form
3. After successful registration, you'll be redirected to login page
4. **Note**: New registrations won't work for login (backend not ready yet)
5. Use hardcoded credentials above for testing

#### **Password Reset Testing**
1. Go to `/forgot-password` or click "Forgot Password" link
2. Enter any email address and click "Save"
3. Check browser console for reset password link
4. Use the hardcoded token: `abc123token`
5. Navigate to: `http://localhost:3000/reset-password/abc123token`
6. **Reset Password Page**: Users can enter a new password and confirm it
7. **After Reset**: Users are redirected to the login page to sign in with new credentials
8. **Note**: Password reset won't work (backend not ready yet)

#### **Direct URL Navigation**
- **Auth pages** (login, register, forgot-password, reset-password): Accessible by direct URL
- **Protected pages** (dashboard, leads, companies): Redirect to login if not authenticated
  
 **Live Demo URLs**:
  - **Login**: `https://crm-dashboard-ten-peach.vercel.app/login` - User authentication page
  - **Register**: `https://crm-dashboard-ten-peach.vercel.app/register` - New user registration page
  - **Forgot Password**: `https://crm-dashboard-ten-peach.vercel.app/forgot-password` - Password reset request page
  - **Reset Password**: `https://crm-dashboard-ten-peach.vercel.app/reset-password/abc123token` - New password entry page
  - **Dashboard**: `https://crm-dashboard-ten-peach.vercel.app/` - Main dashboard (redirects to login if not authenticated)
  - **Leads**: `https://crm-dashboard-ten-peach.vercel.app/leads` - Leads list page (redirects to login if not authenticated)
  - **Companies**: `https://crm-dashboard-ten-peach.vercel.app/companies` - Companies list page (redirects to login if not authenticated)
  - **Deals**: `https://crm-dashboard-ten-peach.vercel.app/deals` - Deals placeholder page (redirects to login if not authenticated)
  - **Tickets**: `https://crm-dashboard-ten-peach.vercel.app/tickets` - Tickets placeholder page (redirects to login if not authenticated)
    
- **Local Development URLs** (for testing):
  - **Login**: `http://localhost:3000/login` - User authentication page
  - **Register**: `http://localhost:3000/register` - New user registration page
  - **Forgot Password**: `http://localhost:3000/forgot-password` - Password reset request page
  - **Reset Password**: `http://localhost:3000/reset-password/abc123token` - New password entry page
  - **Dashboard**: `http://localhost:3000/` - Main dashboard (redirects to login if not authenticated)
  - **Leads**: `http://localhost:3000/leads` - Leads list page (redirects to login if not authenticated)
  - **Companies**: `http://localhost:3000/companies` - Companies list page (redirects to login if not authenticated)
  - **Deals**: `http://localhost:3000/deals` - Deals placeholder page (redirects to login if not authenticated)
  - **Tickets**: `http://localhost:3000/tickets` - Tickets placeholder page (redirects to login if not authenticated)

### 🎨 Design System & Icons

#### **SCSS Architecture**
- **Variables**: `src/styles/_variables.scss` - Colors, spacing, typography
- **Mixins**: `src/styles/_mixins.scss` - Reusable CSS patterns
- **Component Styles**: Individual SCSS files for each component
- **Bootstrap Integration**: Custom SCSS overrides and extensions

#### **Icon Libraries Used**
- **Bootstrap Icons**: Primary icon set for UI elements
- **React Icons**: Additional icons (FontAwesome, etc.)
- **Custom Favicon**: Updated favicon image in `public/favicon.png`

### 📱 Navigation & Module Testing

#### **Dashboard Module**
1. **Access**: Login with hardcoded credentials
2. **Features**: 
   - Analytics overview with KPI cards (Total Leads, Active Deals, Closed Deals, Monthly Revenue)
   - Contact to Deal Conversion funnel visualization
   - Monthly Sales Reports with interactive charts
   - Team Performance Tracking table with export functionality
3. **CSV Export Features**:
   - **Team Performance Export**: Click "Export CSV" button in Team Performance section
   - **Exportable Data**: Employee names, active deals, closed deals, revenue, change percentages
   - **File Format**: Downloads as `team-performance-YYYY-MM-DD.csv`
   - **Excel Compatible**: Can be opened directly in Microsoft Excel or Google Sheets
   - **Toast Notifications**: Success/error feedback for export operations
4. **Navigation**: Click on leads/companies cards to navigate to respective modules

#### **Leads Module**
1. **List Page**: `http://localhost:3000/leads`
   - View all leads with pagination
   - Search and filter functionality
   - Click "Add Lead" to create new lead
   - Click "View" button in any lead row to see detailed view
   - Click edit icon (pencil) in any lead row to edit lead details

2. **View Page**: Click "View" button from leads list
   - **Left Panel**: Lead profile and action buttons (Note, Email, Call, Task, Meeting)
   - **Middle Panel**: Activity tabs (Notes, Emails, Calls, Tasks, Meetings)
   - **Right Panel**: AI summary and file attachments section
   - **Convert Button**: Convert lead to deal (purple button with hover effects)
   - **Search Bar**: Search activities within the lead

3. **Create/Update Operations**:
   - **Create**: Click "Add Lead" → Fill form → Submit
   - **Update**: Click edit icon (pencil) in lead row → Modify form → Submit
   - **Activity Logs**: Add notes, calls, tasks, meetings, emails via action buttons
   - **File Upload**: Drag and drop files in right panel attachments section
   - **Real-time Updates**: Changes reflect immediately in the interface

4. **Lead Management Features**:
   - **Status Updates**: Change lead status and see updates in list
   - **Activity Tracking**: All interactions are logged and displayed
   - **File Management**: Upload and organize lead-related documents
   - **Search & Filter**: Find leads quickly with advanced filtering

#### **Companies Module**
1. **List Page**: `http://localhost:3000/companies`
   - Similar to leads list with pagination
   - Search functionality
   - Click "Add Company" to create new company

2. **View Page**: Click on any company from list
   - **Left Panel**: Company profile and action buttons
   - **Middle Panel**: Activity tabs (Notes, Emails, Calls, Tasks, Meetings)
   - **Right Panel**: AI summary and attachments

3. **Create/Update Operations**:
   - **Create**: Click "Add Company" → Fill form → Submit
   - **Update**: Click edit icon → Modify form → Submit
   - **Activity Logs**: Add notes, calls, tasks, meetings, emails

### 🔄 Activity Management Testing

#### **Notes System**
1. Navigate to any lead/company view page
2. Click "Notes" tab
3. Click "Add Note" button
4. Fill note form and submit
5. **Verification**: Note appears in activity timeline and respective tab section.

#### **Call Logging**
1. Click "Calls" tab
2. Click "Add Call" button
3. Fill call form with duration, participants, notes
4. **Verification**: Call appears in activity timeline with time and respective tab section.

#### **Task Management**
1. Click "Tasks" tab
2. Click "Add Task" button
3. Fill task form with name, assignee, due date, description
4. **Verification**: Task appears in activity timeline with bold formatting and respective tab section.

#### **Meeting Scheduling**
1. Click "Meetings" tab
2. Click "Add Meeting" button
3. Fill meeting form with attendees, time, location, description
4. **Verification**: Meeting appears in activity timeline and respective tab section.

#### **Email Integration**
1. Click "Emails" tab
2. Click "Add Email" button
3. Fill email form with subject, body, recipients
4. **Verification**: Email appears in activity timeline and respective tab section.

### 📊 Data Reflection Testing

#### **List Page Updates**
1. **Create New Lead**: Add lead → Check leads list page
2. **Update Lead Status**: Edit lead → Change status → Check list page
3. **Convert Lead**: Click convert button → Check list page (status changes)

#### **Activity Timeline Updates**
1. **Add Activity**: Create note/call/task/meeting/email
2. **Check Timeline**: Activity appears in chronological order
3. **Real-time Updates**: Changes reflect immediately

#### **Pagination Testing**
1. **Leads List**: Navigate through pages using pagination controls
2. **Companies List**: Test pagination with different page sizes
3. **Search Results**: Pagination works with filtered results

### 🔍 Redux State Testing

#### **State Updates**
1. **Open Browser DevTools** → Redux DevTools Extension
2. **Login Action**: Watch auth state update
3. **Add Lead**: Watch leads state update
4. **Add Activity**: Watch activity state update
5. **Convert Lead**: Watch deals state update

#### **State Persistence**
1. **Refresh Page**: State persists (localStorage)
2. **Navigate Away**: State maintained across pages
3. **Logout**: State clears properly

### 🔔 Toast Notifications Testing

#### **React Toastify Integration**
1. **Success Messages**: Green toast notifications for successful operations
2. **Error Messages**: Red toast notifications for errors and validation failures
4. **Auto-dismiss**: Toasts automatically disappear after 3-5 seconds
5. **Manual Dismiss**: Click the X button to manually close toasts

#### **Toast Triggers**
- **Lead Creation**: "Lead created successfully!" toast
- **Lead Update**: "Lead updated successfully!" toast
- **Lead Conversion**: "Lead converted to deal!" toast
- **Form Validation**: Error toasts for invalid form submissions
- **File Upload**: Success/error toasts for file operations
- **Activity Creation**: Success toasts for notes, calls, tasks, meetings, emails

### 📁 File Upload Testing

#### **Attachments Section (Right Panel)**
1. **Location**: Right panel in lead/company view pages
2. **Upload Methods**:
   - **Drag & Drop**: Drag files directly to the attachments area
   - **Click to Upload**: Click "+ Add" button to open file picker
3. **File Support**: Images, documents, PDFs, spreadsheets, text files
4. **File Management**:
   - **Preview**: Image files show thumbnails
   - **File Info**: Display file name and size
   - **Delete**: Remove uploaded files
5. **Error Handling**: Invalid file types and size limits
6. **Progress**: Upload progress indicators for large files

### 📊 CSV Export Testing

#### **Dashboard Export Functionality**
1. **Location**: Team Performance Tracking section in Dashboard
2. **Export Button**: "Export CSV" button in top-right of team table
3. **Export Process**:
   - Click "Export CSV" button
   - File automatically downloads to default download folder
   - Success toast notification appears
4. **Exported Data**:
   - **File Name**: `team-performance-YYYY-MM-DD.csv`
   - **Columns**: Employee, Active Deals, Closed Deals, Revenue, Change %
   - **Data**: All team members with their performance metrics
5. **File Compatibility**:
   - **Excel**: Opens directly in Microsoft Excel
   - **Google Sheets**: Can be imported into Google Sheets
   - **CSV Viewers**: Works with any CSV-compatible application
6. **Error Handling**:
   - **Success**: Green toast notification "Team performance data exported successfully!"
   - **Error**: Red toast notification "Failed to export team data. Please try again."
7. **File Format**:
   - **Encoding**: UTF-8 for international character support
   - **Delimiter**: Comma-separated values
   - **Quotes**: Properly escaped for special characters
   - **Headers**: Clear column labels in first row

### 🎯 Key Testing Scenarios

#### **Complete User Journey**
1. **Login** → Dashboard → Leads List → Lead View → Add Activity → Convert Lead
2. **Login** → Dashboard → Companies List → Company View → Add Activity
3. **Login** → Dashboard → Search Leads → Filter Results → View Lead

#### **Error Handling**
1. **Invalid Login**: Try wrong credentials
2. **Form Validation**: Submit empty forms
3. **File Upload**: Try invalid file types
4. **Network Issues**: Test offline behavior

#### **Responsive Testing**
1. **Mobile View**: Test on mobile devices
2. **Tablet View**: Test on tablet screens
3. **Desktop View**: Test on large screens
4. **Cross-Browser**: Test on Chrome, Firefox, Safari

### 🚀 Performance Testing

#### **Load Times**
1. **Initial Load**: Time to first contentful paint
2. **Navigation**: Time between page transitions
3. **Form Submission**: Response time for form actions
4. **File Upload**: Upload speed and progress

#### **Memory Usage**
1. **Browser DevTools** → Performance tab
2. **Monitor Memory**: Check for memory leaks
3. **Component Re-renders**: Optimize unnecessary re-renders

### 📝 Testing Checklist

- [ ] Authentication flow works correctly
- [ ] Protected routes redirect properly
- [ ] All forms submit successfully
- [ ] Activity logs update in real-time
- [ ] Pagination works on all list pages
- [ ] Search and filtering function properly
- [ ] File uploads work correctly (drag & drop + click)
- [ ] Responsive design works on all devices
- [ ] Redux state updates correctly
- [ ] Error handling works as expected
- [ ] Performance is acceptable
- [ ] All navigation links work
- [ ] Data persistence works
- [ ] Lead conversion updates status
- [ ] Activity timeline shows chronological order
- [ ] Toast notifications appear for all actions
- [ ] Reset password page works with token
- [ ] Lead view and edit functionality works
- [ ] File attachments display correctly
- [ ] Email subject shows in collapsed entries
- [ ] Convert button has proper hover effects
- [ ] CSV export downloads team performance data
- [ ] CSV file opens correctly in Excel/Google Sheets
- [ ] Export success/error toast notifications work
- [ ] CSV file contains all required columns and data

### Build for Production

```bash
npm run build
# or
yarn build
```

## 📁 Project Structure

```
src/
├── components/           # Reusable components
│   ├── auth/            # Authentication components
│   ├── company/         # Company-specific components
│   └── ...
├── pages/               # Page components
│   ├── leads/          # Leads module pages
│   └── ...
├── redux/              # Redux store and slices
│   └── slices/         # Redux slices
├── styles/             # SCSS stylesheets
│   ├── _variables.scss # SCSS variables
│   ├── _mixins.scss    # SCSS mixins
│   └── ...
├── utils/              # Utility functions
│   ├── validation.js   # Form validation
│   └── formatting.js   # Data formatting
└── ...
```

## 🔧 Development Process

### Phase 1: Project Setup
- Created React app with Create React App
- Set up project structure and folder organization
- Installed and configured dependencies (Redux, React Router, Bootstrap, SCSS)

### Phase 2: Design System & SCSS Architecture
- Created SCSS architecture with variables and mixins
- Implemented responsive design system
- Built reusable UI components
- **SCSS Files Created**:
  - `_variables.scss` - Colors, spacing, typography variables
  - `_mixins.scss` - Reusable CSS patterns and functions
  - `_base.scss` - Base styles and resets
  - `_components.scss` - Component-specific styles
  - `_layout.scss` - Layout and grid systems
  - `_buttons.scss` - Button styles and variants
  - Individual component SCSS files for modularity

### Phase 3: Authentication System
- Developed login/register pages with form validation
- Implemented password reset functionality with token-based system
- Added protected route system with Redux state management
- **Hardcoded Credentials**: `test@example.com` / `password123` for testing
- **Token System**: `abc123token` for password reset testing

### Phase 4: Core Modules (Leads & Companies)
- Built leads management system with CRUD operations
- Created companies management with similar functionality
- Implemented dashboard with analytics and quick actions
- **3-Panel Layout**: Left (profile), Middle (activities), Right (attachments/AI)

### Phase 5: Activity Management System
- Added comprehensive activity tracking:
  - **Notes**: Rich text notes with timestamps
  - **Calls**: Call logging with duration and participants
  - **Tasks**: Task management with assignments and due dates
  - **Meetings**: Meeting scheduling with attendees and descriptions
  - **Emails**: Email composition and tracking
- Created unified activity timeline with chronological ordering

### Phase 6: Advanced Features
- Added file upload functionality with drag-and-drop
- Implemented search and filtering across all modules
- Created lead conversion system (leads → deals)
- Added pagination for list pages
- Implemented real-time data updates

### Phase 7: Code Refactoring & Optimization
- Removed unused files and duplicate code
- Consolidated SCSS styles for better maintainability
- Created reusable components and utility functions
- Optimized Redux state management
- Added comprehensive form validation system
- Performance improvements and bug fixes

## 🏗️ Architecture Details

### **Frontend Architecture**
- **React 18** with functional components and hooks
- **Redux Toolkit** for state management
- **React Router** for client-side routing
- **SCSS** for maintainable styling
- **Bootstrap 5** for responsive UI components

### **State Management**
- **Auth Slice**: User authentication and session management
- **Leads Slice**: Leads data and operations
- **Companies Slice**: Companies data and operations
- **Deals Slice**: Deals data (for lead conversion)
- **Local Storage**: State persistence across sessions

### **Component Structure**
- **Layout Components**: Header, Sidebar, DashboardLayout
- **Page Components**: LeadsPage, CompanyPage, LeadView, etc.
- **Form Components**: LeadForm, CompanyForm, ActivityForms
- **UI Components**: Modals, Accordions, Pagination, Search
- **Auth Components**: Login, Register, ForgotPassword, ResetPassword

### **Styling System**
- **SCSS Variables**: Centralized color, spacing, and typography
- **SCSS Mixins**: Reusable patterns for common styles
- **Component Styles**: Modular SCSS files for each component
- **Bootstrap Integration**: Custom overrides and extensions
- **Responsive Design**: Mobile-first approach with breakpoints

### **Icon System**
- **Bootstrap Icons**: Primary icon set for UI elements
- **React Icons**: Additional icons (FontAwesome, etc.)
- **Custom Favicon**: Updated favicon image
- **Icon Consistency**: Unified icon usage across components

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub/GitLab repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
# Build the project
npm run build

# Deploy to your hosting service
# Upload the 'build' folder to your server
```

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Responsive breakpoints for tablets
- **Desktop**: Full-featured desktop experience
- **Cross-Browser**: Compatible with all modern browsers

## 🔒 Security Features

- **Input Validation**: Client and server-side validation
- **XSS Protection**: Sanitized user inputs
- **Route Protection**: Authenticated access only

## 📈 Performance

- **Code Splitting**: Lazy loading of components
- **Bundle Optimization**: Minimized bundle size
- **Caching**: Efficient data caching

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Julnar**
- GitHub: [@Julnar1](https://github.com/Julnar1)

## 🙏 Acknowledgments

- React team for the amazing framework
- Bootstrap team for the UI components
- All open-source contributors
- Design inspiration from modern CRM systems

---

**Built with ❤️ using React, Redux, and modern web technologies**
```
