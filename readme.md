# eTuition - Find Your Tutor Anywhere 🎓

A modern, full-stack tutoring platform connecting students with verified tutors across the globe. Built with React, Firebase, and a robust backend API.

**Live Platform:** [https://etuition-1e987.web.app/](https://etuition-1e987.web.app/)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Key Features Explained](#key-features-explained)
- [API Endpoints](#api-endpoints)
- [User Roles](#user-roles)
- [Payment Integration](#payment-integration)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### For Students
- 📝 **Post Tuition Requests** - Create detailed tuition listings with budget, subject, and location
- 👥 **Manage Applicants** - Review tutor applications with qualifications and salary expectations
- 💳 **Secure Payments** - Stripe integration for safe tuition payments
- 📊 **Payment History** - Track all transactions and payments made
- 🔍 **Browse Tutors** - Discover 1000+ verified tutors across multiple subjects

### For Tutors
- 📨 **Apply to Tuitions** - Submit applications with qualifications and expected salary
- ✅ **Manage Applications** - Track application status and earnings
- 💰 **Revenue Dashboard** - View total earnings and payment history
- ⭐ **Build Reputation** - Showcase skills and subjects taught

### For Administrators
- 📊 **Platform Analytics** - Real-time statistics on users, tuitions, and revenue
- 👤 **User Management** - Manage user accounts and roles (Student/Tutor/Admin)
- ✔️ **Approve Tuitions** - Review and approve tuition postings
- 💵 **Revenue Tracking** - Monitor platform earnings and payment logs

---

## 🛠 Tech Stack

### Frontend
- **React 19.2** - UI library
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Styling
- **DaisyUI** - Component library
- **React Router** - Navigation
- **React Hook Form** - Form management
- **TanStack React Query** - Data fetching & caching
- **Framer Motion** - Animations
- **Chart.js** - Data visualization
- **Lottie** - Animated illustrations

### Backend
- **Node.js + Express** - API server
- **MongoDB** - Database
- **Firebase Auth** - Authentication
- **Stripe** - Payment processing
- **Vercel** - Backend hosting

### DevTools
- **ESLint** - Code quality
- **Firebase CLI** - Deployment
- **ImgBB** - Image hosting

---

## 📁 Project Structure

```
src/
├── Components/
│   ├── AuthLayout/          # Login, Register, Auth Guards
│   ├── Navbar/              # Navigation
│   ├── Footer/              # Footer Component
│   ├── Tutors/              # Tutor listing & profile
│   ├── Tuitions/            # Tuition listing & details
│   ├── Users/               # User profile
│   ├── Hooks/               # Custom hooks (useAuth, useAxiosSecure, useRole)
│   └── Loading/             # Loading states
├── Layouts/
│   ├── Dashboard/           # All dashboard components
│   │   ├── DashboardHome.jsx
│   │   ├── MyTuitions.jsx
│   │   ├── MyPayments.jsx
│   │   ├── Applicants.jsx
│   │   ├── AppliedTuitions.jsx
│   │   ├── ApprovedTuitions.jsx
│   │   ├── Revenue.jsx
│   │   ├── AdminManageUser.jsx
│   │   ├── AdminManageTuitions.jsx
│   │   └── AdminSiteRevenue.jsx
│   ├── Home/                # Landing page
│   └── RootLayout/          # Main layout wrapper
├── Router/
│   └── Router.jsx           # Route configuration
├── Firebase/
│   └── firebase.config.js   # Firebase setup
└── public/                  # Static assets
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Firebase account
- Stripe account (for payments)
- ImgBB API key (for image uploads)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/etuition.git
cd etuition
```

2. **Install dependencies**
```bash
npm install
```

3. **Create `.env` file in root directory**
```bash
cp .env.example .env
```

4. **Start development server**
```bash
npm run dev
```

The app runs on `http://localhost:5173`

---

## 🔑 Environment Variables

Create a `.env` file in the root directory with:

```
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_firebase_storage_bucket
VITE_messagingSenderId=your_firebase_messaging_id
VITE_appId=your_firebase_app_id

VITE_image_host_key=your_imgbb_api_key
```

Backend Environment Variables (Server Repository):
```
MONGODB_URI=your_mongodb_connection
STRIPE_SECRET_KEY=your_stripe_secret
FIREBASE_SERVICE_ACCOUNT=your_firebase_service_account_json
PORT=3000
```

---

## 📱 Usage

### For Students

1. **Sign Up** - Register as a Student
2. **Create Tuition** - Go to Dashboard → Add Tuition
   - Select subject, mode (online/offline), location, budget
   - Submit for admin approval
3. **Browse Tutors** - Visit Tutors page to find qualified instructors
4. **Manage Applications** - Review applicants in Applicants section
5. **Make Payment** - Accept tutor → Process payment via Stripe
6. **Track History** - View all payments in Payment History

### For Tutors

1. **Sign Up** - Register as a Tutor
2. **Browse Tuitions** - Visit Tuitions page
3. **Apply** - Submit application with qualifications & expected salary
4. **Track Status** - Monitor applications in My Applications
5. **Get Paid** - Once approved, track earnings in Revenue section

### For Administrators

1. **Access Admin Dashboard** - Auto-enabled for admin accounts
2. **Manage Users** - Edit/delete user accounts, change roles
3. **Approve Tuitions** - Review pending tuition posts
4. **Monitor Revenue** - Track platform earnings and payment logs

---

## 🔌 Key Features Explained

### Authentication
- Firebase Authentication with email/password
- Google OAuth login
- Role-based access control (Student/Tutor/Admin)

### Payment System
- Stripe integration for secure payments
- Payment success/failure handling
- Transaction logging for admins

### Real-Time Data
- TanStack React Query for smart data fetching
- Automatic cache management
- Refetch on demand

### Form Management
- React Hook Form for efficient form handling
- SweetAlert2 for user confirmations
- Input validation and error handling

### Responsive Design
- Mobile-first approach
- Tailwind CSS breakpoints
- DaisyUI pre-built components

---

## 📊 API Endpoints

### Authentication
- `POST /users` - Create user profile
- `GET /users` - Get all users
- `GET /users/:email` - Get user by email
- `PATCH /users/:email` - Update user profile
- `DELETE /users/:id` - Delete user

### Tuitions
- `GET /tuitions` - Get all tuitions
- `GET /tuitions/:id` - Get tuition details
- `POST /newtuition` - Create tuition
- `PATCH /tuitions/:id` - Update tuition
- `DELETE /tuitions/:id` - Delete tuition
- `GET /tuitions/creator/:email` - Get user's tuitions

### Applications
- `POST /apply` - Submit tutor application
- `GET /applications/creator/:email` - Get tutor's applications
- `GET /applications/approved/:email` - Get approved applications
- `PATCH /applications/:id` - Update application

### Payments
- `POST /checkout` - Create payment session
- `POST /payment-success` - Confirm payment
- `GET /admin/payments-log` - Get all payments (admin)

### Admin
- `GET /admin/tuitions/all` - Get all tuitions
- `PATCH /admin/tuitions/accept/:id` - Approve tuition
- `DELETE /admin/tuitions/delete/:id` - Delete tuition
- `PATCH /admin/update-user/:id` - Update user

---

## 👥 User Roles

| Role | Capabilities |
|------|--------------|
| **Student** | Post tuitions, manage applicants, make payments, browse tutors |
| **Tutor** | Apply to tuitions, track applications, view earnings |
| **Admin** | Manage users, approve tuitions, monitor revenue |

---

## 💳 Payment Integration

- **Provider**: Stripe
- **Frontend**: React integration with Stripe
- **Backend**: Secure session creation and confirmation
- **Webhooks**: Payment event handling
- **Currency**: Bangladeshi Taka (৳) with USD conversion

---

## 📈 Platform Statistics

- **1000+** Verified Tutors
- **10+** Countries Served
- **Starting from** ৳6,000/month
- **24/7** Customer Support
- **98%** Same-day class start rate

---

## 🤝 Contributing

We welcome contributions! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 Scripts

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Linting
npm run lint         # Run ESLint

# Firebase
firebase deploy     # Deploy to Firebase Hosting
```

---

## 🐛 Known Issues & Limitations

- Payment system requires Stripe account setup
- Image hosting uses ImgBB (requires API key)
- Real-time updates use polling instead of WebSockets
- Mobile app support coming soon

---

## 🛡️ Security Features

- Firebase Authentication for secure login
- JWT token validation
- Role-based access control
- Secure payment processing with Stripe
- Protected API routes with authorization headers
- XSS and CSRF protection via React

---

## 📞 Support

For issues, suggestions, or feature requests:
- Email: support@etuition.com
- GitHub Issues: [Create an issue](https://github.com/yourusername/etuition/issues)
- Live Chat: Available on [etuition.com](https://etuition-1e987.web.app/)

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙌 Acknowledgments

- **React Team** for the incredible library
- **Stripe** for secure payments
- **Firebase** for backend services
- **TailwindCSS** for styling framework
- **All Contributors** who made this possible

---

## 🚀 Future Enhancements

- [ ] Video call integration (Zoom/Google Meet)
- [ ] Real-time notifications
- [ ] AI-powered tutor matching
- [ ] Mobile app (React Native)
- [ ] Subscription plans
- [ ] Schedule management system
- [ ] Student progress tracking
- [ ] Certificate generation

---

**Last Updated:** December 2024

**Current Version:** 1.0.0

**Maintainer:** Development Team

Made with ❤️ by the eTuition Team