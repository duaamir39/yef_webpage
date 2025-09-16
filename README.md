I have updated the `README.md` file to include the Oracle Database setup commands and download links.

---

# Youth Evolution Foundation

This project is a Next.js application for the Youth Evolution Foundation, a non-profit organization focused on empowering youth. The website provides information about the foundation's vision, programs, and ways for people to get involved.

---

## 1\. Project Overview

The website is built with **Next.js**, leveraging **TypeScript** for type safety and **Tailwind CSS** for a utility-first styling approach. It uses `shadcn/ui` components for a consistent and accessible UI, and **Framer Motion** for animations. The application connects to an **Oracle Database** for data storage.

---

## 2\. Team and Page Assignments

This breakdown ensures each team member has a clear focus and responsibility for specific pages and sections of the website.

- **Dua:** **Blog / Stories** and **Team and Leadership** pages.
- **Subhan:** **Partners / Collaboration** and **Volunteer** pages.
- **Abdul Basit:** **Vision and Mission / Our Story** and **Careers / Internship** pages.
- **Wardah:** **Impact / Achievements** and **Contact Us** pages.
- **Kunzul:** **Projects** and **Courses** pages.
- **Faiza:** **Events** and **Gallery / Press** pages.
- **Fariya Khan:** **Membership** and **Donate** pages.

---

## 3\. Color Palette

The primary colors for this project are:

- **Blue:** `#024da1`
- **White:** `#FFFFFF`

Use these hex codes for backgrounds, text, and other elements to maintain a consistent look and feel across the entire website.

---

## 4\. Getting Started

### Prerequisites

Make sure you have Node.js and npm (or yarn/pnpm) installed on your machine. You will also need to set up the Oracle Database client.


### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd my-app
    ```
3.  Install the dependencies, including the Oracle database driver:
    ```bash
    npm install
    ```

---

## 5\. Key Technologies

- **Next.js:** A React framework for building full-stack web applications.
- **React:** A JavaScript library for building user interfaces.
- **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **Framer Motion:** A production-ready motion library for React.
- **Shadcn/ui:** A collection of re-usable components for building modern UIs.
- **Lucide React:** A set of beautiful and consistent open-source icons.
- **Node-oracledb:** A Node.js driver for connecting to an Oracle Database.

---

## 6\. Project Structure

The project follows a standard Next.js application structure. Here are the key directories and files:

- `app/`: Contains the main pages and routes of the application.
- `components/`: Houses reusable React components, including the `Navbar.tsx` and `Footer.tsx`.
- `public/`: Stores static assets like images and fonts.
- `styles/`: Contains global CSS files.
- `package.json`: Manages project dependencies and scripts.
- `tailwind.config.js`: Configuration file for Tailwind CSS.
- `tsconfig.json`: Configuration file for TypeScript.

---

## 7\. Scripts

The `package.json` file includes the following scripts for development and building:

- `npm run dev`: Starts the development server with Turbopack.
- `npm run build`: Builds the application for production with Turbopack.
- `npm run start`: Starts the production server.
- `npm run lint`: Lints the codebase using ESLint to enforce code style.







# 🔐 Authentication System Documentation

## 📋 Overview

We've implemented a modern, seamless authentication system for Youth Evolution Foundation using NextAuth.js v5 with MongoDB. The system features modal-based authentication that maintains user context without page redirects.

## 🚀 Features

- **Modal-based Authentication** - No page reloads, maintains user context
- **MongoDB Integration** - Secure user data storage
- **Protected Routes** - Automatic redirect for unauthenticated users
- **Responsive Design** - Works on desktop and mobile
- **Seamless UX** - Users continue their action after authentication

## 🛠 Tech Stack

- **Next.js 15.5.3** - React framework
- **NextAuth.js v5** - Authentication
- **MongoDB** - Database
- **Radix UI** - Accessible components
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## 📁 Project Structure

```
src/
├── app/
│   ├── context/
│   │   └── AuthContext.tsx          # Authentication state management
│   ├── components/
│   │   ├── AuthModal.tsx            # Authentication modal
│   │   ├── DonateButton.tsx         # Protected action button
│   │   ├── UserAvatar.tsx           # User profile dropdown
│   │   ├── ApplyButton.tsx          # Course application button
│   │   └── Navbar.tsx               # Updated with auth controls
│   ├── api/
│   │   └── auth/
│   │       ├── [...nextauth]/
│   │       │   └── route.ts         # NextAuth API route
│   │       └── register/
│   │           └── route.ts         # User registration API
│   └── donate/
│       └── page.tsx                 # Protected donation page
├── auth.ts                          # NextAuth configuration
└── lib/
    └── mongodb.ts                   # Database connection
```

## 🔧 Setup Instructions

### 1. Environment Variables
```env
MONGODB_URI=------------------
NEXTAUTH_URL=-----------------
NEXTAUTH_SECRET=--------------
```

### 2. Installation
```bash
npm install next-auth@beta mongodb mongoose bcryptjs
npm install -D @types/bcryptjs
```

### 3. Database Setup
MongoDB collections are automatically created by NextAuth.js:
- `users` - User accounts and profiles
- `accounts` - OAuth connections
- `sessions` - Active user sessions
- `verificationTokens` - Email verification

## 🎯 How It Works

### Authentication Flow
1. User clicks protected action (Donate, Apply)
2. Auth modal appears if not authenticated
3. User can login or register within modal
4. After authentication, user is redirected to intended action
5. Session persists across navigation

### Modal Components
- **AuthModal** - Combined login/register forms
- **DonateButton** - Protected donation action
- **ApplyButton** - Protected course application
- **UserAvatar** - User profile and logout dropdown


## 🎨 Customization

### Styling the Auth Modal
Edit `app/components/AuthModal.tsx`:
- Modify background: `bg-transparent backdrop-blur-md`
- Change colors: `text-[#024da1]`, `bg-[#024da1]`
- Adjust form layout and spacing

### Adding New Protected Actions
1. Create new button component following `DonateButton` pattern
2. Add to relevant pages
3. Update middleware if new routes need protection

## 🐛 Troubleshooting

### Common Issues
1. **MongoDB Connection** - Check `MONGODB_URI` in environment variables
2. **Session Not Persisting** - Verify `NEXTAUTH_SECRET` is set
3. **Modal Not Opening** - Check AuthContext provider in layout



## 📈 Performance Notes

- **Optimized Images** - Next.js Image component for logos
- **Efficient Rerenders** - Context API prevents unnecessary updates
- **Lazy Loading** - Components load only when needed

## 🔄 Future Enhancements

- [ ] Social login (Google, Facebook)
- [ ] Email verification
- [ ] Password reset flow
- [ ] Two-factor authentication
- [ ] Admin role management
