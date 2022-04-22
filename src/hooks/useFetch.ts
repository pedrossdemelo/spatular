import { useEffect, useState } from "react";

export default function useFetch<T>(URL: string) {
  const [data, setData] = useState<T>();

  const [loading, setLoading] = useState<boolean>(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await fetch(URL);
        const json = await response.json();

        setData(json);
      } catch (e) {
        // TODO: Add error handling for non-development environments
        setError(JSON.stringify(e));
      } finally {
        setLoading(false);
      }
    })();
  }, [URL]);

  return [data, loading, error] as const;
}
