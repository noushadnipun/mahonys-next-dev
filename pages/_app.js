import "bootstrap/dist/css/bootstrap.css";
import '@/styles/globals.css'
import ProtectedRoute from "@/contexts/ProtectedRoute";
import { useEffect } from "react";
import Layout from "@/components/Layouts";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (typeof document !== undefined) {
      require("bootstrap/dist/js/bootstrap.js");
    } else {
      false;
    }
  }, []);
  return (
    <ProtectedRoute>
      <Component {...pageProps} />
    </ProtectedRoute>
  );
}

export default MyApp;