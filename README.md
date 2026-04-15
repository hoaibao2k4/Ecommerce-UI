# 🚀 SparkMinds E-Commerce UI

A premium, modern e-commerce frontend built with **React 19**, **Vite**, and **TypeScript**. This project features a dual-interface system for both customers and administrators, emphasizing a sleek UI/UX, robust state management, and seamless API integration.

---

## ✨ Features

### 🛒 Customer Interface (Storefront)
- **Dynamic Product Catalog**: Browse products with advanced filtering (category, price range) and sorting (price, date).
- **Product Details**: Deep-dive into product specifications and high-quality imagery.
- **Shopping Cart**: Fully functional cart with persistent state using `Redux Persist`.
- **Order History**: Track past purchases and view order status in real-time.
- **Responsive Design**: Optimized for mobile, tablet, and desktop views.
- **Smooth Animations**: Powered by `Framer Motion` for a premium feel.

### 🛡️ Admin Dashboard
- **Sales Overview**: Visual insights into business performance.
- **Product Management**: Complete CRUD operations for the product catalog.
- **Order Tracking**: Manage customer orders and update shipping statuses (PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED).
- **Secure Access**: Role-based access control with secure cookie-based authentication.

---

## 🛠️ Technology Stack

| Category | Technology |
| :--- | :--- |
| **Core** | [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/) |
| **State Management** | [Redux Toolkit](https://redux-toolkit.js.org/), [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/) |
| **Form & Validation** | [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/) |
| **Routing** | [React Router 7](https://reactrouter.com/) |
| **Feedback** | [React Hot Toast](https://react-hot-toast.com/) |

---

## 📂 Project Structure

```text
src/
├── components/     # Reusable UI components (Buttons, Modals, Cards)
├── pages/          # Main page views (Admin, Store, Auth)
│   ├── admin/      # Management dashboards
│   └── store/      # Customer-facing pages
├── stores/         # Redux store configuration
│   ├── api/        # RTK Query API slices
│   └── slices/     # Local state slices (Cart, UI)
├── hooks/          # Custom React hooks (useAuth, useProductFilter)
├── routes/         # Application routing logic
├── schemas/        # Zod validation schemas
├── types/          # TypeScript interfaces and types
└── utils/          # Helper functions and constants
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (Latest LTS version recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables (create a `.env` file):
   ```env
   VITE_API_URL=http://localhost:8080/api
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

---

## 📜 Available Scripts

- `npm run dev`: Starts the local development server.
- `npm run build`: Compiles the application for production.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run preview`: Previews the production build locally.

---

## 🎨 Design Philosophy
This project adheres to **Modern Web Design Principles**:
- **Rich Aesthetics**: Vibrant color palettes and clean typography.
- **Micro-interactions**: Subtle hover effects and transitions.
- **Accessibility**: Semantic HTML and keyboard-friendly navigation.
- **Performance**: Lazy loading and optimized assets for fast load times.

---

Built with ❤️ by the SparkMinds Team.
