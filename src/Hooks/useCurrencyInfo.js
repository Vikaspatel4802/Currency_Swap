import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
    )
      .then((res) => res.json())              // FIX 1: Call json()
      .then((json) => {
        setData(json[currency]);             // FIX 2: Correct extraction
      })
      .catch((err) => console.error("Error:", err));
  }, [currency]);

  return data;
}

export default useCurrencyInfo;
