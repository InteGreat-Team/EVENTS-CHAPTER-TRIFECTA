// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { UserAuth } from "../hooks/useAuthContext"; 
import { useState, useEffect } from "react";

export function ProtectedRoute({ element }) {
  const { user } = UserAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      setLoading(false);
    }, [user]);

    if (loading) {
      // You can render a loading spinner or placeholder here
      return <div>Loading...</div>;
    }

    if (!user) {
      // Redirect to login if the user is not authenticated
      return <Navigate to="/logIn" />;
    }
    return element;
}