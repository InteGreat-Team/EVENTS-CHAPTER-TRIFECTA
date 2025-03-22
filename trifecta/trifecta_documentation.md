# Trifecta Application Documentation

## Table of Contents

-   [Project Overview](#project-overview)
-   [Technology Stack](#technology-stack)
-   [Architecture](#architecture)
-   [Project Architecture](#project-architecture)
-   [Key Components - Detailed Functionality](#key-components---detailed-functionality)
    -   [Authentication Components](#authentication-components)
    -   [Navigation Components](#navigation-components)
    -   [Modal Components](#modal-components)
    -   [Input Components](#input-components)
    -   [Button Components](#button-components)
    -   [Procurement Components](#procurement-components)
    -   [Event Management Components](#event-management-components)
    -   [Chapter Management Components](#chapter-management-components)
    -   [Analytics Components](#analytics-components)
    -   [Custom Hooks](#custom-hooks)
    -   [Utility Functions](#utility-functions)
-   [Pages - Detailed Functionality](#pages---detailed-functionality)
    -   [Authentication Pages](#authentication-pages)
    -   [Event Management Pages](#event-management-pages)
    -   [Procurement Pages](#procurement-pages)
    -   [Chapter Management Pages](#chapter-management-pages)
    -   [Analytics Pages](#analytics-pages)
    -   [Administration Pages](#administration-pages)
-   [Server Functionality](#server-functionality)
-   [Firebase Integration](#firebase-integration)
-   [Styling with Tailwind](#styling-with-tailwind)
-   [Power BI Integration](#power-bi-integration)
-   [User Roles and Features](#user-roles-and-features)
    -   [Administrator](#administrator)
    -   [Event Manager](#event-manager)
    -   [Chapter Leader](#chapter-leader)
    -   [Procurement Officer](#procurement-officer)
-   [File Upload Workflow](#file-upload-workflow)
-   [Installation and Setup](#installation-and-setup)
-   [Development Guidelines](#development-guidelines)

## Project Overview

Trifecta is a comprehensive event management and analytics platform designed to streamline event organization, chapter management, and procurement processes. The system provides robust features for tracking purchase requests, managing orders, and analyzing event data through integrated analytics tools. It serves as a centralized solution for organizations to efficiently manage their events, chapters, and procurement workflow.

## Technology Stack

-   **Frontend**: React.js with Vite, functional components and hooks
-   **Styling**: TailwindCSS with custom configuration
-   **Backend**: Express.js server with RESTful API endpoints
-   **Database**: Firebase Firestore
-   **Storage**: Firebase Storage for file attachments and images
-   **Authentication**: Firebase Auth for secure user management
-   **Analytics**: Power BI embed integration for data visualization
-   **HTTP Client**: Axios for API requests
-   **Date Handling**: React-DatePicker for date inputs
-   **Form Validation**: Custom validation with React hooks

## Architecture

Trifecta follows a modern frontend architecture using React with Vite as the build tool. The application is structured as follows:

```
trifecta/
├── public/              # Static assets
├── src/                 # Source code
│   ├── components/      # React components
│   │   ├── authentication/  # Authentication components
│   │   ├── Buttons/         # Reusable button components
│   │   ├── InputField/      # Form input components
│   │   ├── Modal/           # Modal dialog components
│   │   ├── ProductReq/      # Product request components
│   │   ├── EventManagement/ # Event management components
│   │   ├── ChapterManagement/ # Chapter management components
│   │   └── Analytics/       # Analytics and dashboard components
│   ├── services/        # Service layer for API interactions
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Utility functions
│   ├── contexts/        # React context providers
│   ├── pages/           # Page components
│   │   ├── auth/        # Authentication pages
│   │   ├── events/      # Event management pages
│   │   ├── procurement/ # Procurement pages
│   │   ├── chapters/    # Chapter management pages
│   │   └── analytics/   # Analytics pages
│   ├── App.jsx          # Main application component
│   └── main.jsx         # Application entry point
├── documentation/       # Project documentation
├── package.json         # Project dependencies
└── vite.config.js       # Vite configuration
```

## Project Architecture

The application follows a component-based architecture with:

1. **Modular Component Structure**: Reusable UI components organized by feature
2. **Service Layer Pattern**: API interactions abstracted into service modules
3. **Context API**: For global state management (user authentication, settings)
4. **Custom Hooks**: For encapsulating logic and state management
5. **RESTful API Communication**: Using Axios for consistent data fetching
6. **Responsive Design**: Mobile-first approach with Tailwind CSS

## Key Components - Detailed Functionality

### Authentication Components

-   **LoginForm.jsx**

    -   **Overview**: Handles user authentication with email/password login.
    -   **Main functions**:
        -   `handleSubmit(e)`: Processes login form submission
        -   `validateForm()`: Validates input fields before submission
        -   `handleForgotPassword()`: Initiates password reset workflow
    -   **State management**:
        -   Tracks email, password inputs and form validation errors
        -   Manages loading state during authentication
    -   **API Integration**:
        -   Communicates with Firebase Authentication
        -   Handles authentication errors with user-friendly messages

-   **RegistrationForm.jsx**

    -   **Overview**: Manages new user account creation with role selection.
    -   **Main functions**:
        -   `handleRegister(e)`: Processes registration form submission
        -   `validatePassword()`: Ensures password meets complexity requirements
        -   `handleRoleSelection(role)`: Updates selected user role
    -   **State management**:
        -   Tracks form inputs (name, email, password, role)
        -   Manages multi-step registration process
    -   **Validation**:
        -   Implements field-level validation with error messaging
        -   Checks for existing accounts before submission

-   **UserProfile.jsx**
    -   **Overview**: Displays and manages user profile information.
    -   **Main functions**:
        -   `handleProfileUpdate(data)`: Updates user profile in database
        -   `handleImageUpload(file)`: Processes profile image uploads
        -   `loadUserData()`: Fetches user profile data from Firestore
    -   **Features**:
        -   Profile image management with preview
        -   Role-based field visibility
        -   Form validation for profile updates

### Navigation Components

-   **Navbar.jsx**

    -   **Overview**: Main navigation component with user-specific menu items.
    -   **Main functions**:
        -   `renderMenuItems()`: Generates navigation links based on user role
        -   `handleSignOut()`: Processes user logout
        -   `toggleMobileMenu()`: Controls mobile navigation visibility
    -   **State management**:
        -   Tracks mobile menu visibility
        -   Syncs with authentication state
    -   **Responsive behavior**:
        -   Desktop view with horizontal menu
        -   Mobile view with collapsible menu

-   **Sidebar.jsx**
    -   **Overview**: Context-specific navigation for section pages.
    -   **Main functions**:
        -   `generateSidebarItems(section)`: Creates sidebar links based on current section
        -   `handleNavigation(path)`: Manages route changes
        -   `isActiveRoute(path)`: Determines if a route is currently active
    -   **Features**:
        -   Collapsible categories
        -   Visual indicators for active routes
        -   Permission-based menu filtering

### Modal Components

-   **PRSummary.jsx**

    -   **Overview**: Detailed modal for purchase requests and orders with editing capabilities.
    -   **Main functions**:
        -   `handleSave()`: Submits order information to API
        -   `handleOrderPaidDateChange(date)`: Updates payment date and status
        -   `handleOrderReceivedDateChange(date)`: Tracks reception date
        -   `totalAmount()`: Calculates total cost of all items
        -   `handleFileChange(event)`: Manages file attachment uploads
        -   `handleInputChange(index, value)`: Updates item unit prices
    -   **State management**:
        -   Tracks modal visibility with `isOpen` state
        -   Manages navigation with `currentIndex` state
        -   Stores item data from API with `data` state
        -   Maintains order status with `selectedStatus` state
        -   Tracks dates with `selectedDate` and `receivedDate` states
        -   Manages file uploads with `file` state
    -   **API Integration**:
        -   Fetches item data based on purchase number
        -   Posts updated purchase order information
        -   Handles errors and loading states

-   **EventDetailsModal.jsx**

    -   **Overview**: Displays and edits comprehensive event information.
    -   **Main functions**:
        -   `loadEventDetails(eventId)`: Fetches event information
        -   `handleSave()`: Updates event details in database
        -   `handleAttendeeManagement()`: Opens attendee management interface
        -   `validateEventDetails()`: Ensures required fields are complete
    -   **Features**:
        -   Date and time management with calendar picker
        -   Venue selection with location details
        -   Budget tracking with expense categorization
        -   Attendee limit and registration settings

-   **ConfirmationModal.jsx**
    -   **Overview**: Reusable confirmation dialog for actions requiring user verification.
    -   **Main functions**:
        -   `handleConfirm()`: Processes confirmed action
        -   `handleCancel()`: Cancels action and closes modal
    -   **Customization**:
        -   Configurable title, message, and button text
        -   Different styles for various confirmation types (warning, danger, info)
        -   Optional checkbox for "Don't show again" functionality

### Input Components

-   **InputField.jsx**

    -   **Overview**: Standardized text input component with validation support.
    -   **Main functions**:
        -   `handleChange(e)`: Processes input changes with optional validation
        -   `handleBlur()`: Triggers validation on field blur
        -   `handleFocus()`: Manages focus state for styling
    -   **Features**:
        -   Support for various input types (text, email, password, number)
        -   Built-in validation with error messaging
        -   Customizable appearance with className prop
        -   Label support with optional requirement indicator

-   **FileUploadField.jsx**

    -   **Overview**: Specialized input for file uploads with preview capability.
    -   **Main functions**:
        -   `handleFileSelect(e)`: Processes file selection
        -   `validateFile(file)`: Checks file type and size
        -   `clearSelectedFile()`: Removes current file selection
        -   `generatePreview(file)`: Creates visual preview for supported file types
    -   **Features**:
        -   Drag-and-drop support
        -   File type restriction
        -   Size validation
        -   Upload progress indication
        -   Preview generation for images and PDFs

-   **DatePickerInput.jsx**
    -   **Overview**: Date selection component with formatting and validation.
    -   **Main functions**:
        -   `handleDateChange(date)`: Updates selected date state
        -   `formatDate(date)`: Standardizes date format for display and storage
        -   `validateDateRange(date)`: Ensures date is within allowed range
    -   **Features**:
        -   Calendar popup for date selection
        -   Minimum and maximum date constraints
        -   Custom date formatting
        -   Clear button for date removal

### Button Components

-   **CloseBtn.jsx**

    -   **Overview**: Standardized button for closing modals and panels.
    -   **Main functions**:
        -   `handleClick()`: Processes close action with optional confirmation
    -   **Features**:
        -   Consistent styling across application
        -   Optional confirmation dialog for unsaved changes
        -   Keyboard accessibility (Escape key support)
        -   Screen reader compatibility

-   **ActionButton.jsx**

    -   **Overview**: Primary action button with multiple variants.
    -   **Main functions**:
        -   `handleClick(e)`: Processes button click with loading state
    -   **Variations**:
        -   Primary, secondary, success, danger, warning
        -   Small, medium, large sizes
        -   Icon support with text or icon-only
        -   Disabled state handling

-   **UploadButton.jsx**
    -   **Overview**: Specialized button for initiating file uploads.
    -   **Main functions**:
        -   `triggerFileInput()`: Activates hidden file input
        -   `handleUploadComplete()`: Processes successful upload
    -   **Features**:
        -   Progress indication during upload
        -   Success/error state visualization
        -   File type restriction messaging
        -   Integration with file input components

### Procurement Components

-   **PurchaseRequestForm.jsx**

    -   **Overview**: Form for creating and submitting purchase requests.
    -   **Main functions**:
        -   `handleSubmit(e)`: Processes form submission
        -   `addItemRow()`: Adds new item to the request
        -   `removeItemRow(index)`: Removes an item from the request
        -   `calculateTotal()`: Computes total cost of request
        -   `validateForm()`: Ensures all required fields are complete
    -   **State management**:
        -   Tracks form fields (supplier, delivery date, etc.)
        -   Manages dynamic item list with quantity and description
        -   Handles file attachments for supporting documents
    -   **API Integration**:
        -   Submits completed request to backend
        -   Handles validation errors and confirmation

-   **PurchaseOrderList.jsx**

    -   **Overview**: Displays and manages list of purchase orders with filtering.
    -   **Main functions**:
        -   `loadOrders()`: Fetches purchase orders from API
        -   `handleFilterChange(filters)`: Updates displayed orders based on filters
        -   `handleOrderClick(order)`: Opens detailed order view
        -   `handleStatusUpdate(orderId, status)`: Updates order status
    -   **Features**:
        -   Sortable columns (date, supplier, amount, status)
        -   Filter by status, date range, and supplier
        -   Pagination for large order sets
        -   Batch operations for similar orders

-   **SupplierManagement.jsx**
    -   **Overview**: Interface for managing supplier information and performance.
    -   **Main functions**:
        -   `addSupplier(supplierData)`: Creates new supplier record
        -   `updateSupplier(id, data)`: Modifies existing supplier
        -   `deactivateSupplier(id)`: Marks supplier as inactive
        -   `rateSupplier(id, rating)`: Updates supplier performance rating
    -   **Features**:
        -   Supplier search and filtering
        -   Performance history tracking
        -   Contact information management
        -   Document storage for agreements and contracts

### Event Management Components

-   **EventCalendar.jsx**

    -   **Overview**: Calendar view of scheduled events with creation capabilities.
    -   **Main functions**:
        -   `loadEvents(month, year)`: Fetches events for displayed period
        -   `handleDateClick(date)`: Initiates event creation for selected date
        -   `handleEventClick(event)`: Opens event details modal
        -   `changeView(viewType)`: Switches between month, week, and day views
    -   **Features**:
        -   Drag-and-drop event scheduling
        -   Multiple view options (month, week, day, list)
        -   Color-coding by event type or status
        -   Quick event creation from calendar cells

-   **EventRegistrationForm.jsx**

    -   **Overview**: Registration form for event participants.
    -   **Main functions**:
        -   `handleSubmit(e)`: Processes registration submission
        -   `validateAttendee(data)`: Verifies registration information
        -   `generateConfirmation(attendeeId)`: Creates confirmation details
    -   **Features**:
        -   Custom fields based on event type
        -   Payment processing integration
        -   Capacity management with waitlist
        -   Email confirmation generation

-   **AttendeeManagement.jsx**
    -   **Overview**: Interface for managing event participants.
    -   **Main functions**:
        -   `loadAttendees(eventId)`: Fetches registered attendees
        -   `checkInAttendee(attendeeId)`: Marks attendee as present
        -   `removeAttendee(attendeeId)`: Cancels registration
        -   `promoteFromWaitlist(attendeeId)`: Moves waitlisted attendee to registered
    -   **Features**:
        -   Attendee search and filtering
        -   Check-in functionality with QR code scanning
        -   Attendance reporting with export options
        -   Communication tools for attendee notifications

### Chapter Management Components

-   **ChapterDirectory.jsx**

    -   **Overview**: Lists and manages organizational chapters.
    -   **Main functions**:
        -   `loadChapters()`: Fetches chapter list from database
        -   `createChapter(data)`: Adds new chapter record
        -   `updateChapter(id, data)`: Modifies chapter information
        -   `archiveChapter(id)`: Marks chapter as inactive
    -   **Features**:
        -   Chapter search and filtering
        -   Hierarchical chapter display
        -   Performance metrics visualization
        -   Member count and activity tracking

-   **MembershipManagement.jsx**

    -   **Overview**: Manages chapter membership and roles.
    -   **Main functions**:
        -   `loadMembers(chapterId)`: Fetches chapter members
        -   `addMember(userData)`: Registers new member
        -   `updateRole(memberId, role)`: Changes member's role
        -   `removeMember(memberId)`: Removes member from chapter
    -   **Features**:
        -   Member search and filtering
        -   Role assignment and permissions
        -   Membership status tracking
        -   Activity and contribution metrics

-   **ChapterPerformance.jsx**
    -   **Overview**: Displays performance metrics for chapters.
    -   **Main functions**:
        -   `loadMetrics(chapterId, period)`: Fetches performance data
        -   `generateReport(chapterId, metrics)`: Creates downloadable report
        -   `compareChapters(ids)`: Generates chapter comparison visualization
    -   **Features**:
        -   Key performance indicator tracking
        -   Goal progress visualization
        -   Comparative analysis between chapters
        -   Trend analysis over time periods

### Analytics Components

-   **AnalyticsDashboard.jsx**

    -   **Overview**: Main dashboard with key metrics and visualizations.
    -   **Main functions**:
        -   `loadDashboardData(filters)`: Fetches metrics based on filters
        -   `exportReport(format)`: Generates downloadable reports
        -   `refreshData()`: Updates dashboard with latest information
    -   **Features**:
        -   Customizable widget layout
        -   Interactive filtering capabilities
        -   Real-time data updates
        -   Export functionality for reports

-   **EventAnalytics.jsx**

    -   **Overview**: Specialized analytics for event performance.
    -   **Main functions**:
        -   `loadEventMetrics(eventId)`: Fetches event-specific metrics
        -   `compareEvents(ids)`: Generates event comparison charts
        -   `analyzeAttendance(eventId)`: Creates attendance pattern analysis
    -   **Features**:
        -   Attendance tracking visualization
        -   Revenue and cost analysis
        -   Satisfaction survey results
        -   Year-over-year comparison tools

-   **ProcurementAnalytics.jsx**
    -   **Overview**: Analysis tools for procurement activities.
    -   **Main functions**:
        -   `loadProcurementData(period)`: Fetches procurement metrics
        -   `analyzeSpending(categories)`: Generates spending analysis by category
        -   `supplierPerformance(supplierId)`: Creates supplier performance charts
    -   **Features**:
        -   Spending trend visualization
        -   Supplier performance comparison
        -   Order fulfillment metrics
        -   Budget utilization tracking

### Custom Hooks

-   **useAuth.js**

    -   **Overview**: Manages authentication state and operations.
    -   **Main functions**:
        -   `login(email, password)`: Authenticates user with credentials
        -   `register(email, password, userData)`: Creates new user account
        -   `logout()`: Signs out current user
        -   `resetPassword(email)`: Initiates password reset process
        -   `updateProfile(data)`: Updates user profile information
    -   **State management**:
        -   Tracks current user state
        -   Manages authentication loading state
        -   Handles authentication errors

-   **usePurchaseRequests.js**

    -   **Overview**: Handles purchase request operations and state.
    -   **Main functions**:
        -   `createRequest(data)`: Submits new purchase request
        -   `updateRequest(id, data)`: Modifies existing request
        -   `deleteRequest(id)`: Removes request from system
        -   `getRequests(filters)`: Fetches requests based on filters
    -   **State management**:
        -   Tracks request loading state
        -   Manages request data cache
        -   Handles operation errors

-   **useEventManagement.js**
    -   **Overview**: Manages event-related operations and state.
    -   **Main functions**:
        -   `createEvent(data)`: Creates new event record
        -   `updateEvent(id, data)`: Modifies event details
        -   `cancelEvent(id)`: Marks event as cancelled
        -   `getEvents(filters)`: Fetches events based on filters
        -   `registerAttendee(eventId, attendeeData)`: Adds attendee to event
    -   **State management**:
        -   Tracks event loading state
        -   Manages event data cache
        -   Handles operation errors

### Utility Functions

-   **dateUtils.js**

    -   **Overview**: Functions for date manipulation and formatting.
    -   **Main functions**:
        -   `formatDate(date, format)`: Converts date to specified format
        -   `calculateDateDiff(date1, date2)`: Computes difference between dates
        -   `isDateInRange(date, startDate, endDate)`: Checks if date is within range
        -   `getBusinessDays(startDate, endDate)`: Calculates business days excluding weekends

-   **validationUtils.js**

    -   **Overview**: Form validation helper functions.
    -   **Main functions**:
        -   `validateEmail(email)`: Checks email format validity
        -   `validatePassword(password)`: Ensures password meets complexity requirements
        -   `validateRequired(value)`: Verifies required field has value
        -   `validateNumeric(value)`: Ensures value is numeric
        -   `validatePhoneNumber(phone)`: Checks phone number format

-   **formatUtils.js**
    -   **Overview**: Data formatting and display helpers.
    -   **Main functions**:
        -   `formatCurrency(amount, currency)`: Formats monetary values
        -   `formatPhoneNumber(phone)`: Standardizes phone number display
        -   `truncateText(text, length)`: Shortens text with ellipsis
        -   `capitalizeFirstLetter(string)`: Ensures first letter is uppercase

## Pages - Detailed Functionality

### Authentication Pages

-   **LoginPage.jsx**

    -   **Overview**: User authentication interface.
    -   **Main functions**:
        -   `handleLogin(e)`: Processes login form submission
        -   `redirectToRegistration()`: Navigates to registration page
        -   `handleForgotPassword()`: Initiates password reset workflow
    -   **Features**:
        -   Email and password authentication
        -   Remember me functionality
        -   Password recovery option
        -   Error messaging for failed attempts

-   **RegistrationPage.jsx**

    -   **Overview**: New user account creation interface.
    -   **Main functions**:
        -   `handleRegistration(e)`: Processes registration form submission
        -   `validateForm()`: Ensures all required fields are valid
        -   `handleRoleSelection(role)`: Updates selected user role
    -   **Features**:
        -   Multi-step registration process
        -   Role selection with appropriate fields
        -   Password strength requirements
        -   Terms of service acceptance

-   **ProfilePage.jsx**
    -   **Overview**: User profile management interface.
    -   **Main functions**:
        -   `loadUserProfile()`: Fetches user data from database
        -   `handleProfileUpdate(e)`: Saves profile changes
        -   `handlePasswordChange(e)`: Updates user password
        -   `handleProfileImageUpload(file)`: Processes avatar image
    -   **Features**:
        -   Profile information editing
        -   Password management
        -   Profile image customization
        -   Role-specific fields and permissions

### Event Management Pages

-   **EventDashboardPage.jsx**

    -   **Overview**: Central hub for event management activities.
    -   **Main functions**:
        -   `loadUpcomingEvents()`: Fetches upcoming event data
        -   `handleCreateEvent()`: Initiates event creation process
        -   `navigateToEvent(eventId)`: Opens detailed event view
    -   **Features**:
        -   Upcoming event preview cards
        -   Quick action buttons for common tasks
        -   Event metrics summary
        -   Calendar preview with highlighted dates

-   **EventDetailPage.jsx**

    -   **Overview**: Comprehensive view of single event with management tools.
    -   **Main functions**:
        -   `loadEventDetails(eventId)`: Fetches complete event information
        -   `handleEventUpdate(data)`: Saves changes to event
        -   `manageAttendees()`: Opens attendee management interface
        -   `generateEventReport()`: Creates downloadable event report
    -   **Features**:
        -   Complete event information display
        -   Attendee management tools
        -   Budget tracking interface
        -   Task management for event planning

-   **EventCalendarPage.jsx**
    -   **Overview**: Calendar-based event visualization and management.
    -   **Main functions**:
        -   `loadEventsForPeriod(startDate, endDate)`: Fetches events for displayed period
        -   `handleViewChange(view)`: Switches between calendar views
        -   `handleEventClick(eventId)`: Opens event details on selection
        -   `createEventFromDate(date)`: Initiates event creation for selected date
    -   **Features**:
        -   Multiple calendar views (month, week, day)
        -   Drag-and-drop event scheduling
        -   Event filtering by type or status
        -   Export calendar to PDF or iCal format

### Procurement Pages

-   **PurchaseRequestPage.jsx**

    -   **Overview**: Interface for creating and managing purchase requests.
    -   **Main functions**:
        -   `createPurchaseRequest(data)`: Submits new purchase request
        -   `handleFormChange(field, value)`: Updates form field values
        -   `addItemRow()`: Adds new item to the request
        -   `validateRequest()`: Ensures request is complete and valid
    -   **Features**:
        -   Dynamic item addition interface
        -   Supplier selection from database
        -   File attachment capability
        -   Total calculation and budget validation

-   **PurchaseOrderPage.jsx**

    -   **Overview**: Management interface for purchase orders.
    -   **Main functions**:
        -   `loadPurchaseOrders(filters)`: Fetches orders based on filters
        -   `handleOrderClick(orderId)`: Opens detailed order view
        -   `updateOrderStatus(orderId, status)`: Changes order status
        -   `generatePO(requestId)`: Creates purchase order from request
    -   **Features**:
        -   Status tracking with visual indicators
        -   Filtering and sorting capabilities
        -   Approval workflow integration
        -   Order history and audit trail

-   **SupplierDirectoryPage.jsx**
    -   **Overview**: Interface for managing supplier information.
    -   **Main functions**:
        -   `loadSuppliers()`: Fetches supplier directory
        -   `addSupplier(data)`: Creates new supplier record
        -   `updateSupplier(id, data)`: Modifies supplier information
        -   `archiveSupplier(id)`: Marks supplier as inactive
    -   **Features**:
        -   Supplier search and filtering
        -   Performance rating system
        -   Contact information management
        -   Order history by supplier

### Chapter Management Pages

-   **ChapterDashboardPage.jsx**

    -   **Overview**: Overview of chapter performance and activities.
    -   **Main functions**:
        -   `loadChapterData(chapterId)`: Fetches chapter metrics
        -   `navigateToSection(section)`: Opens specific management section
        -   `generateChapterReport()`: Creates downloadable chapter report
    -   **Features**:
        -   Performance metrics visualization
        -   Upcoming events preview
        -   Member activity summary
        -   Financial status overview

-   **MemberDirectoryPage.jsx**

    -   **Overview**: Management interface for chapter membership.
    -   **Main functions**:
        -   `loadMembers(chapterId)`: Fetches chapter member list
        -   `addMember(data)`: Registers new member
        -   `updateMember(id, data)`: Modifies member information
        -   `changeMemberStatus(id, status)`: Updates membership status
    -   **Features**:
        -   Member search and filtering
        -   Role and permission management
        -   Contact information directory
        -   Membership status tracking

-   **ChapterSettingsPage.jsx**
    -   **Overview**: Configuration interface for chapter parameters.
    -   **Main functions**:
        -   `loadChapterSettings(chapterId)`: Fetches chapter configuration
        -   `updateSettings(data)`: Saves settings changes
        -   `uploadChapterLogo(file)`: Processes chapter logo image
        -   `manageLeadership()`: Opens leadership assignment interface
    -   **Features**:
        -   Chapter profile management
        -   Notification preferences
        -   Leadership role assignment
        -   Regional settings configuration

### Analytics Pages

-   **AnalyticsDashboardPage.jsx**

    -   **Overview**: Centralized analytics hub with customizable views.
    -   **Main functions**:
        -   `loadDashboardData(filters)`: Fetches analytics based on filters
        -   `customizeWidgets()`: Opens dashboard customization interface
        -   `exportDashboard(format)`: Creates downloadable dashboard
        -   `refreshData()`: Updates dashboard with latest metrics
    -   **Features**:
        -   Key performance indicator cards
        -   Interactive chart visualizations
        -   Date range selection for analysis
        -   Comparison tools for performance evaluation

-   **EventAnalyticsPage.jsx**

    -   **Overview**: Detailed analytics specific to event performance.
    -   **Main functions**:
        -   `loadEventMetrics(eventIds, period)`: Fetches event performance data
        -   `compareEvents(ids)`: Generates comparative analysis
        -   `analyzeAttendance(eventId)`: Creates attendance pattern charts
        -   `exportEventReport(eventId, metrics)`: Generates downloadable report
    -   **Features**:
        -   Attendance tracking visualization
        -   Cost vs. revenue analysis
        -   Satisfaction survey results
        -   Year-over-year trend visualization

-   **FinancialAnalyticsPage.jsx**
    -   **Overview**: Financial performance analysis for budgeting and planning.
    -   **Main functions**:
        -   `loadFinancialData(period)`: Fetches financial metrics
        -   `analyzeExpenses(categories)`: Creates expense analysis by category
        -   `forecastBudget(parameters)`: Generates budget projections
        -   `exportFinancialReport(period, metrics)`: Creates downloadable report
    -   **Features**:
        -   Budget utilization tracking
        -   Expense categorization analysis
        -   Revenue stream visualization
        -   Financial trend forecasting

### Administration Pages

-   **SystemSettingsPage.jsx**

    -   **Overview**: Administrative interface for system configuration.
    -   **Main functions**:
        -   `loadSystemSettings()`: Fetches current configuration
        -   `updateSettings(section, data)`: Saves configuration changes
        -   `manageIntegrations()`: Opens integration management interface
        -   `viewSystemLogs()`: Displays system activity logs
    -   **Features**:
        -   Application behavior configuration
        -   Security settings management
        -   Integration configuration
        -   System maintenance tools

-   **UserManagementPage.jsx**

    -   **Overview**: Interface for managing system users and permissions.
    -   **Main functions**:
        -   `loadUsers(filters)`: Fetches user accounts based on filters
        -   `createUser(data)`: Adds new user account
        -   `updateUser(id, data)`: Modifies user information
        -   `managePermissions(userId)`: Updates user permissions
    -   **Features**:
        -   User search and filtering
        -   Role and permission assignment
        -   Account status management
        -   Bulk user operations

-   **AuditLogPage.jsx**
    -   **Overview**: System activity monitoring interface.
    -   **Main functions**:
        -   `loadAuditLogs(filters)`: Fetches system activity logs
        -   `exportLogs(period, filters)`: Creates downloadable log report
        -   `viewLogDetails(logId)`: Shows detailed log entry information
    -   **Features**:
        -   Activity filtering by user, action, or date
        -   Security event highlighting
        -   Export functionality for compliance
        -   Retention policy management

## Server Functionality

The application uses an Express.js server that implements:

1. **Server setup and configuration**:

    - Express application initialization
    - CORS configuration for cross-origin requests
    - Body parsing middleware for JSON and form data
    - Static file serving for uploads and public assets
    - Error handling middleware for consistent responses

2. **Authentication endpoints**:

    - `/api/auth/login`: User authentication with credentials
    - `/api/auth/register`: New user account creation
    - `/api/auth/reset-password`: Password reset initiation
    - `/api/auth/verify-token`: JWT token validation
    - `/api/auth/refresh-token`: Authentication token renewal

3. **Purchase request endpoints**:

    - `/api/items/:purchaseno`: Get items for a specific purchase request
    - `/api/itemsPO/:purchaseordernum`: Get items for a purchase order
    - `/api/addPurchaseOrderInfo`: Update purchase order information
    - `/api/purchaserequest`: Create or update purchase requests
    - `/api/suppliers`: Manage supplier information

4. **Event management endpoints**:

    - `/api/events`: CRUD operations for events
    - `/api/events/:id/attendees`: Manage event attendees
    - `/api/events/:id/tasks`: Event task management
    - `/api/events/calendar`: Calendar data for date ranges
    - `/api/events/analytics`: Event performance metrics

5. **Chapter management endpoints**:

    - `/api/chapters`: CRUD operations for chapters
    - `/api/chapters/:id/members`: Chapter membership management
    - `/api/chapters/:id/settings`: Chapter configuration
    - `/api/chapters/analytics`: Chapter performance metrics

6. **File upload handling**:

    - Multipart form data processing
    - File type validation and sanitization
    - Virus scanning (optional)
    - Secure storage path generation
    - Integration with Firebase Storage
    - Temporary file cleanup

7. **Analytics endpoints**:
    - `/api/analytics/dashboard`: Aggregated metrics for dashboards
    - `/api/analytics/reports`: Report generation endpoints
    - `/api/analytics/export`: Data export functionality
    - `/api/analytics/forecasts`: Predictive analytics endpoints

## Firebase Integration

The application integrates with Firebase services for:

1. **Authentication (Firebase Auth)**:

    - Email and password authentication
    - Password reset functionality
    - Session management with tokens
    - Role-based access control
    - Account linking and social auth (optional)

2. **Database (Firestore)**:

    - Collection structure:
        - `users`: User account information
        - `events`: Event details and metadata
        - `chapters`: Chapter information and settings
        - `purchaseRequests`: Procurement request tracking
        - `purchaseOrders`: Order management
        - `suppliers`: Supplier directory
        - `attendees`: Event attendance records
    - Security rules for access control
    - Indexes for query optimization
    - Data validation and sanitization

3. **Storage (Firebase Storage)**:

    - File categories:
        - Profile images
        - Event attachments
        - Purchase request documentation
        - Chapter logos and materials
        - System backups and exports
    - Security rules for access control
    - Folder structure for organization
    - Metadata for file categorization
    - Temporary URL generation for access

4. **Deploy and Hosting**:
    - Static asset hosting
    - Server-side functions deployment
    - Custom domain configuration
    - SSL certificate management
    - Cache optimization

## Styling with Tailwind

The application uses a custom Tailwind configuration with:

1. **Custom color palette**:

    - Primary colors:
        - `primary`: #1a73e8 - Primary brand blue
        - `secondary`: #4ecdc4 - Secondary teal accent
        - `accent`: #f7b538 - Highlight yellow
    - Functional colors:
        - `success`: #34a853 - Success state green
        - `warning`: #fbbc04 - Warning state yellow
        - `error`: #ea4335 - Error state red
        - `info`: #4285f4 - Information state blue
    - Neutral colors:
        - `light`: #f8f9fa - Light background
        - `dark`: #202124 - Dark text and backgrounds
        - `gray`: Various shades for UI elements

2. **Custom components**:

    - Button variants (primary, secondary, outline, text)
    - Card styles with consistent shadows
    - Form input styling with states
    - Modal and dialog styling
    - Table designs with alternating rows

3. **Responsive breakpoints**:

    - `sm`: 640px - Small devices
    - `md`: 768px - Medium devices
    - `lg`: 1024px - Large devices
    - `xl`: 1280px - Extra large devices
    - `2xl`: 1536px - 2X large devices

4. **Utility extensions**:
    - Custom gradients
    - Text shadows
    - Animation durations
    - Additional border radiuses
    - Z-index scale management

## Power BI Integration

The application integrates with Power BI for advanced analytics:

1. **Embedded dashboards**:

    - Event performance visualization
    - Procurement spend analysis
    - Chapter performance comparison
    - Financial trend analysis
    - Member engagement metrics

2. **Integration methods**:

    - Power BI JavaScript SDK
    - Iframe embedding with authentication
    - Report parameter passing for filtering
    - Custom visual development for specific needs

3. **Data connectivity**:

    - Direct Query connection to application database
    - Scheduled data refresh for regular updates
    - Real-time data streaming for critical metrics
    - Export API for custom dataset creation

4. **Security implementation**:
    - Row-level security based on user roles
    - Embedded token authentication
    - Permission-based dashboard access
    - Secure parameter handling

## User Roles and Features

### Administrator

-   **Dashboard access**:

    -   System-wide metrics and KPIs
    -   User activity monitoring
    -   System health indicators
    -   Integration status overview

-   **User management**:

    -   Create and manage user accounts
    -   Assign roles and permissions
    -   Monitor user activity
    -   Implement account policies

-   **System configuration**:

    -   Application settings management
    -   Integration configuration
    -   Security policy implementation
    -   Data retention policy management

-   **Analytics access**:
    -   Cross-functional reporting
    -   Trend analysis across all modules
    -   Export and sharing capabilities
    -   Custom dashboard creation

### Event Manager

-   **Event creation and management**:

    -   Create and configure events
    -   Manage event schedules and details
    -   Track event budgets and expenses
    -   Generate event reports

-   **Attendee management**:

    -   Process registrations
    -   Manage check-ins and attendance
    -   Handle attendee communications
    -   Generate attendee reports

-   **Event analytics**:

    -   Track event performance metrics
    -   Analyze attendance patterns
    -   Measure attendee satisfaction
    -   Compare performance across events

-   **Resource management**:
    -   Allocate staff and volunteers
    -   Manage venue and equipment
    -   Track resource utilization
    -   Coordinate service providers

### Chapter Leader

-   **Chapter administration**:

    -   Manage chapter details and settings
    -   Oversee membership roster
    -   Coordinate chapter activities
    -   Generate chapter reports

-   **Membership management**:

    -   Process new member applications
    -   Manage member status changes
    -   Track member contributions
    -   Facilitate member communications

-   **Chapter analytics**:

    -   Monitor chapter performance metrics
    -   Track membership growth
    -   Analyze engagement patterns
    -   Compare with other chapters

-   **Program coordination**:
    -   Organize chapter events
    -   Implement chapter initiatives
    -   Manage chapter calendar
    -   Coordinate with other chapters

### Procurement Officer

-   **Purchase request management**:

    -   Create and submit purchase requests
    -   Track request approval status
    -   Modify requests as needed
    -   Archive completed requests

-   **Purchase order processing**:

    -   Generate purchase orders
    -   Track order fulfillment
    -   Manage vendor communications
    -   Process order receipts

-   **Supplier management**:

    -   Maintain supplier directory
    -   Track supplier performance
    -   Manage supplier relationships
    -   Negotiate terms and contracts

-   **Procurement analytics**:
    -   Monitor spending patterns
    -   Track budget utilization
    -   Analyze supplier performance
    -   Identify cost-saving opportunities

## File Upload Workflow

1. **Client-side preparation**:

    - File selection via input or drag-and-drop
    - Client-side validation (type, size)
    - Optional preview generation
    - Metadata collection (description, categories)

2. **Upload process**:

    - FormData preparation with file and metadata
    - Progress tracking with Axios
    - Cancellation capability
    - Retry logic for failed uploads

3. **Server processing**:

    - Multipart form parsing
    - File validation and sanitization
    - Virus scanning (optional)
    - Metadata extraction and validation

4. **Storage management**:

    - Path determination based on file type and context
    - Firebase Storage upload with security rules
    - Metadata attachment (upload date, user, type)
    - Thumbnail generation for images (optional)

5. **Database integration**:

    - Storage reference saving to relevant document
    - File metadata recording
    - Association with appropriate records
    - Version tracking if applicable

6. **Access control**:
    - Permission-based file access
    - Temporary URL generation for sharing
    - Download tracking and limitations
    - Expiration policies for sensitive files

## Installation and Setup

1. **Prerequisites**:

    - Node.js (v16.0.0 or later)
    - npm or yarn
    - Firebase account
    - Power BI account (for analytics features)

2. **Installation steps**:

    ```bash
    # Clone the repository
    git clone https://github.com/your-org/trifecta.git
    cd trifecta

    # Install dependencies
    npm install

    # Set up environment variables
    cp .env.example .env
    # Edit .env with your Firebase credentials

    # Start development server
    npm run dev

    # Start backend server (in another terminal)
    npm run server
    ```

3. **Firebase configuration**:

    - Create a Firebase project
    - Enable Authentication, Firestore, and Storage
    - Set up security rules for each service
    - Generate and configure service account credentials
    - Update .env with Firebase configuration

4. **Power BI setup** (if using analytics):
    - Create Power BI workspace
    - Configure dataset connections
    - Create and publish reports
    - Set up embedded report access
    - Configure application integration

## Development Guidelines

1. **Code structure**:

    - Follow component-based architecture
    - Keep components focused on single responsibilities
    - Use custom hooks for shared logic
    - Implement service layer for API interactions

2. **Styling approach**:

    - Use Tailwind utility classes as primary styling method
    - Create custom components for repeated patterns
    - Follow mobile-first responsive design
    - Maintain consistent color scheme and spacing

3. **State management**:

    - Use React Context for global state
    - Implement custom hooks for complex state logic
    - Keep component state localized when possible
    - Use reducer pattern for complex state transitions

4. **API integration**:

    - Use service modules for API calls
    - Implement proper error handling
    - Add loading states for async operations
    - Consider data caching for performance

5. **Testing strategy**:

    - Write unit tests for utility functions
    - Create component tests for UI behavior
    - Implement integration tests for critical paths
    - Perform regular security testing

6. **Performance considerations**:
    - Implement code splitting for large features
    - Optimize image loading with proper sizing
    - Use virtualization for long lists
    - Add appropriate caching strategies
