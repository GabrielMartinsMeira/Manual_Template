import { useEffect, useState } from "react";

const useManualSection = (slug, language = "pt", type = "manual-main") => {
  const [section, setSection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    setError(null);

    fetch(`/api/manual/${encodeURIComponent(slug)}?lang=${language}&type=${type}`, {
      cache: "no-store",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch manual section");
        return res.json();
      })
      .then((data) => {
        setSection(data);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, [slug, language, type]);


  return { section, loading, error };
};

export default useManualSection;
