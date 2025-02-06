import  { useEffect, useState } from "react";
import axios from 'axios';

export default function useFetch(url) {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const getData = async () => {
    try {
      const { data } = await axios.get(url);
      setData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return { data, error, isLoading };
}