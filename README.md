# QuickServe 🚀

A modern, full-stack service booking platform that connects customers with local service providers. Built with Spring Boot, React, and PostgreSQL, QuickServe offers a seamless experience for booking and managing home services.

![QuickServe](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.9-brightgreen.svg)
![React](https://img.shields.io/badge/React-18.2.0-61dafb.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### For Customers
- 🔍 **Smart Service Discovery** - Find local service providers with interactive map integration (TomTom Maps)
- 📅 **Easy Booking** - Book services with real-time availability checking
- 📍 **Location-Based Search** - View providers on an interactive map with distance calculation
- 📊 **Booking Management** - Track and manage all your bookings in one place
- ⭐ **Reviews & Ratings** - Rate and review service providers
- 👤 **Profile Management** - Manage personal information and preferences

### For Service Providers
- 📈 **Dashboard Analytics** - Track bookings, earnings, and performance metrics
- 📅 **Booking Management** - Accept, reject, and manage service requests
- 💰 **Earnings Tracking** - Monitor revenue and payment history
- 🕐 **Working Hours** - Set and manage availability schedules
- 📝 **Service Catalog** - Create and manage service offerings
- 📊 **Performance Insights** - View booking statistics and customer feedback

### Security & Authentication
- 🔐 **JWT Authentication** - Secure token-based authentication
- 📧 **Email Verification** - Account verification via email
- 🔑 **Password Recovery** - Secure password reset functionality
- 👥 **Role-Based Access Control** - Separate customer and provider dashboards

## 🛠 Tech Stack

### Backend
- **Framework**: Spring Boot 3.5.9
- **Language**: Java 17
- **Database**: PostgreSQL
- **Security**: Spring Security + JWT (JSON Web Tokens)
- **ORM**: Spring Data JPA
- **Email**: Spring Boot Mail
- **Build Tool**: Maven

### Frontend
- **Framework**: React 18.2.0
- **Build Tool**: Vite 7.2.4
- **Routing**: React Router DOM 7.9.6
- **State Management**: Recoil 0.7.7
- **Styling**: Tailwind CSS 4.1.17
- **UI Components**: Radix UI, Lucide React
- **Animations**: Framer Motion 12.23.26
- **Maps**: TomTom Web SDK 6.25.0
- **Charts**: Recharts 3.5.1
- **HTTP Client**: Axios 1.13.2

## 🏗 Architecture

```
QuickServe/
├── Backend/                 # Spring Boot REST API
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── group_b/backend/
│   │       │       ├── config/          # Security & CORS configuration
│   │       │       ├── controller/      # REST endpoints
│   │       │       ├── dto/             # Data Transfer Objects
│   │       │       ├── exception/       # Custom exceptions
│   │       │       ├── model/           # JPA entities
│   │       │       ├── repository/      # Data access layer
│   │       │       ├── security/        # JWT & authentication
│   │       │       └── service/         # Business logic
│   │       └── resources/
│   │           └── application.properties
│   └── pom.xml
│
└── Frontend/                # React SPA
    ├── src/
    │   ├── api/             # API service layer
    │   ├── components/      # Reusable components
    │   │   ├── ui/          # UI primitives
    │   │   └── icons/       # Icon components
    │   ├── pages/           # Route pages
    │   │   ├── CustomerSubpages/
    │   │   └── Subpages/
    │   ├── hooks/           # Custom React hooks
    │   ├── state/           # Recoil state management
    │   ├── lib/             # Utilities
    │   ├── Styles/          # Global styles
    │   └── assets/          # Static assets
    └── package.json
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Java Development Kit (JDK) 17** or higher
  - [Download JDK](https://www.oracle.com/java/technologies/downloads/)
  - Verify: `java -version`

- **Maven 3.6+** (or use included Maven wrapper)
  - [Download Maven](https://maven.apache.org/download.cgi)
  - Verify: `mvn -version`

- **Node.js 18+** and **npm**
  - [Download Node.js](https://nodejs.org/)
  - Verify: `node -v` and `npm -v`

- **PostgreSQL 12+**
  - [Download PostgreSQL](https://www.postgresql.org/download/)
  - Verify: `psql --version`

- **Git**
  - [Download Git](https://git-scm.com/downloads)
  - Verify: `git --version`

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/quick-serve.git
cd quick-serve/quick-serve-rajesh-updated
```

### 2. Database Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE quickserve;
CREATE USER quickserve_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE quickserve TO quickserve_user;
```

### 3. Backend Setup

```bash
cd Backend

# Copy environment template
cp .env.example .env

# Edit .env with your configuration
# (See Configuration section below)

# Install dependencies and build
./mvnw clean install

# Or on Windows
mvnw.cmd clean install
```

### 4. Frontend Setup

```bash
cd ../Frontend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env with your configuration
# (See Configuration section below)
```

## ⚙️ Configuration

### Backend Configuration

Edit `Backend/.env`:

```env
# Database Configuration
DB_URL=jdbc:postgresql://localhost:5432/quickserve?sslmode=disable
DB_USERNAME=quickserve_user
DB_PASSWORD=your_password

# Email Configuration (Gmail example)
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your_gmail_app_password

# JWT Configuration
JWT_SECRET=your_secure_random_string_minimum_64_characters_long
JWT_EXPIRATION_MS=86400000
```

> **Note**: For Gmail, you need to generate an [App Password](https://support.google.com/accounts/answer/185833).

### Frontend Configuration

Edit `Frontend/.env`:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8080/api

# TomTom Maps API Key
VITE_TOMTOM_API_KEY=your_tomtom_api_key_here
```

> **Note**: Get a free TomTom API key from [TomTom Developer Portal](https://developer.tomtom.com/).

## 🏃 Running the Application

### Start Backend (Port 8080)

```bash
cd Backend

# Using Maven wrapper
./mvnw spring-boot:run

# Or on Windows
mvnw.cmd spring-boot:run

# Or if you have Maven installed
mvn spring-boot:run
```

The backend API will be available at `http://localhost:8080`

### Start Frontend (Port 5173)

```bash
cd Frontend

# Development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Access the Application

Open your browser and navigate to:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080/api

## 📁 Project Structure

### Backend Modules

| Module | Description |
|--------|-------------|
| `config` | Security configuration, CORS, and application settings |
| `controller` | REST API endpoints for authentication, bookings, services |
| `dto` | Request/Response data transfer objects |
| `exception` | Custom exception handlers |
| `model` | JPA entities (User, Booking, ServiceProvider, Review, etc.) |
| `repository` | Spring Data JPA repositories |
| `security` | JWT utilities, authentication filters |
| `service` | Business logic and service layer |

### Frontend Structure

| Directory | Description |
|-----------|-------------|
| `api/` | Axios API service layer with interceptors |
| `components/` | Reusable React components |
| `components/ui/` | UI primitives (buttons, cards, alerts) |
| `pages/` | Route-based page components |
| `pages/CustomerSubpages/` | Customer dashboard pages |
| `pages/Subpages/` | Provider dashboard pages |
| `hooks/` | Custom React hooks (useAlert, useAuth) |
| `state/` | Recoil atoms and selectors |
| `lib/` | Utility functions |
| `Styles/` | Global CSS and Tailwind configuration |

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/logout` | User logout |
| POST | `/api/auth/verify-email` | Verify email address |
| POST | `/api/auth/forgot-password` | Request password reset |
| POST | `/api/auth/reset-password` | Reset password |

### Customer Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/customer/profile` | Get customer profile |
| PUT | `/api/customer/profile` | Update customer profile |
| GET | `/api/customer/bookings` | Get customer bookings |
| POST | `/api/customer/bookings` | Create new booking |
| GET | `/api/services/search` | Search service providers |

### Provider Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/provider/profile` | Get provider profile |
| PUT | `/api/provider/profile` | Update provider profile |
| GET | `/api/provider/bookings` | Get provider bookings |
| PUT | `/api/provider/bookings/{id}` | Update booking status |
| GET | `/api/provider/earnings` | Get earnings data |
| GET | `/api/provider/services` | Get provider services |
| POST | `/api/provider/services` | Add new service |

## 🎨 Key Features Implementation

### Interactive Map Integration
- **TomTom Maps SDK** for rendering interactive maps
- **Geolocation API** for user location detection
- **Distance Calculation** between user and service providers
- **Route Visualization** with turn-by-turn directions
- **Custom Markers** for service provider locations

### Real-time Booking System
- **Availability Checking** based on provider working hours
- **Booking Status Management** (Pending, Confirmed, Completed, Cancelled)
- **Email Notifications** for booking confirmations
- **Loading Animations** for better UX during booking submission

### Modern UI/UX
- **Glassmorphism** design elements
- **Micro-animations** with Framer Motion
- **Responsive Design** for all screen sizes
- **Custom Alert System** replacing native browser alerts
- **Dark Mode** support (if implemented)

## 🔒 Security Features

- **JWT Token Authentication** with HTTP-only cookies
- **Password Hashing** using BCrypt
- **CORS Configuration** for secure cross-origin requests
- **Email Verification** for account activation
- **Role-Based Access Control** (Customer/Provider)
- **Secure Password Reset** with time-limited tokens

## 🧪 Testing

### Backend Tests

```bash
cd Backend
./mvnw test
```

### Frontend Tests

```bash
cd Frontend
npm run test
```

## 🚢 Deployment

### Backend Deployment

1. Build the production JAR:
```bash
cd Backend
./mvnw clean package -DskipTests
```

2. The JAR file will be in `target/backend-0.0.1-SNAPSHOT.jar`

3. Deploy to your server or cloud platform (Heroku, AWS, etc.)

### Frontend Deployment

1. Build for production:
```bash
cd Frontend
npm run build
```

2. The build files will be in `dist/` directory

3. Deploy to hosting service (Vercel, Netlify, AWS S3, etc.)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.



## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- React team for the amazing library
- TomTom for the mapping services
- All contributors who helped with this project

## 📞 Support

For support, email quickservemsg@gmail.com or open an issue in the GitHub repository.

---

**Made with ❤️ by the QuickServe Team**
