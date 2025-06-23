import  { useCallback, useEffect, useState } from 'react';
import apiClient from '../../lib/api-client';

const usePackagePlan = () => {
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPackage = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiClient.get("/payment/get/all-plan/");
      console.log(response);
      setPackageData(response.data);
      setError(null);
    } catch (err) {
      setError(err);
      setPackageData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPackage();
  }, [fetchPackage]);

  return { packageData, loading, error, refetch: fetchPackage };
};

export default usePackagePlan;