import ProtectedRoute from "@/middleware/ProtectedRoute";
import NotFoundPage from "@/pages/error/NotFoundPage";
import { privateRoutes, publicRoutes } from "@/routes/route";
import type { Route as AppRoute } from "@/types";
import { Fragment } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="app-ecommerce">
        <Routes>
          {publicRoutes.map((route: AppRoute) => {
            const Layout = route.layout ?? Fragment;
            const Page = route.component;
            return (
              <Route
                key={route.id}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
          {privateRoutes.map((route: AppRoute) => {
            const Layout = route.layout ?? Fragment;
            const Page = route.component;
            return (
              <Route
                key={route.id}
                path={route.path}
                element={
                  <ProtectedRoute adminOnly={route.adminOnly}>
                    <Layout>
                      <Page />
                    </Layout>
                  </ProtectedRoute>
                }
              />
            );
          })}
          {/* Catch-all route for non-existent URLs */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
