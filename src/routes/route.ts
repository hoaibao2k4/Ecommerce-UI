import AdminLayout from "@/components/layout/AdminLayout";
import DefaultLayout from "@/components/layout/DefaultLayout";
import AdminDashboardPage from "@/pages/admin/AdminDashboardPage";
import AdminOrdersPage from "@/pages/admin/AdminOrdersPage";
import AdminProductsPage from "@/pages/admin/AdminProductsPage";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import About from "@/pages/store/About";
import Cart from "@/pages/store/Cart";
import HomePage from "@/pages/store/HomePage";
import OrderHistory from "@/pages/store/OrderHistory";
import Product from "@/pages/store/Product";
import ProductDetails from "@/pages/store/ProductDetails";
import type { Route } from "@/types";

const publicRoutes: Route[] = [
  {
    id: 1,
    path: "/login",
    component: LoginPage,
    layout: null,
  },
  {
    id: 2,
    path: "/register",
    component: RegisterPage,
    layout: null,
  },
  {
    id: 3,
    path: "/",
    component: HomePage,
    layout: DefaultLayout,
  },
  {
    id: 4,
    path: "/products",
    component: Product,
    layout: DefaultLayout,
  },
  {
    id: 5,
    path: "/product/:id",
    component: ProductDetails,
    layout: DefaultLayout,
  },

  {
    id: 6,
    path: "/cart",
    component: Cart,
    layout: DefaultLayout,
  },
  {
    id: 7,
    path: "/about",
    component: About,
    layout: DefaultLayout,
  },
];

const privateRoutes: Route[] = [
  {
    id: 100,
    path: "/admin",
    component: AdminDashboardPage,
    layout: AdminLayout,
    adminOnly: true,
  },
  {
    id: 101,
    path: "/admin/products",
    component: AdminProductsPage,
    layout: AdminLayout,
    adminOnly: true,
  },
  {
    id: 102,
    path: "/admin/orders",
    component: AdminOrdersPage,
    layout: AdminLayout,
    adminOnly: true,
  },
  {
    id: 103,
    path: "/orders",
    component: OrderHistory,
    layout: DefaultLayout,
  },
];

export { privateRoutes, publicRoutes };
