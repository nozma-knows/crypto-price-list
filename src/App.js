import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

const baseURL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

const numberWithCommas = (number) => {
  const parts = number.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

export default function App() {
  const [result, setResult] = useState(null);

  const fetchData = () => {
    try {
      axios.get(baseURL).then((response) => {
        setResult(response.data);
      });
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
    setInterval(() => {
      fetchData();
    }, 30000);
  }, []);

  // console.log("Result: ", result);

  if (!result) return null;

  return (
    <div className="content">
      <table className="coin-table">
        <thead className="coin-table-head">
          <tr className="coin-table-head-row">
            <th className="coin-rank">#</th>
            <th className="coin-name">Coin</th>
            <th className="coin-price">Price</th>
            <th className="coin-24h-change">24h</th>
            <th className="coin-mkt-cap">Mkt Cap</th>
          </tr>
        </thead>
        <tbody className="coin-table-body">
          {result.map((item, i) => (
            <tr className="coin-table-body-row">
              <td
                className="coin-rank"
                key={`rank-${i}`}
              >{`${item.market_cap_rank}`}</td>

              <td className="coin-name" key={`name-${i}`}>
                <div className="coin-img-container">
                  <img
                    className="coin-img"
                    key={`img-${i}`}
                    src={item.image}
                    alt={`${item.id}`}
                  />
                </div>
                <div className="coin-name-name">{`${item.name}`}</div>
                <div className="coin-symbol">{`${item.symbol.toUpperCase()}`}</div>
              </td>
              <td className="coin-price" key={`price-${i}`}>
                {`$${numberWithCommas(item.current_price)}`}
              </td>
              <td className="coin-24h-change" key={`24h-change-${i}`}>
                {`${numberWithCommas(
                  item.price_change_percentage_24h.toFixed(2)
                )}%`}
              </td>
              <td className="coin-mkt-cap" key={`market-cap-${i}`}>
                {`$${numberWithCommas(item.market_cap)}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
