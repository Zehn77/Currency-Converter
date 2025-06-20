import { useState } from "react";
import { API } from "../api/api";

export function useFetch() {
  const [responseData, setData] = useState<null | { [code: string]: number }>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (code: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await API.fetch(code);
      setData(res.rates);
      return res.rates;
    } catch {
      setError("Something went wrong");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return { fetchData, loading, error, responseData };
}
