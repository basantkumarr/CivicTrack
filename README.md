# CivicTrack - Empower Your Community

CivicTrack is a modern civic engagement platform that empowers citizens to easily report local issues such as road damage, garbage, water leaks, and more. Built with React and modern web technologies, it provides a seamless experience for tracking issue resolution and fostering community engagement.

## 🌟 Features

### Core Functionality
- **Location-Based Visibility**: Only civic issues within a 3-5 km radius are visible based on GPS or manual location
- **Quick Issue Reporting**: Report issues with title, description, photos (up to 5), and category selection
- **Anonymous or Verified Reporting**: Choose to report anonymously or with your identity
- **Real-time Status Tracking**: Track issue status changes with timestamps and transparency logs
- **Interactive Map View**: Visualize all issues as pins on an interactive map with filtering options

### Issue Categories
- 🛣️ **Roads**: Potholes, obstructions, road damage
- 💡 **Lighting**: Broken or flickering lights
- 💧 **Water Supply**: Leaks, low pressure issues
- 🗑️ **Cleanliness**: Overflowing bins, garbage
- ⚠️ **Public Safety**: Open manholes, exposed wiring
- 🚧 **Obstructions**: Fallen trees, debris

### Advanced Features
- **Smart Filtering**: Filter by status, category, and distance
- **Community Moderation**: Flag spam or irrelevant reports
- **Auto-hiding**: Reports flagged by multiple users are auto-hidden pending review
- **Admin Dashboard**: Complete administrative interface for managing issues and users
- **Analytics**: Comprehensive statistics and reporting
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## 🚀 Tech Stack

- **Frontend**: React 19, React Router DOM
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Heroicons, Lucide React
- **Build Tool**: Vite
- **Package Manager**: npm

## 📁 Project Structure

```
civic/
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Navbar.jsx
│   │   │   └── Sidebar.jsx
│   │   └── UI/
│   │       └── LoadingSpinner.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── LocationContext.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── ReportIssue.jsx
│   │   ├── IssueDetail.jsx
│   │   ├── MapView.jsx
│   │   ├── Profile.jsx
│   │   └── AdminDashboard.jsx
│   ├── utils/
│   │   ├── toast.js
│   │   └── headlessui.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd civic
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

## 📱 Pages & Components

### Dashboard
- Overview of all issues in your area
- Statistics cards showing total, reported, in-progress, and resolved issues
- Filter functionality by status
- Issue cards with complete information

### Report Issue
- Comprehensive form with validation
- Category selection with visual icons
- Photo upload (up to 5 images, 5MB each)
- GPS location detection or manual entry
- Anonymous reporting option

### Issue Detail
- Detailed issue information with photos
- Status timeline with timestamps
- Comment system for community engagement
- Similar issues nearby
- Action buttons for sharing and reporting

### Map View
- Interactive map visualization (mockup)
- Issue filtering by status, category, and distance
- Issue list sidebar
- Clickable issue markers with popups

### Profile
- Personal information management
- Notification preferences
- Activity statistics
- Recent issues tracking

### Admin Dashboard
- System statistics overview
- Flagged reports management
- Recent activity timeline
- Category analytics
- User management capabilities

## 🎨 Design System

### Colors
- **Primary**: Blue tones (#3b82f6 to #1e3a8a)
- **Secondary**: Green tones (#22c55e to #14532d)
- **Status Colors**: 
  - Reported: Yellow (#fbbf24)
  - In Progress: Blue (#3b82f6)
  - Resolved: Green (#10b981)

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Components
- Consistent button styles with hover states
- Form inputs with focus states
- Status badges with semantic colors
- Card layouts with subtle shadows
- Responsive grid systems

## 🔧 Key Features Implementation

### Location Services
- GPS-based location detection
- Manual location entry
- Distance calculation for issue filtering
- Location-based issue visibility

### File Upload
- Multiple image upload
- File size validation (5MB limit)
- Image preview functionality
- Drag and drop support

### Responsive Design
- Mobile-first approach
- Collapsible sidebar for mobile
- Responsive grid layouts
- Touch-friendly interface

### State Management
- React Context for global state
- Local state management with hooks
- Form state with validation
- Persistent user preferences

## 🚦 Status System

Issues progress through the following states:
1. **Reported**: Initial submission
2. **Acknowledged**: Confirmed by authorities
3. **In Progress**: Work has begun
4. **Resolved**: Issue has been fixed

## 👥 User Roles

### Citizens
- Report issues
- View nearby issues
- Comment on issues
- Track status updates
- Flag inappropriate content

### Administrators
- Manage all issues
- Review flagged content
- View analytics
- Moderate community
- Ban problematic users

## 🔒 Privacy & Safety

- Anonymous reporting options
- Community-driven moderation
- Automatic spam detection
- User privacy protection
- Secure data handling

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 📈 Future Enhancements

- Real-time notifications
- Integration with city services
- Mobile app development
- Advanced analytics
- Multi-language support
- API for third-party integrations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**CivicTrack** - Making communities better, one report at a time. 🏙️✨+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
