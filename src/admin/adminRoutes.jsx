import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import AdminLayout from "./layout/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import RouteLoader from "../components/RouteLoader/RouteLoader";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Contacts = lazy(() => import("./pages/Contacts"));
const Careers = lazy(() => import("./pages/Careers"));
const Products = lazy(() => import("./pages/Products"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Login = lazy(() => import("./pages/Login"));
const Settings = lazy(() => import("./pages/Settings"));

export default function AdminRoutes() {
  return (
    <Suspense fallback={<RouteLoader />}>
      <Routes>

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<Dashboard />}
          />

          <Route
            path="contacts"
            element={<Contacts />}
          />

          <Route
            path="careers"
            element={<Careers />}
          />

          <Route
            path="products"
            element={<Products />}
          />

          <Route
            path="gallery"
            element={<Gallery />}
          />

          <Route
            path="settings"
            element={<Settings />}
          />
        </Route>

      </Routes>
    </Suspense>
  );
}