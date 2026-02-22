# DialogueDock — Client

<div align="center">

**A modern community forum platform for sharing thoughts and engaging in meaningful discussions.**

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)

🔗 **Live Site:** [https://ephemeral-cactus-81fe5b.netlify.app/](https://ephemeral-cactus-81fe5b.netlify.app/)

</div>

---

## 📖 Overview

DialogueDock's client is a **React + Vite** single-page application that powers a full-featured community forum. Users can browse posts, join discussions, manage their profiles, and upgrade to membership — all within a polished, responsive UI.

---

## ✨ Features

### 🌐 Public
| Feature | Description |
|---|---|
| **Home Feed** | Browse all community posts with infinite scroll |
| **Tag Filtering** | Filter posts by topic tags |
| **Post Details** | Read full posts with threaded comments |
| **Announcements** | View pinned community announcements |
| **Search** | Find posts by keyword or tag |
| **Testimonials** | Community highlights and platform stats |

### 🔐 Authentication
| Feature | Description |
|---|---|
| **Email/Password Login** | Secure credentials-based authentication via Firebase |
| **Google OAuth** | One-click Google sign-in |
| **CAPTCHA Protection** | Bot prevention on sign-up |
| **JWT Sessions** | Secure, token-based API authorization |

### 👤 User Dashboard (Private)
| Feature | Description |
|---|---|
| **My Profile** | View and edit personal information |
| **Add Post** | Rich post creation with category & tag picker |
| **My Posts** | Manage and delete your own posts & comments |
| **Membership** | Upgrade to Gold membership via Stripe payment |

### 🛡️ Admin Dashboard (Admin only)
| Feature | Description |
|---|---|
| **Manage Users** | View all users, grant/revoke admin roles |
| **Reported Activities** | Review and act on reported posts |
| **Admin Profile** | Admin-specific profile view |
| **Send Notifications** | Post site-wide announcements |

### 👑 Super Admin Dashboard (Super Admin only)
| Feature | Description |
|---|---|
| **Platform Stats** | Visual analytics via Recharts (posts, users, comments) |
| **Manage Admins** | Promote/demote users to Admin role |

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | React 18, Vite 5 |
| **Routing** | React Router DOM v6 |
| **Styling** | Tailwind CSS 3, DaisyUI |
| **State / Data Fetching** | TanStack React Query v5 |
| **HTTP Client** | Axios (with interceptors for JWT) |
| **Authentication** | Firebase (Email/Password + Google OAuth) |
| **Payments** | Stripe (`@stripe/react-stripe-js`) |
| **Animations** | Framer Motion |
| **Charts** | Recharts |
| **Forms** | React Hook Form |
| **Notifications** | SweetAlert2 |
| **Social Sharing** | React Share |
| **SEO** | React Helmet Async |

---

## 📁 Project Structure

```
src/
├── App.jsx               # Root component
├── main.jsx              # Entry point, providers setup
├── index.css             # Global styles
│
├── Components/           # Shared/reusable UI components
├── Firebase/             # Firebase app configuration
├── Hooks/                # Custom React hooks
│   ├── useAuth.jsx       # Access auth context
│   ├── useRole.jsx       # Role detection (user / admin / superAdmin)
│   ├── useAdmin.jsx      # Admin check shorthand
│   ├── useAxiosPublic.jsx   # Public Axios instance
│   ├── useAxiosSecure.jsx   # JWT-intercepted Axios instance
│   ├── useAllMsg.jsx     # Fetch all posts
│   ├── useInfiniteMsg.jsx   # Infinite-scroll posts hook
│   ├── useSingleMsg.jsx  # Fetch a single post
│   └── useAnnoucement.jsx   # Fetch announcements
│
├── Layout/               # Page shell layouts
│   ├── Main.jsx          # Public layout (navbar + footer)
│   └── DashBoard.jsx     # Dashboard layout (sidebar)
│
├── Pages/
│   ├── Home/             # Public-facing pages
│   │   ├── Home/         # Landing page
│   │   ├── Login/        # Login page
│   │   ├── SignUp/       # Registration page
│   │   ├── AllMsg/       # Posts feed + single post detail
│   │   ├── AllTags/      # Tag browser + tag detail
│   │   ├── Annoucement/  # Announcements section
│   │   ├── Banner/       # Hero banner
│   │   └── ...           # Other home sections
│   │
│   ├── DashBoard/        # User & admin dashboard pages
│   │   ├── MyProfile/    # User profile management
│   │   ├── AddPost/      # Post creation form
│   │   ├── MyPost/       # User's own posts
│   │   ├── DashboardHome/   # Dashboard overview
│   │   ├── AdminProfile/ # Admin-specific profile
│   │   ├── ManageUsers/  # Admin: user management
│   │   ├── ReportedActivities/ # Admin: reported content
│   │   ├── PlatformStats/   # Super admin analytics
│   │   └── ManageAdmins/    # Super admin: admin management
│   │
│   ├── Membership/       # Membership & Stripe payment
│   ├── About/            # About page
│   ├── Features/         # Features showcase
│   ├── Pricing/          # Pricing page
│   ├── FAQ/              # FAQ page
│   ├── ErrorPage/        # Error boundary page
│   └── NotFound/         # 404 page
│
└── Routes/
    ├── Routes.jsx         # All route definitions
    ├── PrivateRoute.jsx   # Auth guard
    ├── AdminRoute.jsx     # Admin-only guard
    └── SuperAdminRoute.jsx # Super admin-only guard
```

---

## 🗺️ Route Map

| Path | Access | Component |
|---|---|---|
| `/` | Public | Home |
| `/login` | Public | Login |
| `/signup` | Public | SignUp |
| `/about` | Public | About |
| `/features` | Public | Features |
| `/pricing` | Public | Pricing |
| `/membership` | Public | Membership |
| `/payment` | Private | Payment (Stripe) |
| `/allMsg/:id` | Public | Single Post Detail |
| `/tags/:tagName` | Public | Tag Page |
| `/dashboard` | Private | Dashboard Home |
| `/dashboard/myprofile` | Private | My Profile |
| `/dashboard/addpost` | Private | Add Post |
| `/dashboard/mypost` | Private | My Posts |
| `/dashboard/adminprofile` | Admin | Admin Profile |
| `/dashboard/notification` | Admin | Send Announcement |
| `/dashboard/manageusers` | Admin | Manage Users |
| `/dashboard/reportedactivities` | Admin | Reported Activities |
| `/dashboard/stats` | Super Admin | Platform Stats |
| `/dashboard/manage-admins` | Super Admin | Manage Admins |

---

## ⚙️ Environment Variables

Create a `.env` file in the root of `dialogue-dock-client/` with the following keys:

```env
# Firebase Configuration
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_firebase_storage_bucket
VITE_messagingSenderId=your_firebase_messaging_sender_id
VITE_appId=your_firebase_app_id

# Stripe Payment Gateway (Publishable Key)
VITE_Payment_Gateway_PK=your_stripe_publishable_key

# Backend API URL
VITE_API_URL=http://localhost:5000
```

> **Note:** Never commit your real `.env` file to version control. Use `.env.example` as a template for collaborators.

---

## 🚀 Local Setup

### Prerequisites
- **Node.js** v18 or later
- **npm** v9 or later
- A running instance of the [DialogueDock Server](../dialogue-dock-server/) (default: `http://localhost:5000`)

### Steps

```bash
# 1. Navigate to the client directory
cd dialogue-dock-client

# 2. Install dependencies
npm install

# 3. Create your environment file
cp .env.example .env
# Then fill in your Firebase and Stripe credentials in .env

# 4. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173** by default.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server (Vite HMR) |
| `npm run build` | Build production bundle to `/dist` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across all JS/JSX files |

---

## 🧪 Demo Credentials

To quickly explore the platform without registering:

| Role | Email | Password |
|---|---|---|
| **User** | `j@j.com` | `j@j.com` |

> Admin and Super Admin roles require manual promotion via the database or the Super Admin dashboard.

---

## 🤝 Role System

DialogueDock uses a three-tier role system enforced on both the client (route guards) and server (middleware):

| Role | Capabilities |
|---|---|
| **Normal User** | Browse, post, comment, report, manage own content, purchase membership |
| **Admin** | All user capabilities + manage users, view reports, send announcements |
| **Super Admin** | All admin capabilities + view platform analytics, manage admins |

---

## 📄 License

This project is for educational and portfolio purposes.
