# Magic Touch Online Services Website 🌐  

A modern and user-friendly platform where users can **browse**, **search**, and **order** services. Built with **Next.js**, **Tailwind CSS**, **shadcn**, **GraphQL**, **Descope** for authentication, and **Next Themes** for light/dark mode support. Testing is done using **React Testing Library** and **MSW**.  

---

## Table of Contents 📑  
1. [Demo](#demo-)  
2. [Features](#features-)  
3. [Tech Stack](#tech-stack-)  
4. [Testing](#testing-)  
5. [Project Structure](#complete-project-structure-)  

---

## Demo 🌐  

Check out the live demo: [Live Demo](https://magic-touch-online-services-website.vercel.app/)  

---

## Features ✨  

1. **Browse Services**  
   - Explore a wide range of **services** with a clean, responsive UI. 🛠️  
   - Dynamic filtering and sorting.  

2. **Search Services**  
   - Search by **title** or **category**. 🔍  
   - Real-time results with debounced input.  

3. **Service Details**  
   - View **descriptions**, **pricing**, and **availability**. 📄  

4. **Order Services**  
   - Logged-in users can book services with **date/time selection**. 🗓️  
   - **Verification email** sent via **Sendinblue** after booking. 📧  

5. **Authentication**  
   - Secure login/signup powered by **Descope**. 🔐  
   - Protected routes for authenticated users.  

6. **Light/Dark Themes**  
   - Toggle between themes using **Next Themes**. 🌞🌙  

7. **Testing**  
   - Comprehensive unit & integration tests with **RTL + MSW**. 🧪  

---

## Tech Stack 🛠️  

| **Category**       | **Technologies & Tools**                          |
|--------------------|--------------------------------------------------|
| **Frontend**       | Next.js, Tailwind CSS, shadcn                    |
| **Backend**        | GraphQL (Hygraph)                          |
| **Authentication** | Descope                                          |
| **Styling**        | Tailwind CSS + shadcn components                 |
| **Testing**        | Jest, React Testing Library, MSW                       |
| **State Management**| React Context             |
| **Email Service**  | Sendinblue                                       |
| **Deployment**     | Vercel                                           |
| **Version Control**| Git & GitHub                                    |

---

## Testing 🧪  
To run the test suite:  

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Fayyad-2003/Magic-Touch-Online-Services-Website.git
   ```
2. **Navigate to the project directory**:
   ```bash
   cd Magic-Touch-Online-Services-Website
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Run all tests**:
   ```bash
   npm test
   ```
5. **Test specific components**:
   ```bash
   npm test src/components/ComponentName.test.js
   ```
---

## Complete Project Structure 📂  
```text
magic-touch/
├── app/                  # Next.js app router
├── components/
│   ├── booking/          # Booking-related components
│   ├── browsing/         # Service browsing components
│   ├── common/           # Shared components
│   ├── home/             # Homepage components
│   └── ui/               # shadcn/ui components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── mocks/                # Mock data
│   └── mswSetup.js       # MSW configuration
├── providers/            # Context providers
│   ├── index.js          # Main provider composition
│   ├── SessionProvider   # Authentication provider
│   └── ThemeProvider.jsx # Theme management
├── public/               # Static assets
├── tests/               # Test files
├── utils/                # Utility functions
├── .gitignore
├── components.json       # shadcn components config
├── jest.config.ts        # Jest configuration
├── jest.setup.ts         # Jest setup
├── jsconfig.json
├── next.config.ts        # Next.js config
├── package.json
├── package-lock.json
├── postcss.config.mjs    # PostCSS config
├── README.md
└── tsconfig.json        # TypeScript config
```