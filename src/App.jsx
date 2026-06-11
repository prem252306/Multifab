import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

import AppRoutes from "./routes/AppRoutes";
import AdminRoutes from "./admin/adminRoutes";

import Loader from "./components/Loader/Loader";
import Cursor from "./components/Cursor";
import Chatbot from "./components/Chatbot/Chatbot";

import useLenis from "./hooks/useLenis";


function App() {
  useLenis();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>

      {/* Custom Cursor */}
      <Cursor />

      {/* Floating Chatbot */}
      <Chatbot />

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#0b0f19",
            color: "#fff",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            fontFamily: "Outfit, sans-serif"
          }
        }}
      />

      <Routes>

        {/* Public Website */}
        <Route
          path="/*"
          element={<AppRoutes />}
        />

        {/* Admin Panel */}
        <Route
          path="/admin/*"
          element={<AdminRoutes />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;