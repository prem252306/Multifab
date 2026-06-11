import React, { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import ProtectedRoute from "../admin/components/ProtectedRoute";
import RouteLoader from "../components/RouteLoader/RouteLoader";
import PageTransition from "../components/PageTransition/PageTransition";

const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Products = lazy(() => import("../pages/Products"));
const Gallery = lazy(() => import("../pages/Gallery/Gallery"));
const Quality = lazy(() => import("../pages/Quality"));
const Career = lazy(() => import("../pages/Career/Career"));
const Contact = lazy(() => import("../pages/Contact/Contact"));
const ProductDetails = lazy(() => import("../pages/ProductDetails/ProductDetails"));
const Login = lazy(() => import("../admin/pages/Login"));
const Dashboard = lazy(() => import("../admin/pages/Dashboard"));
const CareersAdmin = lazy(() => import("../admin/pages/Careers"));

function AppRoutes() {
  const location = useLocation();

  return (
    <Suspense fallback={<RouteLoader />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>

          <Route path="/" element={<PageTransition><Home /></PageTransition>} />

          <Route path="/about" element={<PageTransition><About /></PageTransition>} />

          <Route path="/products" element={<PageTransition><Products /></PageTransition>} />

          <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />

          <Route path="/quality" element={<PageTransition><Quality /></PageTransition>} />

          <Route path="/career" element={<PageTransition><Career /></PageTransition>} />

          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          
          <Route path="/product/:id" element={<PageTransition><ProductDetails /></PageTransition>} />
          
          <Route
            path="/admin/careers"
            element={
              <ProtectedRoute>
                <PageTransition>
                  <CareersAdmin />
                </PageTransition>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/login"
            element={<PageTransition><Login /></PageTransition>}
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <PageTransition>
                  <Dashboard />
                </PageTransition>
              </ProtectedRoute>
            }
          />

        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}

export default AppRoutes;