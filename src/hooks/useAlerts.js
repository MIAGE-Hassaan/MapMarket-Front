import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://mapmarketapi.test/api";

export const useAlerts = () => {
  const [hasAlerts, setHasAlerts] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token is missing");
        }

        const response = await axios.get(`${API_BASE_URL}/alertes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const alerts = response.data.data || [];
        setHasAlerts(alerts.length > 0);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  return { hasAlerts, loading, error };
};
