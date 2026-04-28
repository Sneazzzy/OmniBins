# OmniBins - Smart Waste Management System
## Complete Web & Mobile Platform

This is a comprehensive solution providing both web dashboard and native mobile app for intelligent waste management using IoT sensors.

## 📁 Project Structure

```
OmniBins/
├── src/                              # Web Dashboard (React + Vite)
│   ├── app/
│   │   ├── pages/                   # 12+ pages (Dashboard, BinMonitoring, etc.)
│   │   ├── components/              # 50+ UI components
│   │   ├── layouts/                 # Dashboard layout
│   │   └── routes.tsx               # Routing configuration
│   ├── styles/                      # Tailwind CSS + Theme
│   └── main.tsx
│
├── Mobile/OmniBins/                  # Mobile App (React Native + Expo)
│   ├── app/
│   │   ├── auth/                    # Authentication screens
│   │   ├── (tabs)/                  # 6 main screens
│   │   └── _layout.tsx              # Root layout
│   ├── store/                       # State management (Zustand)
│   ├── services/                    # API client
│   ├── types/                       # TypeScript definitions
│   ├── utils/                       # Helper functions
│   └── package.json
│
├── package.json                      # Root project config
├── vite.config.ts                   # Web build config
├── tsconfig.json                    # TypeScript config
└── README.md                        # This file
```

## 🌐 Web Dashboard

### Technology Stack
- **React 18.3.1** + **Vite 6.4.1** - Fast development & production builds
- **React Router 7.13.0** - Client-side routing
- **Radix UI** - Accessible component library (45+ components)
- **Tailwind CSS 4.1.12** - Utility-first styling
- **Recharts** - Data visualization
- **Motion** - Smooth animations
- **React Hook Form** - Form management

### Pages Implemented (12 pages)

| Page | Purpose |
|------|---------|
| **Landing Page** | Public marketing & login entry |
| **Dashboard** | Executive overview with KPIs |
| **Bin Monitoring** | Real-time weight & status tracking |
| **Collections** | Waste collection task management |
| **Map Location** | Geographic bin visualization |
| **Rot Index** | Decomposition monitoring & alerts |
| **Alerts** | Notification & alert center |
| **Analytics** | Reporting & trend analysis |
| **Workers** | Team & workforce management |
| **Maintenance** | System health & scheduling |
| **User Management** | Admin & role-based access |
| **Not Found** | 404 error handling |

### Features
- ✅ Real-time data visualization
- ✅ Multi-role access control
- ✅ Responsive design
- ✅ Dark mode support
- ✅ Interactive maps
- ✅ Advanced charts & graphs

### Running Web Dashboard
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📱 Mobile App

### Technology Stack
- **React Native 0.81.5** - Native mobile development
- **Expo 54.0.33** - Development platform & build service
- **Expo Router 6.0.23** - File-based routing
- **React Navigation 7.1.8** - Native navigation
- **NativeWind 4.2.3** - Tailwind CSS for React Native
- **Zustand** - Lightweight state management
- **Axios** - HTTP client
- **TypeScript 5.9.2** - Type safety

### Screens Implemented (6 screens)

| Screen | Features |
|--------|----------|
| **Dashboard** | KPI summary, alerts, quick stats |
| **Alerts** | Alert list, severity filter, resolve |
| **Bins** | Real-time monitoring, capacity, status |
| **Map** | Location view, coordinates, nearby bins |
| **Tasks** | Collection tasks, priority, completion |
| **Profile** | User info, settings, logout |

### Android/iOS Support
- ✅ **Android 8.0+** (API 26+) - Full compatibility
- ✅ **iOS 12.0+** - Full compatibility
- ✅ **Web** - Via Expo Web

### Features
- ✅ Secure authentication
- ✅ Real-time status monitoring
- ✅ Alert management
- ✅ Task tracking
- ✅ Dark mode support
- ✅ Offline-ready architecture

### Running Mobile App
```bash
cd Mobile/OmniBins

# Install dependencies
npm install

# Start development server (Android)
expo start --android

# Start development server (iOS)
expo start --ios

# Build for production (Android)
eas build --platform android

# Build for production (iOS)
eas build --platform ios
```

## 🔐 Authentication System

Both web and mobile apps use JWT-based authentication:

### Features
- Email/password authentication
- User registration
- Role-based access control (admin, manager, staff, analyst, worker)
- Token refresh mechanism
- Secure token storage (mobile: Expo SecureStore)
- Session management

### Roles
- **Admin** - Full system access
- **Manager** - Oversee operations
- **Staff** - Day-to-day operations
- **Analyst** - Analytics & reporting
- **Worker** - Mobile field operations

## 📊 Data Models

### Bin
```typescript
- id, location, latitude, longitude
- capacity, currentWeight, weightPercentage
- status (empty, partial, full, overflowing)
- battery level, sensorHealth
- lastCollection, lastUpdate
```

### Alert
```typescript
- id, binId, type, title, description
- severity (high, medium, low)
- resolved status, acknowledgedBy
- createdAt, updatedAt
```

