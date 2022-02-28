import React, { useState, useEffect } from "react";
import FetchCryptoData from "../utils/FetchCryptoData";

export default function CryptoList() {
  const [data, setData] = useState(null);
  const [sortBy, setSortBy] = useState("market_cap_rank");

  // Fetch and set data
  useEffect(() => {
    FetchCryptoData(setData);
  }, []);

  // Temporary - Log data
  useEffect(() => {
    console.log("data in CryptoList: ", data);
  }, [data]);

  // Loading screen
  if (data === null) return <div>Loading...</div>;

  // Crypto list
  return (
    <div>
      {data.map((item) => (
        <div>{item.id}</div>
      ))}
    </div>
  );
}
