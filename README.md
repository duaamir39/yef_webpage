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

### Oracle Database Setup

1.  **Download Oracle Database XE and Instant Client:**

    - **Oracle Database XE:** [Download here](https://www.oracle.com/database/technologies/xe-downloads.html)
    - **Oracle Instant Client:** [Download here](https://www.oracle.com/database/technologies/instant-client/downloads.html)

2.  **Install the Database and Client:** Follow the installation guides on the download pages. After installation, you must set environment variables to configure the client.

    For example, on Windows:

    ```bash
    # Set the path to your Instant Client installation directory
    set OCI_LIB_DIR=C:\oracle\instantclient_21_9
    set PATH=%PATH%;%OCI_LIB_DIR%
    ```

    For example, on Linux:

    ```bash
    # Set the path to your Instant Client installation directory
    export OCI_LIB_DIR=/usr/local/lib/instantclient_21_9
    export LD_LIBRARY_PATH=$OCI_LIB_DIR:$LD_LIBRARY_PATH
    ```

3.  **Install VS Code Extension:** For easier development and database management, install the "Oracle SQL Developer" extension in Visual Studio Code.

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
