import { useEffect, useState } from "react";

export default function useFetch<T>(URL: string) {
  const [data, setData] = useState<T>();

  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
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
  });

  return [data, loading, error] as const;
}
