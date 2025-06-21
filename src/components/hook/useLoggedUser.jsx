import { useState, useEffect } from "react";
import apiClient from "../../lib/api-client";

const useLoggedUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get("/auth/profile/");
        console.log(response);
        setUser(response.data);
        setError(null);
      } catch (err) {
        setError(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
};

export default useLoggedUser;
