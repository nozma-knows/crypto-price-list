import React, { useState, useEffect } from "react";
import FetchCryptoPrices from "../utils/FetchCryptoData";

export default function CryptoList() {
  const [data, setData] = useState(null);

  // Fetch and set data
  useEffect(() => {
    FetchCryptoPrices(setData);
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
