# User Management Dashboard

A comprehensive user management application built with React, TypeScript, and Tailwind CSS. This application provides full CRUD (Create, Read, Update, Delete) functionality for managing users with advanced features like pagination, filtering, sorting, and search.

## 🚀 Features

### Core Functionality
- **User Display**: Clean table view showing ID, First Name, Last Name, Email, and Department
- **CRUD Operations**: Complete Create, Read, Update, Delete functionality
- **Real-time Search**: Search across all user fields (name, email, department, ID)
- **Advanced Filtering**: Popup filter system for precise user filtering
- **Column Sorting**: Sort by any column in ascending/descending order
- **Pagination**: Flexible pagination with 10, 25, 50, and 100 items per page

### User Experience
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Form Validation**: Client-side validation with real-time feedback
- **Error Handling**: Comprehensive error handling with retry mechanisms
- **Loading States**: Skeleton screens and loading indicators
- **Confirmation Dialogs**: Safe delete operations with user confirmation

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **Modular Architecture**: Clean separation of concerns with reusable components
- **API Integration**: JSONPlaceholder API integration with proper error handling
- **Modern React**: Hooks-based architecture with custom hooks
- **Tailwind CSS**: Modern styling with responsive design
- **Accessibility**: WCAG compliant with keyboard navigation support

## 🛠️ Setup and Installation

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd user-management-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` to view the application

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 📋 API Integration

This application uses [JSONPlaceholder](https://jsonplaceholder.typicode.com/), a free REST API for testing and prototyping.

### API Endpoints Used:
- `GET /users` - Fetch all users
- `GET /users/:id` - Fetch specific user
- `POST /users` - Create new user (simulated)
- `PUT /users/:id` - Update user (simulated)
- `DELETE /users/:id` - Delete user (simulated)

**Note:** JSONPlaceholder simulates API responses but doesn't persist data. The application handles this by managing local state updates.

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── ErrorAlert.tsx
│   ├── SearchBar.tsx    # Search functionality
│   ├── FilterModal.tsx  # Advanced filtering
│   ├── UserForm.tsx     # Add/Edit user form
│   ├── UserTable.tsx    # User data table
│   ├── Pagination.tsx   # Pagination controls
│   └── UserDashboard.tsx # Main dashboard component
├── hooks/
│   └── useUsers.ts      # Custom hook for user management
├── types/
│   └── user.ts          # TypeScript type definitions
├── utils/
│   ├── api.ts           # API service layer
│   └── userTransform.ts # Data transformation utilities
├── App.tsx              # Root component
└── main.tsx            # Application entry point
```

## 🎯 Key Features Explained

### 1. Search Functionality
- Real-time search across all user fields
- Case-insensitive matching
- Instant results as you type

### 2. Advanced Filtering
- Popup modal with dedicated filters for each field
- Combinable filters (can use multiple filters simultaneously)
- Clear indication of active filters
- One-click filter clearing

### 3. Sorting
- Click column headers to sort
- Visual indicators for sort direction
- Sort by ID, first name, last name, email, or department

### 4. Pagination
- Configurable page sizes (10, 25, 50, 100)
- Smart pagination controls with ellipsis for large datasets
- Shows current page range and total results

### 5. Form Validation
- Real-time validation with immediate feedback
- Email format validation
- Required field indicators
- Error state management

## 🧪 Development Decisions

### Architecture Choices
- **Custom Hooks**: Used `useUsers` hook to encapsulate all user-related logic
- **Component Composition**: Small, focused components for better maintainability
- **TypeScript**: Full type safety to catch errors at compile time
- **Separation of Concerns**: API, transformations, and UI logic are separate

### UX Considerations
- **Loading States**: Skeleton screens provide better perceived performance
- **Error Handling**: User-friendly error messages with retry options
- **Confirmation Dialogs**: Prevent accidental deletions
- **Responsive Design**: Works seamlessly across all device sizes

### Data Handling
- **Local State Management**: Optimistic updates for better UX
- **Data Transformation**: Separate layer for API data transformation
- **Error Boundaries**: Graceful error handling at component level

## 🚀 Future Enhancements

Given more time, the following improvements would be implemented:

### Performance Optimizations
- **Virtual Scrolling**: Handle large datasets more efficiently
- **Debounced Search**: Reduce API calls during search
- **Memoization**: Optimize component re-renders
- **Lazy Loading**: Load components on demand

### Advanced Features
- **Bulk Operations**: Select and modify multiple users
- **Export Functionality**: Export user data to CSV/Excel
- **Advanced Search**: Search with operators (equals, contains, starts with)
- **User Groups**: Organize users into groups or roles
- **Activity Logging**: Track user modifications

### Technical Improvements
- **Unit Tests**: Comprehensive test coverage with Jest/React Testing Library
- **E2E Tests**: End-to-end testing with Playwright or Cypress
- **State Management**: Redux Toolkit for complex state scenarios
- **Caching**: Implement proper caching strategies
- **Offline Support**: Service worker for offline functionality

### UI/UX Enhancements
- **Dark Mode**: Theme switching capability
- **Keyboard Shortcuts**: Power user functionality
- **Drag & Drop**: Reorder functionality
- **Better Mobile UX**: Enhanced mobile interactions
- **Accessibility**: WCAG 2.1 AA compliance

## 🎨 Design System

The application follows a consistent design system:

### Colors
- **Primary**: Blue (#3B82F6) - Main actions and highlights
- **Secondary**: Indigo (#6366F1) - Secondary actions
- **Accent**: Emerald (#10B981) - Success states
- **Semantic**: Red for errors, Yellow for warnings

### Typography
- **Font Family**: System fonts for optimal performance
- **Hierarchy**: Clear heading hierarchy with proper spacing
- **Line Height**: 150% for body text, 120% for headings

### Spacing
- **8px Grid System**: Consistent spacing throughout
- **Component Spacing**: Proper internal and external spacing
- **Responsive Spacing**: Adjusted spacing for different screen sizes

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for the free API
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide React](https://lucide.dev/) for the beautiful icons
- [Vite](https://vitejs.dev/) for the fast build tool

---

Built with ❤️ using React, TypeScript, and Tailwind CSS