### Collection Task
```typescript
- id, binId, assignedTo
- priority (high, medium, low)
- status (pending, in-progress, completed)
- estimatedTime, completedAt
```

### User
```typescript
- id, email, name, role
- avatar, phone
- createdAt, updatedAt
```

## 🔌 API Integration

Both applications use a pre-configured API client that's ready to connect to a backend server.

### Pre-configured Endpoints

**Authentication**
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/logout` - User logout

**Bins**
- `GET /bins` - List all bins
- `GET /bins/:id` - Get bin details
- `PUT /bins/:id` - Update bin
- `GET /bins/:id/gas-readings` - Get gas data

**Alerts**
- `GET /alerts` - List alerts
- `POST /alerts/:id/acknowledge` - Mark acknowledged
- `POST /alerts/:id/resolve` - Resolve alert

**Tasks**
- `GET /tasks` - List tasks
- `POST /tasks` - Create task
- `PUT /tasks/:id` - Update task
- `POST /tasks/:id/complete` - Mark complete

**Analytics**
- `GET /analytics/system` - System metrics
- `GET /analytics/bins/:id` - Bin analytics

### Environment Configuration

**Web Dashboard** (root `.env`)
```
VITE_API_URL=http://localhost:3000/api
```

**Mobile App** (`Mobile/OmniBins/.env`)
```
EXPO_PUBLIC_API_URL=http://localhost:3000/api
```

## 🚀 Getting Started

### 1. Web Dashboard

```bash
# Install & start
npm install
npm run dev

# Visit http://localhost:5173
# Login with your credentials
```

### 2. Mobile App

```bash
cd Mobile/OmniBins
npm install
expo start --android  # or --ios

# Scan QR code with Expo Go app or use emulator
```

## 🔄 Synchronization

Both web and mobile apps consume the same backend API, ensuring:
- ✅ Real-time data consistency
- ✅ Single source of truth
- ✅ Synchronized user sessions
- ✅ Unified alert system
- ✅ Shared task management

## 📋 Feature Comparison

| Feature | Web | Mobile |
|---------|-----|--------|
| Dashboard | ✅ | ✅ |
| Bin Monitoring | ✅ | ✅ |
| Alerts | ✅ | ✅ |
| Collections | ✅ | ✅ |
| Map View | ✅ | ✅ |
| Analytics | ✅ | Planned |
| User Management | ✅ | Profile Only |
| Worker Management | ✅ | Limited |
| Real-time Updates | ✅ | Planned |
| Offline Support | ❌ | Planned |
| Push Notifications | ❌ | Planned |

## 📦 Build & Deployment

### Web Dashboard
```bash
# Production build
npm run build

# Deploy to your hosting
# Vite outputs to 'dist' directory
```

### Mobile App
```bash
# Build APK/AAB for Google Play
cd Mobile/OmniBins
eas build --platform android

# Build IPA for App Store
eas build --platform ios
```

## 🛠️ Development Tools

### Required
- Node.js 16+
- npm 8+ or yarn
- Git

### Recommended
- Android SDK 26+ (for Android development)
- Xcode 14+ (for iOS development)
- VS Code with extensions

### Code Quality
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Tailwind CSS for styling

## 📚 Documentation

### Web Dashboard
- [Web Dashboard Setup](src/README.md)
- [Component Library](src/app/components/)

### Mobile App
- [Mobile Quick Start](Mobile/OmniBins/QUICK_START.md)
- [Migration Guide](Mobile/OmniBins/MIGRATION_GUIDE.md)
- [Migration Complete](Mobile/OmniBins/MIGRATION_COMPLETE.md)

## 🔐 Security

### Implemented
- ✅ JWT authentication
- ✅ Secure token storage
- ✅ HTTPS-ready
- ✅ Input validation
- ✅ Role-based access control
- ✅ Protected routes

### Recommendations
- Use HTTPS in production
- Implement rate limiting
- Set up CORS properly
- Regular security audits
- Keep dependencies updated

## 🎯 Roadmap

### Phase 1 (Complete) ✅
- Web dashboard with all features
- Mobile app with core features
- Authentication system
- API client setup

### Phase 2 (Planned)
- WebSocket real-time updates
- Push notifications
- Offline support
- Advanced analytics
- QR code scanning

### Phase 3 (Future)
- AI-powered predictions
- Machine learning alerts
- Advanced mapping
- Integration with IoT hardware
- Multi-language support

## 🐛 Common Issues

### Web Dashboard
**Port already in use**
```bash
npm run dev -- --port 3001
```

**Build fails**
```bash
rm -rf node_modules
npm install
npm run build
```

### Mobile App
**App won't start**
```bash
cd Mobile/OmniBins
expo prebuild --clean
npm install
expo start --android
```

**Can't connect to API**
- Check `.env` variables
- Ensure backend server is running
- Check network connectivity

## 📞 Support & Documentation

- [Expo Docs](https://docs.expo.dev)
- [React Native Docs](https://reactnative.dev)
- [Vite Docs](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)

## 📄 License

[Your License Here]

## 👥 Team

OmniBins Development Team

---

**Status**: ✅ Both Web and Mobile Apps Ready for Production

**Last Updated**: April 25, 2026

